import { createCrudSlice } from "../../../../core/redux/reduxFactory";
import * as billsService from "../../data/dataService/transaction_service";
import { BillDetail, CreateBillsRequest, UpdateBillsRequest } from "../../data/models/BillsRequestModel";
import { Bill, BillsResponse, DetailBillsResponse, DataDetailBill } from "../../data/models/BillsResponseModel";

const billsServiceAdapter = {
    fetchAll: billsService.fetchBills,
    fetchById: billsService.fetchDetailBill,
    create: billsService.creatBill,
    update: (data: UpdateBillsRequest) => billsService.updateBill(data),
    remove: billsService.deleteBill,
}

const { slice, actions } = createCrudSlice<
    Bill,
    DataDetailBill, // Ubah dari BillDetail menjadi DataDetailBill
    BillsResponse,
    DetailBillsResponse,
    CreateBillsRequest,
    UpdateBillsRequest // Tambahkan UpdateBillsRequest untuk konsistensi tipe
>("bills", billsServiceAdapter);

// Export reducer dan actions
export const billReducer = slice.reducer;
export const {
    fetchAll: getBills,
    fetchById: getBillDetail,
    create: createNewBill,
    clearDetail,
    clearErrors
} = actions;

export default billReducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { BillState } from "./billState";
// import { fetchBills } from "../../data/dataService/transaction_service";

// const initialState: BillState = {
//     bills: [], // Array of bills
//     isLoading: false, // Loading state
//     error: null, // Error message if any
// }

// export const getBills = createAsyncThunk(
//     'bills/getBills',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetchBills();
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch bills');
//         }
//     }
// );

// const billSlice = createSlice({
//     name: 'bills',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getBills.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getBills.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.bills = action.payload;
//             })
//             .addCase(getBills.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export default billSlice.reducer;