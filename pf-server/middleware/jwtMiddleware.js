const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const jwtResponse = jwt.verify(token, "secretkey123");
    req.payload = jwtResponse.userId;
    next();
  } catch (err) {
    res.status(401).json("Authorization Failed! Please Login");
  }
};
module.exports = jwtMiddleware;
