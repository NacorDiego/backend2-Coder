export interface Product {
  title: string;
  description: string;
  code: number;
  price: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnail?: string;
  id?: string;
}

export interface IQuery {
  status?: boolean;
  category?: string;
}
