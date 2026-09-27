import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  { name:"Minimal Leather Backpack", description:"A durable everyday backpack with a clean minimal design.", price:2499, image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80", category:"Bags", countInStock:20, rating:4.6 },
  { name:"Wireless Headphones", description:"Comfortable over-ear headphones with rich sound.", price:3999, image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80", category:"Electronics", countInStock:15, rating:4.7 },
  { name:"Classic Sneakers", description:"Everyday sneakers designed for comfort and casual style.", price:2999, image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", category:"Footwear", countInStock:25, rating:4.5 },
  { name:"Smart Watch", description:"Track activity, notifications and daily goals from your wrist.", price:5499, image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80", category:"Electronics", countInStock:12, rating:4.4 },
  { name:"Cotton Overshirt", description:"A versatile relaxed-fit overshirt for everyday wear.", price:1799, image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80", category:"Fashion", countInStock:30, rating:4.3 },
  { name:"Ceramic Coffee Set", description:"A modern ceramic cup set for your morning coffee ritual.", price:1299, image:"https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80", category:"Home", countInStock:18, rating:4.8 }
];

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany({});
await Product.insertMany(products);
console.log("Sample products inserted");
await mongoose.disconnect();
