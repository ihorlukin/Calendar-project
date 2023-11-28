import bcrypt from "bcryptjs";
import CalendarUser from "../models/User.js";

export const register = async (req, res) => {
    console.log("register")
    try {
      // Check if the user already exists
      const existingUser = await CalendarUser.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json("User already exists!");
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user
      const newUser = await CalendarUser.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      await newUser.save();
      return res.status(200).json(newUser);
    } catch (error) {
      console.log(error.message)
      return res.status(500).json(error.message);
    }
  };

  export const login = async (req, res) => {
    try {
      // Find the user by username
      const user = await CalendarUser.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("User not found!");
      }
  
      // Check the password
      const checkPassword = await bcrypt.compare(req.body.password, user.password);
      if (!checkPassword) {
        return res.status(400).json("Wrong email or password!");
      }
  
  
      // Remove the password from the response
      const { password, ...rest } = user._doc;
  
      return res.status(200).json(rest);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  export const logout = (req, res) => {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json("User has been logged out.");
  };