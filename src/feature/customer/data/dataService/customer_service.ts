import apiClient from "../../../../core/api/apiClient";
import { CreateCustomerRequest, UpdateCustomerRequest } from "../models/CustomerRequestModels";
import { Customer, CustomerDetailResponse, CustomerResponse } from "../models/CustomerResponseModels";


export const fetchCustomers = async (): Promise<CustomerResponse> => {
    const response = await apiClient.get<CustomerResponse>('/customers');
    return response.data;
}

export const fetchDetailCustomer = async (id: string): Promise<CustomerDetailResponse> => {
    const response = await apiClient.get<CustomerDetailResponse>(`/customers/${id}`);
    return response.data;
}

export const createCustomer = async (customer: CreateCustomerRequest): Promise<CustomerDetailResponse> => {
    const response = await apiClient.post<CustomerDetailResponse>('/customers', customer);
    return response.data;
}

export const updateCusomer = async (customer: UpdateCustomerRequest): Promise<CustomerDetailResponse> => {
    const response = await apiClient.put<CustomerDetailResponse>(`/customers`, customer);
    return response.data;
}

export const deleteCustomer = async (id: string): Promise<void> => {
    await apiClient.delete(`/customers/${id}`);
}