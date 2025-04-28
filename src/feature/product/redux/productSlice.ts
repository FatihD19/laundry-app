import { createCrudSlice } from '../../../core/redux/reduxFactory';
import { UpdateCustomerRequest } from '../../customer/data/models/CustomerRequestModels';
import * as productService from '../data/dataService/productService';
import { DetailProduct, DetailProductResponse, Product, ProductsResponse } from '../data/models/ProductModels';
import { CreateProductRequest, UpdateProductRequest } from '../data/models/ProductRequestModels';


const productServiceAdapter = {
    fetchAll: productService.fetchProducts,
    fetchById: productService.fetchDetailProduct,
    create: productService.createProduct,
    update: productService.updateProduct,
    remove: productService.deleteProdcut,
}

const { slice, actions } = createCrudSlice<
    Product,
    DetailProduct,
    ProductsResponse,
    DetailProductResponse,
    CreateProductRequest,
    UpdateProductRequest
>("products", productServiceAdapter);

export const productReducer = slice.reducer;
export const {
    fetchAll: fetchProducts,
    fetchById: getProductDetail,
    create: createProduct,
    update: updateExitingProduct,
    remove: deleteExitingProduct,
    clearDetail,
    clearErrors
} = actions;
export default productReducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { createProduct, deleteProdcut, fetchDetailProduct, fetchProducts, updateProduct } from '../data/dataService/productService';
// import { DetailProduct, DetailProductResponse, Product } from '../data/models/ProductModels';
// import { CreateProductRequest, UpdateProductRequest } from '../data/models/ProductRequestModels';

// export interface ProductState {
//     products: Product[];
//     productDetail: DetailProductResponse | null;
//     isLoading: boolean;
//     error: string | null;
// }


// const initialState: ProductState = {
//     products: [],
//     productDetail: null,
//     isLoading: false,
//     error: null,
// };


// export const getProducts = createAsyncThunk(
//     'products/getProducts',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetchProducts();
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
//         }
//     }
// );
// // Fetch product detail
// export const getProductDetail = createAsyncThunk(
//     'products/getProductDetail',
//     async (id: string, { rejectWithValue }) => {
//         try {
//             const response = await fetchDetailProduct(id);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch product detail');
//         }
//     }
// );
// // Create a new product
// export const createNewProduct = createAsyncThunk(
//     'products/createNewProduct',
//     async (product: CreateProductRequest, { rejectWithValue }) => {
//         try {
//             const response = await createProduct(product);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to create product');
//         }
//     }
// );

// // Update an existing product
// export const updateExistingProduct = createAsyncThunk(
//     'products/updateExistingProduct',
//     async (product: UpdateProductRequest, { rejectWithValue }) => {
//         try {
//             const response = await updateProduct(product);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to update product');
//         }
//     }
// );

// // Delete a product
// export const deleteExistingProduct = createAsyncThunk(
//     'products/deleteExistingProduct',
//     async (id: string, { rejectWithValue }) => {
//         try {
//             await deleteProdcut(id);
//             return id; // Return the deleted product's ID
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
//         }
//     }
// );


// const productSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getProducts.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getProducts.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.products = action.payload;
//             })
//             .addCase(getProducts.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Get product detail
//             .addCase(getProductDetail.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getProductDetail.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.productDetail = action.payload;
//             })
//             .addCase(getProductDetail.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Create a new product
//             .addCase(createNewProduct.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(createNewProduct.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.products.push(action.payload.data);

//             })
//             .addCase(createNewProduct.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Update an existing product
//             .addCase(updateExistingProduct.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(updateExistingProduct.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 const index = state.products.findIndex(
//                     (product) => product.id === action.payload.data.id
//                 );
//                 if (index !== -1) {
//                     state.productDetail = action.payload;
//                 }
//             })
//             .addCase(updateExistingProduct.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })

//             // Delete a product
//             .addCase(deleteExistingProduct.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(deleteExistingProduct.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.products = state.products.filter(
//                     (product) => product.id !== action.payload
//                 );
//             })
//             .addCase(deleteExistingProduct.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             });

//     },
// });

// export default productSlice.reducer;