import { HttpStatusCode } from "../constants/statusCodes.js";
import ErrorService from "../middlewares/errorService.js";
import { loginService } from "../services/authService.js";




export const login = async(req, res, next) => {
    try {

        const { email, password } = req.body;
         console.log("This is body: ", req.body)
        if (!email || !password) {
            throw new ErrorService("Please provide all data", HttpStatusCode.BAD_REQUEST)
          }

          const response = await loginService(email, password);

          res.cookie("accessToken", response.accessToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 15 * 60 * 1000,
          });

          res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          
          return res.status(HttpStatusCode.OK).json({success:true,id:response.id })
          
        
    } catch (error) {
        next(error)
    }
}

export const logout = async(req, res, next) => {
    try {
        
        
    } catch (error) {
        next(error)
    }
}