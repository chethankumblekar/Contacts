const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get All contacts
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are required");
  }
  const useAvailable = await User.findOne({ email });
  if (useAvailable) {
    res.status(400);
    throw new Error("User with same email address already registed");
  }
  const hashedPassword = await bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User Data Not Valid");
  }
});

//@desc Get All contacts
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compareSync(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//@desc Get All contacts
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
