import express from "express";
import auth from "../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserProfile,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/delete/:userId", auth, deleteUser);
router.get("/me", auth, getUserProfile);
router.put("/update", auth, updateUser);

router.get("/check", auth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
