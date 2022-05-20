import { Transaction } from "../models/Transaction.js";
import { success, send, failure } from "../helpers/message.js";
import { currency } from "../helpers/currency.js";

var accounts = [];
var transactions = [];

function getAccounts() {
  return accounts;
}

function getTransactions() {
  return transactions;
}

function logTransaction(accountNumber, amount, transactionType) {
  transactions.push(
    new Transaction(accountNumber, amount, transactionType, new Date())
  );
}

export function makeAccounting(prop1, processType, prop2) {
  // Bu fonskiyon ile hesap yapılır.
  // Bu fonksiyonun kullanılma sebebi ise,
  // toplama çıkarma işleminde double değerde hatalar çıkmasıdır,

  switch (processType) {
    case "+":
      return parseFloat(parseFloat(prop1 + prop2).toFixed(2));
      break;
    case "-":
      return parseFloat(parseFloat(prop1 - prop2).toFixed(2));
      break;
    case "*":
      return parseFloat(parseFloat(prop1 * prop2).toFixed(2));
      break;
    case "/":
      return parseFloat(parseFloat(prop1 / prop2).toFixed(2));
      break;
    default:
      return 0;
  }
}

export function addAccount(Account) {
  var result = getAccounts().find(
    (account) => account.accountNumber === Account.accountNumber
  )
    ? false
    : true;

  if (result) {
    accounts.push(Account);
    return success("Account created");
  } else {
    return failure("Account already exists");
  }
}

export function findAccount(accountNumber) {
  var result = getAccounts().find(
    (account) => account.accountNumber === accountNumber
  );

  if (result) {
    return { success: true, data: result };
  } else {
    return failure("Account not found");
  }
}

export function tryPayment(Payment) {
  // bence fazladan receiver === sender kontrolüne gerek yok
  // sender ve receiver aynıysa hata veriyoruz.

  var sender = findAccount(Payment.senderAccount);
  var receiver = findAccount(Payment.receiverAccount);

  if (sender.success && receiver.success) {
    // eğer iki hesaba da ulaşılabilmişse
    sender = sender.data;
    receiver = receiver.data;

    if (sender.accountType !== "individual") {
      // ödemeyi yapan kişi bir bireysel hesap değil
      return failure("Sender is not an individual account");
    }

    if (receiver.accountType !== "corporate") {
      // ödemeyi alan kişi bir kurumsal hesap değil
      return failure("Receiver is not a corporate account");
    }

    if (sender.balance < Payment.amount) {
      // ödemeyi yapan kişinin bakiye yetersiz
      return failure("Sender does not have enough balance");
    }
    // ödeme yapılıyor
    var currencyType = sender.currencyCode + receiver.currencyCode;
    var converted = makeAccounting(
      Payment.amount,
      "*",
      currency.get(currencyType)
    );

    sender.balance = makeAccounting(sender.balance, "-", Payment.amount);

    receiver.balance = makeAccounting(receiver.balance, "+", converted);

    logTransaction(sender.accountNumber, Payment.amount, "payment"); // ödeme yapıldığında loglanır.
    return success("Payment successful");
  } else {
    // eğer bulunamayan herhangi bir hesap varsa hata veriyoruz.
    return failure("Account not found");
  }
}

export function tryDeposit(Deposit) {
  var account = findAccount(Deposit.accountNumber);

  if (account.success) {
    account = account.data;

    if (account.accountType !== "individual") {
      // yatırma işlemini yapan kişi bir bireysel hesap değil
      return failure("Account is not an individual account");
    }

    // yatırma işlemi yapılıyor
    account.balance = makeAccounting(account.balance, "+", Deposit.amount);
    logTransaction(account.accountNumber, Deposit.amount, "deposit");
    return success("Deposit successful");
  } else {
    // eğer bulunamayan hesap varsa hata veriyoruz.
    return failure("Account not found");
  }
}

export function tryWithdraw(Withdraw) {
  var account = findAccount(Withdraw.accountNumber);

  if (account.success) {
    account = account.data;

    if (account.accountType !== "individual") {
      // çekme işlemini yapan kişi bir bireysel hesap değil
      return failure("Account is not an individual account");
    }

    if (account.balance < Withdraw.amount) {
      // çekme işlemini yapan kişinin bakiye yetersiz
      return failure("Account does not have enough balance");
    }
    // çekme işlemini yapılıyor
    account.balance = makeAccounting(account.balance, "-", Withdraw.amount);
    logTransaction(account.accountNumber, Withdraw.amount, "withdraw");
    return success("Withdraw successful");
  } else {
    // eğer bulunamayan hesap varsa hata veriyoruz.
    return failure("Account not found");
  }
}

export function showTransactions(accountNumber) {
  const result = findAccount(accountNumber);

  if (result.success) {
    var data = [];

    getTransactions().forEach((t) => {
      if (t.accountNumber === accountNumber) {
        data.push(t);
      }
    });

    return send(data);
  } else {
    // eğer bulunamayan hesap varsa hata veriyoruz.
    return failure("Account not found");
  }
}
