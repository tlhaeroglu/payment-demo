export class Transaction {
  constructor(accountNumber, amount, transactionType, createdAt) {
    this.accountNumber = accountNumber;
    this.amount = parseFloat((Math.round(amount * 100) / 100).toFixed(2));
    this.transactionType = transactionType;
    this.createdAt = createdAt;
  }
}
