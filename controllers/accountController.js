import { ajv, getValidationErrorMessage } from "../helpers/validator.js";

import { validateAccount, Account } from "../models/Account.js";
import { addAccount, findAccount, showTransactions } from "../data/work.js";

// POST /account/
export function createAccount(req, res) {
  // req.body'yi tamamen almak yerine bizim için gerekli params'leri alıyoruz.
  const { accountNumber, currencyCode, ownerName, accountType } = req.body;

  // req.body'nin içinde gerekli parametreleri bulup,
  // validateAccount'ın içinde bulunan schema'yi kullanarak validate ediyoruz.
  const validate = ajv.compile(validateAccount);
  const valid = validate({
    accountNumber,
    currencyCode,
    ownerName,
    accountType,
  });

  if (!valid) {
    res.status(400).json(getValidationErrorMessage(validate));
  } else {
    // eğer validasyonda hata yoksa, Account class'ının instance'ını oluşturup,
    // accountNumber, currencyCode, ownerName, accountType değerlerini atıyoruz.

    const account = new Account(
      accountNumber,
      currencyCode,
      ownerName,
      accountType
    );

    // data.js'in içinde bulunan addAccount fonksiyonunu kullanarak,
    // account'un eklenip eklenmediğini kontrol ediyoruz ve ona göre feedback veriyoruz.
    var result = addAccount(account);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  }
}

// GET account/:accountNumber
export function getAccount(req, res) {
  const { accountNumber } = req.params;

  const result = findAccount(parseInt(accountNumber));

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
}

// GET /accounting/:accountNumber
export function getTransactions(req, res) {
  const { accountNumber } = req.params;

  const result = showTransactions(parseInt(accountNumber));

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
}
