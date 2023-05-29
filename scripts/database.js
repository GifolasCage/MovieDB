const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
// Connect to the mongoDB database
const dbConnection = async () => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection OK");
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.log("Cannot connect", error);
    throw error;
  }
};

module.exports = dbConnection;
