import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!items?.length) return res.status(400).json({ message: "Cart is empty" });

    const ids = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: ids } });
    const map = new Map(products.map((p) => [p._id.toString(), p]));

    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = map.get(item.product);
      if (!product) return res.status(400).json({ message: `Product ${item.product} not found` });
      if (product.countInStock < item.quantity) {
        return res.status(400).json({ message: `${product.name} is out of stock` });
      }
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity
      });
      total += product.price * item.quantity;
    }

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.quantity } });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      total: Number(total.toFixed(2))
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get("/", protect, admin, async (_req, res) => {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json(orders);
});

router.put("/:id/status", protect, admin, async (req, res) => {
  const allowed = ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status" });

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;
