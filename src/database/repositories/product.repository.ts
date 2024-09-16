// src/repositories/product.repository.ts
import { ProductCreateRequest, ProductUpdateRequest } from "@/controllers/types/product-request.type";
import ProductModel, { ProductType } from "../models/products";
import { NotFoundError } from "@/utils/errors";

class ProductRepository {
  public async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<ProductType> {
    try {
      const newProduct = await ProductModel.create(productRequest);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  public async getProductById(id: string): Promise<ProductType> {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        throw new NotFoundError("Product not found!");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
  public async getProductAll(): Promise<ProductType[]> {
    try {
      const product = await ProductModel.find();
      if (!product) {
        throw new Error("Product not found!");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
  
  public async updateProduct(
    id: string,
    productRequest: ProductUpdateRequest
  ): Promise<ProductType> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        productRequest,
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error("Product not found!");
      }

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProduct(id: string): Promise<void> {
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        throw new Error("Product not found!");
      }
    } catch (error) {
      throw error;
    }
  }
}

// Add more repository methods as needed
export default new ProductRepository();
