import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
const PORT = 5050 || process.env.PORT;

import account from "./routes/account.js";
import payment from "./routes/payment.js"; // Projedeki routerların
import deposit from "./routes/deposit.js"; // çağırılmasını sağlar.
import withdraw from "./routes/withdraw.js";
import accounting from "./routes/accounting.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/account", account);
app.use("/payment", payment); // Projedeki routerları
app.use("/deposit", deposit); // middleware ile çağırır.
app.use("/withdraw", withdraw);
app.use("/accounting", accounting);

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.listen(PORT || process.env.PORT, () => {
  console.log("---- http://localhost:5050 ----");
});

/*
IF YOU WANT TEST UNCOMMENT HERE
import { Account } from "./models/Account.js";
import { addAccount } from "./data/work.js";
addAccount(new Account(1, "TRY", "John Doe", "individual", 50));
addAccount(new Account(2, "USD", "Jane Doe", "individual", 50));
addAccount(new Account(3, "EUR", "Jane Doe", "individual", 50));

addAccount(new Account(4, "TRY", "Talha Eroğlu", "corporate"));
addAccount(new Account(5, "USD", "Talha Eroğlu", "corporate"));
addAccount(new Account(6, "EUR", "Talha Eroğlu", "corporate"));
*/
