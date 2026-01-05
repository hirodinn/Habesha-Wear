import express from "express";
import jwt from "jsonwebtoken";
import {
  PreProduct,
  validateNewPreProduct,
  validatePreProductUpdate,
} from "../model/preProduct.js";
import { validateId } from "../utils/validateId.js";

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
    if (decoded.role === "owner" || decoded.role === "admin") {
      const preProducts = await PreProduct.find();
      res.send(preProducts);
    } else if (decoded.role === "vendor") {
      const preProducts = await PreProduct.find({ ownedBy: decoded._id });
      res.send(preProducts);
    } else {
      res.status(400).json({ success: false, message: "User is not verified" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", async (req, res) => {
  res.set({
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    Expires: "0",
  });

  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied" });

  const obj = { ...req.body };
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  obj.ownedBy = decoded._id;
  console.log(obj);

  const { error } = validateNewPreProduct(obj);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    if (decoded.role === "vendor") {
      const preProduct = new PreProduct(obj);
      await preProduct.save();
      res.send(preProduct);
    } else {
      res
        .status(400)
        .json({ success: false, message: "user not allowed to post products" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  res.set({
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    Expires: "0",
  });
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied" });

  var { error } = validateId(req.params.id);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  var { error } = validatePreProductUpdate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  try {
    if (decoded.role === "owner" || decoded.role === "admin") {
      const preProduct = await PreProduct.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.send(preProduct);
    } else {
      res
        .status(400)
        .json({ success: false, message: "User can't modify products" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  res.set({
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    Expires: "0",
  });
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied" });

  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (decoded.role !== "owner" && decoded.role !== "admin")
    return res
      .status(403)
      .json({
        success: false,
        message: "Only Admins/Owners can delete requests",
      });

  try {
    const preProduct = await PreProduct.findByIdAndDelete(req.params.id);
    if (!preProduct)
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    res.send(preProduct);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
