import assert from "assert";

import { Account } from "../models/Account.js";
import {
  makeAccounting,
  addAccount,
  findAccount,
  tryDeposit,
  tryWithdraw,
  tryPayment,
} from "../data/work.js";

// this test for this event :) 10.12 - 5.12 = 4.999999999999999
describe("Calculation process ", () => {
  it("51.32 + 2.23 = 55", () => {
    assert.equal(makeAccounting(51.32, "+", 2.23), 53.55);
  });
  it("10.12 - 5.12 = 5", () => {
    assert.equal(makeAccounting(10.12, "-", 5.12), 5);
  });
  it("3.2 * 2.2 = 7.04", () => {
    assert.equal(makeAccounting(3.2, "*", 2.2), 7.04);
  });
  it("72.6 / 6 = 12.1", () => {
    assert.equal(makeAccounting(72.6, "/", 6), 12.1);
  });
});

describe("Add a account", () => {
  var { success } = addAccount(
    new Account(1, "TRY", "John Doe", "individual", 50)
  );

  it("Account added", () => {
    assert.equal(success, true);
  });

  describe("Find the added account", () => {
    it("Account valid", () => {
      assert.equal(findAccount(1).success, true);
    });
    it("Same account, not valid", () => {
      assert.equal(findAccount(5).success, false);
    });
  });

  describe("Deposit the account", () => {
    it("Deposit success", () => {
      var obj = { accountNumber: 1, amount: 12.2 };
      assert.equal(tryDeposit(obj).success, true);
    });
  });

  describe("Withdraw the account", () => {
    it("Withdraw success", () => {
      var obj = { accountNumber: 1, amount: 5.2 };
      assert.equal(tryWithdraw(obj).success, true);
    });

    it("Invalid withdraw failed", () => {
      var obj = { accountNumber: 1, amount: 75 };
      assert.equal(tryWithdraw(obj).success, false);
    });
  });
});

describe("Payment", () => {
  addAccount(new Account(10, "TRY", "John Doe", "individual", 50)); // this 50 is the balance of the account
  addAccount(new Account(20, "TRY", "Jane Doe", "corporate", 50));

  var obj = {
    senderAccount: 10,
    receiverAccount: 20,
    amount: 5.2,
  };

  it("Payment succces", () => {
    assert.equal(tryPayment(obj).success, true);
  });
  it("Sender balance is decreased", () => {
    assert.equal(findAccount(10).data.balance, 44.8);
  });
  it("Receiver balance is increased", () => {
    assert.equal(findAccount(20).data.balance, 55.2);
  });

  describe("Payment failed", () => {
    it("Invalid sender failed", () => {
      var obj = {
        senderAccount: 30,
        receiverAccount: 20,
        amount: 5.2,
      };
      assert.equal(tryPayment(obj).success, false);
    });
    it("Receiver balance is not increased", () => {
      assert.equal(findAccount(20).data.balance, 55.2);
    });
  });
});
