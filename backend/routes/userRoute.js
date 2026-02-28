import express from "express";
import { changePassword, dashboard, forgetPassword, loginUser, logoutUser, registerUser, verification, verifyOtp,  } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router = express.Router();

router.post('/signup', registerUser);

router.get('/verify/:token', verification);

router.post('/login', loginUser);

router.post('/logout',isAuthenticated, logoutUser);

router.post('/forget-password', forgetPassword);

router.post('/verify-otp/:email', verifyOtp);

router.post('/change-password/:email', changePassword);

router.get('/dashboard', isAuthenticated, dashboard);


export default router   