import { ProductType } from "@/database/models/products";
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "../controllers/types/product-request.type";
import ProductRepository from "../database/repositories/product.repository";


export class ProductService {
  public static async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<ProductType> {
    try {
      const newProduct = await ProductRepository.createProduct(productRequest);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  
  
  public static async getProductAll(): Promise<ProductType[]> {
    try {
      const product = await ProductRepository.getProductAll();
      return product;
    } catch (error) {
      throw error;
    }
  }
  public static async getProductById(id: string): Promise<ProductType> {
    try {
      const product = await ProductRepository.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }
  public static async updateProduct(
    id: string,
    productRequest: ProductUpdateRequest
  ): Promise<ProductType> {
    try {
      const updatedProduct = await ProductRepository.updateProduct(
        id,
        productRequest
      );
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteProduct(id: string): Promise<void> {
    try {
      await ProductRepository.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
