import { ajv, getValidationErrorMessage } from "../helpers/validator.js";

import { validatePayment, Payment } from "../models/Payment.js";
import { validateDeposit, Deposit } from "../models/Deposit.js";
import { validateWithdraw, Withdraw } from "../models/Withdraw.js";

import { tryPayment, tryDeposit, tryWithdraw } from "../data/work.js";

// POST /payment/
export function doPayment(req, res) {
  const { senderAccount, receiverAccount, amount } = req.body;

  const validate = ajv.compile(validatePayment);
  const valid = validate({
    senderAccount,
    receiverAccount,
    amount,
  });

  if (!valid) {
    res.status(400).json(getValidationErrorMessage(validate));
  } else {
    const payment = new Payment(senderAccount, receiverAccount, amount);

    const result = tryPayment(payment);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  }
}

// POST /deposit/
export function doDeposit(req, res) {
  const { accountNumber, amount } = req.body;

  const validate = ajv.compile(validateDeposit);
  const valid = validate({
    accountNumber,
    amount,
  });

  if (!valid) {
    res.status(400).json(getValidationErrorMessage(validate));
  } else {
    const deposit = new Deposit(accountNumber, amount);

    const result = tryDeposit(deposit);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  }
}

// POST /withdraw/
export function doWithdraw(req, res) {
  const { accountNumber, amount } = req.body;

  const validate = ajv.compile(validateWithdraw);
  const valid = validate({
    accountNumber,
    amount,
  });

  if (!valid) {
    res.status(400).json(getValidationErrorMessage(validate));
  } else {
    const withdraw = new Withdraw(accountNumber, amount);

    const result = tryWithdraw(withdraw);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  }
}
