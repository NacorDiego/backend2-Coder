import { Request, Response } from 'express';
import Product from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;

  const newProduct = new Product({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  });

  const productSave = await newProduct.save();

  res.status(201).json(productSave);
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.pid;
  const product = await Product.findById(productId);

  res.status(200).json(product);
};

export const updateProductById = async (req: Request, res: Response) => {
  const productId = req.params.pid;
  const newData = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(productId, newData, {
    new: true,
  });

  res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req: Request, res: Response) => {
  const productId = req.params.pid;

  await Product.findByIdAndDelete(productId);

  res.status(204).json();
};
