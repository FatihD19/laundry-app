// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { login } from '../../data/dataService/authService';
import { clearStorage, storeCredentials, storeToken } from '../../../../core/utils/storage';
import { AuthState } from './authstate';
import { LoginRequest } from '../../data/models/AuthModels';

const initialState: AuthState = {
    token: null,
    username: null,
    password: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await login(credentials);
            // Store token and credentials for auto-login
            await storeToken(response.data.token);
            await storeCredentials(credentials.username, credentials.password);
            return {
                token: response.data.token,
                username: credentials.username,
                password: credentials.password
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        await clearStorage();
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ username: string | null; password: string | null; token: string | null }>) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.password = action.payload.password;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.username = null;
                state.password = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;