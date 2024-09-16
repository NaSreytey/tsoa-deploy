import { productCreateSchema } from "@/schema/product-create-schema";
import { ProductService } from "@/services/product.service";
import {
  Controller,
  Route,
  Body,
  Post,
  Response,
  Middlewares,
  Path,
  Get,
  Put,
  Delete,
} from "tsoa";
import { ProductResponse } from "./types/user-response.type";
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "./types/product-request.type";
import validateRequest from "@/middlewares/validate-input";

@Route("v1/products")
export class ProductController extends Controller {
  @Get()
  @Response(200, "Success") // Add a response annotation
  @Response(500, "Internal Server Error")
  public async getAllProducts(): Promise<{ message: string; data: any }> {
    try {
      const response = await ProductService.getProductAll();
      return {
        message: "success",
        data: response,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      this.setStatus(500);
      return {
        message: "Error fetching products",
        data: [],
      };
    }
  }

  @Get("{id}")
  @Response(200, "Success")
  @Response(404, "Item not found")
  @Response(500, "Error fetching item")
  public async getItemById(@Path() id: string): Promise<ProductResponse> {
    try {
      const item = await ProductService.getProductById(id);
        return {
          message: "success",
          data: item,
        };
    } catch (error) {
      this.setStatus(500);
      throw new Error("Error fetching item");
    }
  }

  @Post()
  @Response(201, "Created Success")
  @Response(400, "Bad Request")
  @Middlewares(validateRequest(productCreateSchema))
  public async createItem(
    @Body() requestBody: ProductCreateRequest
  ): Promise<ProductResponse> {
    try {
      const newProduct = await ProductService.createProduct(requestBody);
      return {
        message: "success",
        data: {
          id: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
        },
      };
    } catch (error) {
      this.setStatus(400);
      throw new Error("Error creating product");
    }
  }
  @Put("{id}")
  @Response(200, "Item updated successfully")
  @Response(404, "Item not found")
  @Response(400, "Invalid input")
  @Response(500, "Error updating item")
  public async updateItemById(
    @Path() id: string,
    @Body() updateData: ProductUpdateRequest
  ): Promise<ProductResponse> {
    try {
      const updatedItem = await ProductService.updateProduct(id, updateData);
      if (!updatedItem) {
        this.setStatus(404);
        return {
          message: "Item not found",
          data: updatedItem,
        };
      }
      return {
        message: "Item updated successfully",
        data: updatedItem,
      };
    } catch (error) {
      this.setStatus(500);
      throw new Error("Error updating item");
    }
  }
  @Delete("{id}")
  @Response(200, "Item deleted successfully")
  @Response(404, "Item not found")
  @Response(500, "Error deleting item")
  public async deleteItemById(@Path() id: string): Promise<{ message: string }> {
    try {
      const itemExists = await ProductService.getProductById(id);
      if (!itemExists) {
        this.setStatus(404);
        return {
          message: "Item not found",
        };
      }
  
      await ProductService.deleteProduct(id);  // No need to check truthiness
      return {
        message: "Item deleted successfully",
      };
    } catch (error) {
      this.setStatus(500);
      throw new Error("Error deleting item");
    }
  }
}  