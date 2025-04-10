import jwt from 'jsonwebtoken'
import { HttpStatusCode } from '../constants/statusCodes.js';

export const authVerify = (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ 
        success: false,
        message: "Access denied. No token provided.",
      });
      return
    }
    
 
    const secretKey = process.env.JWT_SECRET;
    const decode = jwt.verify(token, secretKey);

    req.roleId = decode.id;
       
    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    if (error.name === "TokenExpiredError") {
       res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
      return
    }

     res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token.",
    });
    return
  }
};
