import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../feature/auth/presentation/redux/authslice';
import productReducer from '../../feature/product/redux/productSlice';
// import detailProductReducer from '../../feature/product/redux/detailProductSlice';
import customerReducer from '../../feature/customer/presentation/redux/customerslice';
import billReducer from '../../feature/transaction/presentation/redux/billSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        // detailsProduct: detailProductReducer,
        customers: customerReducer,
        bills: billReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;