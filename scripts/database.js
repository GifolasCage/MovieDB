const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'entertainment';

const dbConnection = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connection OK');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.log('Cannot connect', error);
    throw error;
  }
};

module.exports = dbConnection;