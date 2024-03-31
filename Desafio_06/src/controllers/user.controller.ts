import { Request, Response } from 'express';
import userModel from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const products = await userModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(`No se pudo obtener los usuarios con mongoose: ${error}`);
    res.status(500).send({
      error: `No se pudo obtener los usuarios con mongoose: ${error}`,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const dataUser = { firstName, lastName, email, age };

    const createdUser = await userModel.create(dataUser);

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(`No se pudo crear el usuario con mongoose: ${error}`);
    res
      .status(500)
      .send({ error: `No se pudo crear el usuario con mongoose: ${error}` });
  }
};

export const updateUserByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.pid;
    const updates = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`No se pudo actualizar el usuario con mongoose: ${error}`);
    res.status(500).send({
      error: `No se pudo actualizar el usuario con mongoose: ${error}`,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.pid;

    const deletedUser = await userModel.findByIdAndDelete(productId);

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(`No se pudo eliminar el usuario con mongoose: ${error}`);
    res
      .status(500)
      .send({ error: `No se pudo eliminar el usuario con mongoose: ${error}` });
  }
};
