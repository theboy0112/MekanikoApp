const express = require("express");

const { login } = require("../controllers/login.controller");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createUser,
  getAllUsers,
  updateUser,
  getUserbyId,
  deleteUser,
} = require("../controllers/user.controller");

// PUBLIC ROUTES
router.post("/", createUser); // register
router.post("/login", login); // login

// PROTECTED ROUTES
router.get("/", authMiddleware, getAllUsers);
router.get("/:userId", authMiddleware, getUserbyId);
router.put("/:userId", authMiddleware, updateUser);
router.delete("/:userId", authMiddleware, deleteUser);

module.exports = router;
module.exports = router;
