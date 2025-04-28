
import * as customerService from "../../data/dataService/customer_service";
import { Customer, CustomerDetail, CustomerDetailResponse, CustomerResponse } from "../../data/models/CustomerResponseModels";
import { CreateCustomerRequest, UpdateCustomerRequest } from "../../data/models/CustomerRequestModels";
import { createCrudSlice } from "../../../../core/redux/reduxFactory";

// Adapter untuk menyesuaikan customer service dengan interface CrudService
const customerServiceAdapter = {
    fetchAll: customerService.fetchCustomers,
    fetchById: customerService.fetchDetailCustomer,
    create: customerService.createCustomer,
    update: customerService.updateCusomer,
    remove: customerService.deleteCustomer
};

// Buat slice menggunakan factory
const { slice, actions } = createCrudSlice<
    Customer,
    CustomerDetail,
    CustomerResponse,
    CustomerDetailResponse,
    CreateCustomerRequest,
    UpdateCustomerRequest
>("customers", customerServiceAdapter);

// Export reducer dan actions
export const customerReducer = slice.reducer;
export const {
    fetchAll: getCustomers,
    fetchById: getCustomerDetail,
    create: createNewCustomer,
    update: updateExistingCustomer,
    remove: deleteExistingCustomer,
    clearDetail,
    clearErrors
} = actions;
export default customerReducer;
// // import { createSlice } from "@reduxjs/toolkit";

// // import {
// //     fetchCustomers,
// //     fetchDetailCustomer,
// //     createCustomer,
// //     updateCusomer,
// //     deleteCustomer,
// // } from "../../data/dataService/customer_service";
// // import { Customer, CustomerDetailResponse } from "../../data/models/CustomerResponseModels";
// // import { CreateCustomerRequest, UpdateCustomerRequest } from "../../data/models/CustomerRequestModels";
// // import { createCRUDAsyncThunks, createCRUDExtraReducers } from "../../../../core/redux/reduxFactory";

// // export interface CustomerState {
// //     customers: Customer[];
// //     detail: CustomerDetailResponse | null;
// //     isLoading: boolean;
// //     error: string | null;
// // }

// // const initialState: CustomerState = {
// //     customers: [],
// //     detail: null,
// //     isLoading: false,
// //     error: null,
// // };

// // // Create CRUD thunks using the factory
// // const customerThunks = createCRUDAsyncThunks("customers", {
// //     fetchAll: fetchCustomers,
// //     fetchById: fetchDetailCustomer,
// //     create: createCustomer,
// //     update: updateCusomer,
// //     delete: deleteCustomer,
// // });

// // const customerSlice = createSlice({
// //     name: "customers",
// //     initialState,
// //     reducers: {},
// //     extraReducers: (builder) => {
// //         createCRUDExtraReducers(builder, customerThunks, "customers");
// //     },
// // });

// // export const {
// //     fetchAll: getCustomers,
// //     fetchById: getCustomerDetail,
// //     create: createNewCustomer,
// //     update: updateExistingCustomer,
// //     remove: deleteExistingCustomer,
// // } = customerThunks;

// // export default customerSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//     fetchCustomers,
//     fetchDetailCustomer,
//     createCustomer,
//     updateCusomer,
//     deleteCustomer,
// } from "../../data/dataService/customer_service";
// import {
//     CreateCustomerRequest,
//     UpdateCustomerRequest,
// } from "../../data/models/CustomerRequestModels";
// import { Customer, CustomerDetailResponse } from "../../data/models/CustomerResponseModels";

// export interface CustomerState {
//     customers: Customer[]; // Array of customers
//     customerDetail: CustomerDetailResponse | null; // Detail of a single customer
//     isLoading: boolean; // Loading state
//     error: string | null; // Error message if any
// }

// const initialState: CustomerState = {
//     customers: [], // Array of customers
//     customerDetail: null, // Detail of a single customer
//     isLoading: false, // Loading state
//     error: null, // Error message if any
// };

// // Fetch all customers
// export const getCustomers = createAsyncThunk(
//     "customers/getCustomers",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetchCustomers();
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch customers");
//         }
//     }
// );

// // Fetch customer detail
// export const getCustomerDetail = createAsyncThunk(
//     "customers/getCustomerDetail",
//     async (id: string, { rejectWithValue }) => {
//         try {
//             const response = await fetchDetailCustomer(id);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch customer detail");
//         }
//     }
// );

// // Create a new customer
// export const createNewCustomer = createAsyncThunk(
//     "customers/createNewCustomer",
//     async (customer: CreateCustomerRequest, { rejectWithValue }) => {
//         try {
//             const response = await createCustomer(customer);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || "Failed to create customer");
//         }
//     }
// );

// // Update an existing customer
// export const updateExistingCustomer = createAsyncThunk(
//     "customers/updateExistingCustomer",
//     async (customer: UpdateCustomerRequest, { rejectWithValue }) => {
//         try {
//             const response = await updateCusomer(customer);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || "Failed to update customer");
//         }
//     }
// );

// // Delete a customer
// export const deleteExistingCustomer = createAsyncThunk(
//     "customers/deleteExistingCustomer",
//     async (id: string, { rejectWithValue }) => {
//         try {
//             await deleteCustomer(id);
//             return id; // Return the deleted customer's ID
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || "Failed to delete customer");
//         }
//     }
// );

// const customerSlice = createSlice({
//     name: "customers",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Get all customers
//             .addCase(getCustomers.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getCustomers.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.customers = action.payload;
//             })
//             .addCase(getCustomers.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Get customer detail
//             .addCase(getCustomerDetail.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getCustomerDetail.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.customerDetail = action.payload;
//             })
//             .addCase(getCustomerDetail.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Create a new customer
//             .addCase(createNewCustomer.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(createNewCustomer.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.customers.push(action.payload.data);
//             })
//             .addCase(createNewCustomer.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Update an existing customer
//             .addCase(updateExistingCustomer.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(updateExistingCustomer.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 const index = state.customers.findIndex(
//                     (customer) => customer.id === action.payload.data.id
//                 );
//                 if (index !== -1) {
//                     state.customerDetail = action.payload;
//                 }
//             })
//             .addCase(updateExistingCustomer.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Delete a customer
//             .addCase(deleteExistingCustomer.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(deleteExistingCustomer.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.customers = state.customers.filter(
//                     (customer) => customer.id !== action.payload
//                 );
//             })
//             .addCase(deleteExistingCustomer.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export default customerSlice.reducer;