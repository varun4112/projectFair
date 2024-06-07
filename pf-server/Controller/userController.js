// register

const users = require("../Model/userSchema");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  console.log("inside register function");
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("Account already exists!! Please Login");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedin: "",
        profile: "",
      });

      await newUser.save();
      console.log(`${username},${email},${password}`);
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`register api failed, Error:${err}`);
  }
};

// LOGIN
exports.login = async (req, res) => {
  // Log that the login function is being executed
  console.log("Inside Login function");

  // Destructure username and email from the request body
  const { email, password } = req.body;

  try {
    // Attempt to find a user with the provided email and password
    const existingUser = await users.findOne({ email, password });

    // Check if existingUser is found
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, "secretkey123");
      // Respond with status 200 and send existingUser data as JSON
      res.status(200).json({ existingUser,token });
    } else {
      // Respond with status 404 if user is not found
      res.status(404).json("incorrect email / password");
    }
  } catch (err) {
    // Catch any errors that occur during execution and respond with status 401
    res.status(401).json(`login API failed:${err}`);
  }
};
