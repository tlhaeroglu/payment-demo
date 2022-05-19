export const validatePayment = {
  type: "object",
  properties: {
    senderAccount: { type: "integer" },
    receiverAccount: { type: "integer" },
    amount: { type: "number" },
  },
  required: ["senderAccount", "receiverAccount", "amount"],
  additionalProperties: false,
};

export class Payment {
  constructor(senderAccount, receiverAccount, amount) {
    this.senderAccount = senderAccount;
    this.receiverAccount = receiverAccount;
    this.amount = parseFloat((Math.round(amount * 100) / 100).toFixed(2));
  }
}
