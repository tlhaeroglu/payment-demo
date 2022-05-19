import express from "express";
import { doPayment } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", doPayment);

export default router;
