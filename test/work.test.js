import assert from "assert";

import { Account } from "../models/Account.js";
import {
  makeAccounting,
  addAccount,
  findAccount,
  tryDeposit,
  tryWithdraw,
} from "../data/work.js";

// this test for this event :) 10.12 - 5.12 = 4.999999999999999
describe("Calculation process ", () => {
  it("51.32 + 2.23 = 55", () => {
    assert.equal(makeAccounting(51.32, "+", 2.23), 53.55);
  });
  it("10.12 - 5.12 = 5", () => {
    assert.equal(makeAccounting(10.12, "-", 5.12), 5);
  });
});

describe("Add a account", () => {
  const { success } = addAccount(
    new Account(1, "TRY", "John Doe", "individual", 50)
  );

  it("Account added", () => {
    assert.equal(success, true);
  });

  describe("Find the added account", () => {
    it("Account exist", () => {
      assert.equal(findAccount(1).success, true);
    });
    it("Account not exist", () => {
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
