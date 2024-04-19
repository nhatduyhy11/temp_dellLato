const dotenv = require("dotenv");

const envPath = __dirname + `/../.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });

console.log(process.env.NODE_ENV);

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const USER = process.env.USER;
const PASS = process.env.PASS;

module.exports = {
  MONGO_URL,
  JWT_SECRET_KEY,
  USER,
  PASS,
};
