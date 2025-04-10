import bcrypt from "bcryptjs";
import adminModel from "../models/adminModel.js";
import ErrorService from "../middlewares/errorService.js";
import { HttpStatusCode } from "../constants/statusCodes.js";

export const loginRepo = async (email, password) => {
  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      throw new ErrorService(
        "Invalid Credentials",
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new ErrorService(
        "Invalid Credentials",
        HttpStatusCode.UNAUTHORIZED
      );
    }

    return {
      id: admin._id,
      email: admin.email,
    };
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};
