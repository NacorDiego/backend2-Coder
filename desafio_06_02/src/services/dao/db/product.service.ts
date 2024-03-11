import Product from './models/product.model';

export const createProduct = async (dataProduct: any) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = dataProduct;

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

    return { status: 201, data: productSave };
  } catch (error: any) {
    throw new Error(
      `Error al agregar el producto a la base de datos: ${error.message}`,
    );
  }
};

export const getProducts = async (limit: number | undefined) => {
  try {
    let products;

    if (limit !== undefined && limit >= 0) {
      products = await Product.find().limit(limit);
    } else {
      products = await Product.find();
    }

    if (!products) {
      throw new Error('No se encontrar productos.');
    }

    return { status: 200, data: products };
  } catch (error: any) {
    throw Error(
      `Error al traer los productos de la base de datos: ${error.message}`,
    );
  }
};

export const getProductById = async (pId: string) => {
  try {
    const productId = pId;
    const product = await Product.findById(productId);

    if (!product) throw new Error('El producto no existe.');

    return { status: 200, data: product };
  } catch (error: any) {
    throw Error(`Error al traer el producto: ${error.message}`);
  }
};

export const updateProductById = async (pId: number, updates: any) => {
  try {
    const productId = pId;
    const newData = updates;

    const updatedProduct = await Product.findByIdAndUpdate(productId, newData, {
      new: true,
    });

    return { status: 200, data: updatedProduct };
  } catch (error: any) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
};

export const deleteProductById = async (pId: number) => {
  try {
    const productId = pId;

    await Product.findByIdAndDelete(productId);

    return { status: 204 };
  } catch (error: any) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};
