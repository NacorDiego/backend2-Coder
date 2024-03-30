import Product from '@models/product.model';

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
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
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
      throw {
        status: 404,
        message: 'No se encontraron productos.',
      };
    }

    return { status: 200, data: products };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const getProductById = async (pId: string) => {
  try {
    const productId = pId;
    const product = await Product.findById(productId);

    if (!product)
      throw {
        status: 404,
        message: 'El producto no existe.',
      };

    return { status: 200, data: product };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const updateProductById = async (pId: string, updates: any) => {
  try {
    const productId = pId;
    const newData = updates;

    const updatedProduct = await Product.findByIdAndUpdate(productId, newData, {
      new: true,
    });

    if (!updatedProduct)
      throw {
        status: 404,
        message: 'No se encontró el producto para actualizar.',
      };

    return { status: 200, data: updatedProduct };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const deleteProductById = async (pId: string) => {
  try {
    const productId = pId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct)
      throw {
        status: 404,
        message: 'No se encontró el producto para eliminar.',
      };

    return { status: 204 };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
