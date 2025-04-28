export interface CreateCustomerRequest {
    name: string;
    phoneNumber: string;
    address: string;
}

export interface UpdateCustomerRequest {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
}
