const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require ("../lib/prisma")

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" },
    );
    res.json({
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { login };
