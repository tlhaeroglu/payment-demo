import express from "express";
import { doWithdraw } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", doWithdraw);

export default router;
