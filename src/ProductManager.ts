import { Product } from "./core/interfaces/product.interface";

export class ProductManager {
  products:Product[] = [];
  product!:Product;
  idSig:number = 1;

  construct(product:Product) {
    const { title, description, price, thumbnail, code, stock } = product;
    this.product.title = title;
    this.product.description = description;
    this.product.price = price;
    this.product.thumbnail = thumbnail;
    this.product.code = code;
    this.product.stock = stock;
  }

  addProduct(product:Product) {
      if (!this.products.includes()){
          product.id = this.idSig;
          product.id = this.products.push(product);
          this.idSig++;
      }
  }

  private validarCodigoExistente() {

  }
}
