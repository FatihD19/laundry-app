export interface CreateBillsRequest {
    customerId: string;
    billDetails: BillDetail[];
}

export interface BillDetail {
    product: Product;
    qty: number;
}

export interface Product {
    id: string;
}

export interface UpdateBillsRequest {
    id: string;
    customerId?: string;
    billDetails?: BillDetail[];
}