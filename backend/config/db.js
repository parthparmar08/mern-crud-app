const mongoose = require("mongoose");

// Define the MongoDB connection URI
const MONGODB_URI = "mongodb://localhost:27017/empdb";

// Create an async function to connect to MongoDB
async function connectToDatabase() {
  try {
    // Use Mongoose to connect to the MongoDB server
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true, //parse the connection string with the MongoDB driver's new URL parser
      useUnifiedTopology: true, //enable the new unified topology engine for MongoDB connections
    });

    // Connection successful
    console.log("Connected to MongoDB");
  } catch (error) {
    // Connection error
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase();