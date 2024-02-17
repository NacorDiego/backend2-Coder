export interface Cart {
  id?: number;
  products: ProductInTheCart[];
}

interface ProductInTheCart {
  id: number;
  quantity: number;
}
