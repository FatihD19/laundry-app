import apiClient from '../../../../core/api/apiClient';
import { DetailProductResponse, ProductsResponse } from '../models/ProductModels';
import { CreateProductRequest, UpdateProductRequest } from '../models/ProductRequestModels';

export const fetchProducts = async (): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/products');
    return response.data;
};

export const fetchDetailProduct = async (id: string): Promise<DetailProductResponse> => {
    const response = await apiClient.get<DetailProductResponse>(`/products/${id}`);
    return response.data;
}

export const createProduct = async (product: CreateProductRequest): Promise<DetailProductResponse> => {
    const response = await apiClient.post<DetailProductResponse>(`/products`, product);
    return response.data;
}

export const updateProduct = async (product: UpdateProductRequest): Promise<DetailProductResponse> => {
    const response = await apiClient.put<DetailProductResponse>(`/products`, product);
    return response.data;
}

export const deleteProdcut = async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
}