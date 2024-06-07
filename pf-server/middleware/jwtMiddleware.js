const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("inside jwtMiddleware");
  console.log("header", req.headers);
  const token = req.headers["authorization"].split(" ")[1];
  console.log("token", token);
  try {
    const jwtResponse = jwt.verify(token, "secretkey123");
    console.log("jwt response", jwtResponse);
    req.payload = jwtResponse.userId;
    next();
  } catch (err) {
    res.status(401).json("Authorization Failed! Please Login");
  }
};
module.exports = jwtMiddleware;
