
export interface ProductsResponse {
    status: {
        code: number;
        description: string;
    };
    data: Product[];
    paging: any;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}



//detail product model
export interface DetailProductResponse {
    status: Status;
    data: DetailProduct;
}

export interface DetailProduct {
    id: string;
    name: string;
    price: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}



export interface Status {
    code: number;
    description: string;
}
