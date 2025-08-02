const {User, Login} = require("../models/models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
     if (!name || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const existingUser = await User.findOne({email}); //user schema mein hum find kr rhe h
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    // await user.save();

    const token = jwt.sign({userId:user._id}, JWT_SECRET, {expiresIn:'24h'})

    res.status(201).json({ msg: "user created successfully", user, token });
  } catch (e) {
    console.log("Internal server error", e.message);
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not exists" });

    // compare password if exists
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return res.status(401).json({ msg: "Incorrect Password" });

    //Generate Token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user: { _id: user._id, email: user.email, name: user.name } });
  } catch (e) {
    res.status(500).json({ msg: "Login Failed", error: e.message });
  }
};
module.exports = { signup, login };
