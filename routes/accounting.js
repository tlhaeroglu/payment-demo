import express from "express";
import { getTransactions } from "../controllers/accountController.js";

const router = express.Router();

router.get("/:accountNumber", getTransactions);

export default router;
