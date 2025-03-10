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

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password: hashedPassword, ...userWithoutPassword } = user._doc;

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ ...userWithoutPassword });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const Google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
