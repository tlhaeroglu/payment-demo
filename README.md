# payment-demo

It is a fake payment rest api running on memory. <br>
This application is written using `Node.js` and `Express.js`. <br>
The `Ajv.js` library was also used for validations. <br>

## Run

If you do not have node installed on your computer, you must install it first. Adress here: <br>
https://nodejs.org/en/download/ <br> <br>

First, clone the project:

```cmd
git clone https://github.com/tlhaeroglu/payment-demo.git
cd /payment-demo
```

<br>
and install the libraries:

```cmd
npm install
```

<br>
if you want to test:

```cmd
npm test
```

<br>
to get the project up and running:

```cmd
npm start
```

`http://localhost:5050` project on started.

# Routes Defintion

4 POST routes here:

<hr>

```http
POST /account
```

This route is create account route. Valid post:

```javascript
{
    accountNumber: { type: "integer" },
    currencyCode: { enum: ["TRY", "USD", "EUR"] },
    ownerName: { type: "string" },
    accountType: { enum: ["individual", "corporate"] },
    balance: { type: "number" },
}

required: ["accountNumber", "currencyCode", "ownerName", "accountType"]
```

```http
POST /payment
```

This route is make payment route. Valid post:

```javascript
{
    senderAccount: { type: "integer" },
    receiverAccount: { type: "integer" },
    amount: { type: "number" },
}

required: ["senderAccount", "receiverAccount", "amount"]
```

```http
POST /deposit
```

This route is make deposit route. Valid post:

```javascript
{
    accountNumber: { type: "integer" },
    amount: { type: "number" },
}

required: ["accountNumber", "amount"]
```

```http
POST /withdraw
```

This route is make withdraw route. Valid post:

```javascript
{
    accountNumber: { type: "integer" },
    amount: { type: "number" },
}

required: ["accountNumber", "amount"]
```

<hr>

2 GET routes here:

<hr>

```http
GET /account/{accountNumber}
```

This route is get account info. Valid get:

```javascript
required: ["accountNumber"];
```

```http
GET /accounting/{accountNumber}
```

This route is get transaction history. Valid get:

```javascript
required: ["accountNumber"];
```

<hr>

# Responses

`POST Routes`:

Will be:

```javascript
{
    "success": true /* or */ false,
    "message": "Message"
}
```

<hr>

`GET Routes`:

Will be:

```javascript
{
    "success": true /* or */ false,
    "data": {...} /* or */ [{...}]
}
```
