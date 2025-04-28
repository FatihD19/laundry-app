export interface CustomerResponse {
    status: Status;
    data: Customer[];
    paging: null;
}

export interface Customer {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Status {
    code: number;
    description: string;
}

export interface CustomerDetailResponse {
    status: Status;
    data: CustomerDetail;
}

export interface CustomerDetail {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Status {
    code: number;
    description: string;
}
