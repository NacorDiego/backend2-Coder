import Product from './models/product.model';

export const createProduct = async (dataProduct: any) => {
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
  try {
    const productSave = await newProduct.save();

    return { status: 201, data: productSave };
  } catch (error: any) {
    throw new Error(`Error al agregar el producto: ${error.message}`);
  }
};

export const getProducts = async (
  limit: number,
  page: number,
  status: boolean | undefined,
  category: string | undefined,
  sort: string | undefined,
) => {
  // query
  let query: any = {};
  if (status !== undefined) query.status = status;
  if (category !== undefined) query.category = category;

  // options
  const options: any = {
    limit,
    page,
    sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
  };

  try {
    const products = await Product.paginate(query, options);

    if (!products) {
      throw new Error('No se encontraron productos.');
    }

    return { status: 200, data: products };
  } catch (error: any) {
    throw Error(`Error al obtener los productos: ${error.message}`);
  }
};

export const getProductById = async (pId: string) => {
  try {
    const productId = pId;
    const product = await Product.findById(productId);

    if (!product) throw new Error('El producto no existe.');

    return { status: 200, data: product };
  } catch (error: any) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }
};

export const updateProductById = async (pId: string, updates: any) => {
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

export const deleteProductById = async (pId: string) => {
  try {
    const productId = pId;

    await Product.findByIdAndDelete(productId);

    return { status: 204 };
  } catch (error: any) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};
