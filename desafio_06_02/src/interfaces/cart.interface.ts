export interface Cart {
  id?: string;
  products: ProductInTheCart[];
}

export interface ProductInTheCart {
  id: string;
  quantity: number;
}
