import express from "express";
import { sendOrderEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/", sendOrderEmail);

export default router;
