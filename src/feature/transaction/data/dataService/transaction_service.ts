import apiClient from "../../../../core/api/apiClient";
import { CreateBillsRequest, UpdateBillsRequest } from "../models/BillsRequestModel";
import { BillsResponse, DetailBillsResponse } from "../models/BillsResponseModel";


export const fetchBills = async (): Promise<BillsResponse> => {
    const response = await apiClient.get<BillsResponse>('/bills');
    return response.data;
}

export const fetchDetailBill = async (id: string): Promise<DetailBillsResponse> => {
    const response = await apiClient.get<DetailBillsResponse>(`/bills/${id}`);
    return response.data;
}

export const creatBill = async (bill: CreateBillsRequest): Promise<DetailBillsResponse> => {
    const response = await apiClient.post<DetailBillsResponse>('/bills', bill);
    return response.data;
}

export const updateBill = async (bill: UpdateBillsRequest): Promise<DetailBillsResponse> => {
    const response = await apiClient.put<DetailBillsResponse>(`/bills/${bill.customerId}`, bill);
    return response.data;
}

export const deleteBill = async (id: string): Promise<void> => {
    await apiClient.delete(`/bills/${id}`);
}