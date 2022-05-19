export const validateDeposit = {
  type: "object",
  properties: {
    accountNumber: { type: "integer" },
    amount: { type: "number" },
  },
  required: ["accountNumber", "amount"],
  additionalProperties: false,
};

export class Deposit {
  constructor(accountNumber, amount) {
    this.accountNumber = accountNumber;
    this.amount = parseFloat((Math.round(amount * 100) / 100).toFixed(2));
  }
}
