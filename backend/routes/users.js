import express from "express";
import bcrypt from "bcrypt";
import { User, validateNewUser, validateUserLogin } from "../model/user.js";
import { validateId } from "../utils/validateId.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send("Invalid user ID");
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.send(user);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { error } = validateNewUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    let user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    user = await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateUserLogin(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
