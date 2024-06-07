// install nodemon using npm i -g nodemon
// Load .env file to load environment variables
require("dotenv").config();
// Import required modules
const express = require("express");
const cors = require("cors");
const router = require("./Route/router");
// Create an Express application instance
const pfServer = express();
require("./DBconnection/connection");
// Use CORS middleware to handle cross-origin requests
pfServer.use(cors());

// Parse incoming request bodies with JSON payloads
pfServer.use(express.json());
pfServer.use(router);
pfServer.use("/uploads", express.static("./uploads"));
// Define the port number to listen on
const PORT = 4000 || process.env.PORT;

// Start the Express server and listen for incoming connections
pfServer.listen(PORT, () => {
  // Log a message indicating that the server has started and is listening on the specified port
  console.log(
    `Project-fair started at port ${PORT} and waiting for client request`
  );
});

// Define a route handler for GET requests to the root URL
pfServer.get("/", (req, res) => {
  // Send a response with an HTML message indicating that the server is running
  res.send("<h1>Project-fair Server Running :D</h1>");
});

// pfServer.post('/',(req,res)=>{
//     res.send("POST request")
// })

// pfServer.put('/',(req,res)=>{
//     res.send("PUT request")
// })
