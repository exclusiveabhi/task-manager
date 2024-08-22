import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();
// router.use(express.json());
// router.use('/api/auth', authRoutes);


router.post("/signin", login);
router.post("/logout" )
router.post("/signup", register);

export default router;