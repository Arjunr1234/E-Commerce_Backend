import express from 'express';
import { authVerify } from '../middlewares/authVerify.js';
import { customerData, orderData, orderDetails, productData, reportData, revenueData } from '../controllers/adminController.js';
const adminRoute = express.Router();




adminRoute.get('/revenue', authVerify , revenueData);
adminRoute.get('/cutomers', authVerify, customerData);
adminRoute.get('/products', authVerify, productData );
adminRoute.get('/orders', authVerify, orderData);
adminRoute.get('/view-order/:id', authVerify, orderDetails)
adminRoute.get('/report', authVerify, reportData)




export default adminRoute