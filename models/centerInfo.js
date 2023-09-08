// const { MongoClient } = require("mongodb");

// // Define your MongoDB URI
// const MongoDB_URI = "mongodb://127.0.0.1:27017/CenterInfo";

// // Define your database and collection names
// const DATABASE_NAME = "CenterInfo";
// const COLLECTION_NAME = "Centers";

// // Function to connect to MongoDB
// async function connectToMongo() {
//   const client = new MongoClient(MongoDB_URI);
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     return client;
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//     throw err;
//   }
// }

// // Function to retrieve data from MongoDB
// async function getDataFromMongo() {
//   const client = await connectToMongo();
//   const db = client.db(DATABASE_NAME);
//   const collection = db.collection(COLLECTION_NAME);

//   try {
//     const data = await collection.find({}).toArray();
//     console.log("Data retrieved:", data);
//     return data;
//   } catch (err) {
//     console.error("Error retrieving data from MongoDB:", err);
//     throw err;
//   } finally {
//     client.close();
//     console.log("MongoDB connection closed");
//   }
// }

// // Function to process and use the retrieved data
// async function main() {
//   const data = await getDataFromMongo();

//   // Process and use the data in your project
//   data.forEach((document) => {
//     console.log(document);
//     // Access specific fields like document.center_name
//   });
// }

// module.exports= main();


