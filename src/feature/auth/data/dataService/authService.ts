import apiClient from '../../../../core/api/apiClient';
import { LoginRequest, LoginResponse } from '../models/AuthModels';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};
