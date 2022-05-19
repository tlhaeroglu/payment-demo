import { Transaction } from "../models/Transaction.js";

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

  if (processType === "+") {
    // Toplama işlemi yapılır. prop1 + prop2
    return parseFloat(parseFloat(prop1 + prop2).toFixed(2));
  } else {
    // Çıkarma işlemi yapılır. prop1 - prop2
    return parseFloat(parseFloat(prop1 - prop2).toFixed(2));
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
    console.log(Account.accountNumber + " added");
    return { success: true, message: "Account created" };
  } else {
    console.log(Account.accountNumber + " not added");
    return {
      success: false,
      error: "Account exist already",
    };
  }
}

export function findAccount(accountNumber) {
  var result = getAccounts().find(
    (account) => account.accountNumber === accountNumber
  );

  if (result) {
    return { success: true, data: result };
  } else {
    return {
      success: false,
      error: "Account not found",
    };
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
      return {
        success: false,
        error: "Sender account is not individual",
      };
    }

    if (receiver.accountType !== "corporate") {
      // ödemeyi alan kişi bir kurumsal hesap değil
      return {
        success: false,
        error: "Receiver account is not corporate",
      };
    }

    if (sender.balance < Payment.amount) {
      // ödemeyi yapan kişinin bakiye yetersiz
      return {
        success: false,
        error: "Sender balance is not enough",
      };
    }
    // ödeme yapılıyor

    sender.balance = makeAccounting(sender.balance, "-", Payment.amount);
    receiver.balance = makeAccounting(receiver.balance, "+", Payment.amount);

    logTransaction(sender.accountNumber, Payment.amount, "payment"); // ödeme yapıldığında loglanır.
    return {
      success: true,
      message: "Payment successful",
    };
  } else {
    // eğer bulunamayan herhangi bir hesap varsa hata veriyoruz.
    return {
      success: false,
      error: "Accounts not reachable",
    };
  }
}

export function tryDeposit(Deposit) {
  var account = findAccount(Deposit.accountNumber);

  if (account.success) {
    account = account.data;

    if (account.accountType !== "individual") {
      // yatırma işlemini yapan kişi bir bireysel hesap değil
      return {
        success: false,
        error: "Deposit account is not individual",
      };
    }

    /*if (!checkDecimalPlaces(Deposit.amount)) {
      // geçersiz yatırma , fazladan basamak sebebiyle error dönüyoruz

      return {
        success: false,
        error: "Amount is not valid ,please enter max 2 decimal places",
      };
    }*/

    // yatırma işlemi yapılıyor
    account.balance = makeAccounting(account.balance, "+", Deposit.amount);
    logTransaction(account.accountNumber, Deposit.amount, "deposit");
    return {
      success: true,
      message: "Deposit successful",
    };
  } else {
    // eğer bulunamayan hesap varsa hata veriyoruz.
    return {
      success: false,
      error: "Account not reachable",
    };
  }
}

export function tryWithdraw(Withdraw) {
  var account = findAccount(Withdraw.accountNumber);

  if (account.success) {
    account = account.data;

    if (account.accountType !== "individual") {
      // çekme işlemini yapan kişi bir bireysel hesap değil
      return {
        success: false,
        error: "Withdraw account is not individual",
      };
    }

    if (account.balance < Withdraw.amount) {
      // çekme işlemini yapan kişinin bakiye yetersiz
      return {
        success: false,
        error: "Withdraw balance is not enough",
      };
    }
    // çekme işlemini yapılıyor
    account.balance = makeAccounting(account.balance, "-", Withdraw.amount);
    logTransaction(account.accountNumber, Withdraw.amount, "withdraw");
    return {
      success: true,
      message: "Withdraw successful",
    };
  } else {
    // eğer bulunamayan hesap varsa hata veriyoruz.
    return {
      success: false,
      error: "Account not reachable",
    };
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

    return {
      success: true,
      data: data,
    };
  } else {
    // eğer bulunamayan hesap varsa hata veriyoruz.
    return {
      success: false,
      error: "Account not reachable",
    };
  }
}
