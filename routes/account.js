import express from "express";
import { createAccount, getAccount } from "../controllers/accountController.js";

const router = express.Router();

router.post("/", createAccount);

router.get("/:accountNumber", getAccount);

export default router;
