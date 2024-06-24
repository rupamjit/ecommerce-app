import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all the input");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send("User already exists");
  }
  // const newUser = new User ({username, email, password})
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // await newUser.save();
   
    res.status(201).json(newUser);
    createToken(res, newUser._id);
  } catch (error) {
    res.status(400).send("Invalid user data");
  }
});

export { createUser };
