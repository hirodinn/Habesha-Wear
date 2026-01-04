import express from "express";
import jwt from "jsonwebtoken";
import { Cart } from "../model/cart.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.set({
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    Expires: "0",
  });

  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied" });
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  try {
    const carts = await Cart.find();
    if (decoded.role === "admin" || decoded.role === "owner") {
      return res.send(carts);
    } else if (decoded.role === "customer") {
      const temp = carts.filter((cart) => cart.userId === decoded._id);
      return res.send(temp);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "user not verified" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

export default router;
