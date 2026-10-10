const { MongoClient } = require("mongodb");

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/secondchance");
  }

  await client.connect();
  return client.db("secondchance");
}

module.exports = { connectToDatabase };
