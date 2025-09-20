import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// get all products and all details about products 
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


// get product details by id 
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


// Create Product
const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, price, category, countInStock, description, image } = req.body;

  const product = new Product({
    name,
    price,
    category,
    countInStock,
    description,
    image,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update Prduct
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, countInStock, description, image } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.countInStock = countInStock ?? product.countInStock;
    product.description = description || product.description;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete any Product by id
const deleteProduct = asyncHandler(async (req, res) => {
    // console.log("Print req : ", req,   "Print res : ", res)
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });


export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
