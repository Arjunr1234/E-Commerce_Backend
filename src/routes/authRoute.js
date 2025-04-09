import express from 'express'
import { login, logout } from '../controllers/authController.js';



const authRoute = express.Router();


authRoute.post('/login', login );
authRoute.get('/logout', logout);


export default authRoute