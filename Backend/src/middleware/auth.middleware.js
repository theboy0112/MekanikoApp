const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1 Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 2 Extract token (Bearer token)
  const token = authHeader.split(" ")[1];

  try {
    // 3 Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    // 4 Attach user info to request
    req.user = decoded;

    next(); // continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;