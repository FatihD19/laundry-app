export interface BillsResponse {
    status: Status;
    data: Bill[];
    paging: null;
}

export interface Bill {
    id: string;
    billDate: Date;
    customer: Customer;
    user: User;
    billDetails: BillDetail[];
    createdAt: Date;
    updatedAt: Date;
}

export interface BillDetail {
    id: string;
    billId: string;
    product: Product;
    qty: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Status {
    code: number;
    description: string;
}


//detail bill model
export interface DetailBillsResponse {
    status: Status;
    data: DataDetailBill;
}

export interface DataDetailBill {
    id: string;
    billDate: Date;
    customer: Customer;
    user: User;
    billDetails: BillDetail[];
    createdAt: Date;
    updatedAt: Date;
}

export interface BillDetail {
    id: string;
    billId: string;
    product: Product;
    qty: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Status {
    code: number;
    description: string;
}
