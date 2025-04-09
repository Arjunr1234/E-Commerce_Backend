import ErrorService from "../middlewares/errorService.js"
import { customerDataRepo, orderDataRepo, orderDetaisRepo, productDataRepo, reportDataRepo, revenueDataRepo } from "../repository.js/adminRepository.js"





export const revenueDataService = async() => {
    try {

        const respone = await revenueDataRepo();

        return respone
        
    } catch (error) {
        throw new ErrorService(error.message, error.statusCode)
    }
}

export const customerDataService = async() => {
     try {
        const response = await customerDataRepo();
        return response
     } catch (error) {
        throw new ErrorService(error.message, error.statusCode)
     }
}

export const productDataService = async() => {
    try {
       const response = await productDataRepo();
       return response
    } catch (error) {
       throw new ErrorService(error.message, error.statusCode)
    }
}


export const orderDataService = async() => {
    try {
       
         const response = await orderDataRepo();
         return response
    } catch (error) {
       throw new ErrorService(error.message, error.statusCode)
    }
}

export const reportDataService = async() => {
    try {
       const response = await reportDataRepo();
       return response
         
    } catch (error) {
       throw new ErrorService(error.message, error.statusCode)
    }
}

export const orderDetailsService = async(orderId) => {
    try {

        const response = await orderDetaisRepo(orderId);
        return response
        
    } catch (error) {
        throw new ErrorService(error.message, error.statusCode)
    }
}

