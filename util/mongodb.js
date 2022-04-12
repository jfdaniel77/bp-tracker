import { MongoClient } from "mongodb";

const uri = process.env.DB_URI

var database = null;

const client = new MongoClient(uri);

async function getConnection() {
  await client.connect();
  database = client.db("health_app");
}

export async function saveData(data) {
  // Check MongoDB connection
  if (!database) {
    await getConnection();
  }

  // Define collection
  const collection = database.collection("bp_tracker");
  var resp = null;
  try {
    resp = collection.insertOne(data);
    return resp;
  } catch (e) {
    console.log(e);
  }

  return resp;
}

export async function fetchData() {
  // Check MongoDB connection
  if (!database) {
    await getConnection();
  }

  // Define collection
  const collection = database.collection("bp_tracker");

  // Query
  const query = {};

  // Options
  const options = {
    sort: { timestamp: -1 },
    projection: {"_id": 0},
  };

  // Fetch document(s)
  const cursor = collection.find(query, options);

  // print a message if no documents were found
  if ((await collection.countDocuments()) === 0) {
    console.log("No documents found!");
  }

  var data = [];
  while (await cursor.hasNext()) {
    data.push(await cursor.next());
  }
  return data;
}
