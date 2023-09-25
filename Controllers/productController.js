const Product = require("../models/Product");
const mongoose = require("mongoose")

const addProduct = async (req, res) => {
  try {
    const {
      BusinessId,
      name,
      price,
      images,
      weight,
      length,
      breadth,
      height,
      desc,
      qty,
    } = req.body;

    const newProduct = new Product({
      BusinessId,
      name,
      price,
      images,
      weight,
      length,
      breadth,
      height,
      desc,
      qty,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBusinessProducts = async (req, res) => {
  const businessId = req.params.id;

  try {
    const products = await Product.findAll({ BusinessId: businessId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Update product details based on the request body
    if (req.body.name) {
      product.name = req.body.name;
    }

    if (req.body.price) {
      product.price = req.body.price;
    }

    if (req.body.images && Array.isArray(req.body.images)) {
      product.images.push(...req.body.images);
    }

    if (req.body.weight) {
      product.weight = req.body.weight;
    }

    if (req.body.length) {
      product.length = req.body.length;
    }

    if (req.body.breadth) {
      product.breadth = req.body.breadth;
    }

    if (req.body.height) {
      product.height = req.body.height;
    }

    if (req.body.desc) {
      product.desc = req.body.desc;
    }

    if(req.body.qty){
        product.qty = req.body.qty;
    }

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    
    res
      .status(500)
      .json({ error:error.message});
  }
};

const deleteProduct =async(req,res)=>{
    try{
        const productId = req.params.id
        await Product.findByIdAndDelete(productId);

        res.status(200).json("Product deleted")
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


module.exports = {
  addProduct,
  getProductById,
  fetchAllProducts,
  getBusinessProducts,
  updateProduct,deleteProduct
};
