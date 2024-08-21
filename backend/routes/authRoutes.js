import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();


router.post("/signin", login);
router.post("/signup", register);

export default router;