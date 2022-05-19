import express from "express";
import { doDeposit } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", doDeposit);

export default router;
