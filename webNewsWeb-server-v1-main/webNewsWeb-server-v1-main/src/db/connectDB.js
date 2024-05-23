const { default: mongoose } = require("mongoose");
require("dotenv").config();

const connectionUri = process.env.DATABASE;

const connectDB = async () => {
  console.log("connecting DB");
  await mongoose.connect(connectionUri, { dbName: process.env.DB_NAME });
  console.log("connected DB");
};

module.exports = connectDB;
