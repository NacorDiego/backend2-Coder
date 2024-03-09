export interface Cart {
  id?: number;
  products: ProductInTheCart[];
}

export interface ProductInTheCart {
  id: number;
  quantity: number;
}
