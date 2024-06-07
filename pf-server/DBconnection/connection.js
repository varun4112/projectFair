const mongoose = require("mongoose");
const connectionString = process.env.DATABASE;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB Connected Sucessfully to pfServer");
  })
  .catch((err) => {
    console.log(`mongoDB connection failed! Error: ${err}`);
  });
