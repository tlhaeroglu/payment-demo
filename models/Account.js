export const validateAccount = {
  type: "object",
  properties: {
    accountNumber: { type: "integer" },
    currencyCode: { enum: ["TRY", "USD", "EUR"] },
    ownerName: { type: "string" },
    accountType: { enum: ["individual", "corporate"] },
    balance: { type: "number" },
  },
  required: ["accountNumber", "currencyCode", "ownerName", "accountType"],
  additionalProperties: false,
};

export class Account {
  constructor(
    accountNumber,
    currencyCode,
    ownerName,
    accountType,
    balance = 0
  ) {
    this.accountNumber = accountNumber;
    this.currencyCode = currencyCode;
    this.ownerName = ownerName;
    this.accountType = accountType;
    this.balance = parseFloat((Math.round(balance * 100) / 100).toFixed(2));
  }
}
// (Math.round(num * 100) / 100).toFixed(2)
