import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const savedUser = await newUser.save({ new: true });
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    next(errorHandler(400, "Error creating user"));
  }
};
