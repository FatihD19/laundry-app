export interface CreateProductRequest {
    name: string;
    price: number;
    type: string;
}

export interface UpdateProductRequest {
    id: string;
    name: string;
    price: number;
    type: string;
}