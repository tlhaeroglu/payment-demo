export const validateWithdraw = {
  type: "object",
  properties: {
    accountNumber: { type: "integer" },
    amount: { type: "number" },
  },
  required: ["accountNumber", "amount"],
  additionalProperties: false,
};

export class Withdraw {
  constructor(accountNumber, amount) {
    this.accountNumber = accountNumber;
    this.amount = parseFloat((Math.round(amount * 100) / 100).toFixed(2));
  }
}
