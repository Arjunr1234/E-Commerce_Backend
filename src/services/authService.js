import { HttpStatusCode } from "../constants/statusCodes.js";
import { generateToken } from "../helper/jsonWebToken.js";
import ErrorService from "../middlewares/errorService.js";
import { loginRepo } from "../repository.js/authRepository.js"



export const loginService = async(email, password) => {
     try {
        if (!email || !password) {
            throw new ErrorService("Email and password are required", HttpStatusCode.BAD_REQUEST); 
          }
         const response = await loginRepo(email, password);

         
         const adminToken = generateToken({ ...response }, '15d');  

         return {
            success:true,
            adminToken,
            ...response
         }



     } catch (error) {
        console.log("fet : error in loginSErvei: ",error)
        throw new ErrorService(error.message, error.statusCode)
     }
}