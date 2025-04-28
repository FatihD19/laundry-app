import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { getStoredCredentials, getStoredToken } from "../utils/storage";

import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo

import TransactionScreen from "../../feature/transaction/presentation/screen/TransactionScreen";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  setCredentials,
} from "../../feature/auth/presentation/redux/authslice";
import LoginScreen from "../../feature/auth/presentation/screen/LoginScreen";
import { Product } from "../../feature/product/data/models/ProductModels";
import DetailProduct from "../../feature/product/presentation/screen/DetailProduct";
import AuthNavigator from "./AuthNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../../feature/product/presentation/screen/ProductScreen";
import CustomerScreen from "../../feature/customer/presentation/screen/CustomerScreen";
import CreateBillsScreen from "../../feature/transaction/presentation/screen/CreateBillsScrreen";
import CustomerDetailScreen from "../../feature/customer/presentation/screen/CustomerDetailScreen";
import BillDetailScreen from "../../feature/transaction/presentation/screen/DetailBillsScreen";

export type RootStackParamList = {
  MainNavigator: undefined;
  DetailProduct: { productId: string };
  Login: undefined;
  CreateBill: undefined;
  CustomerDetail: { customerId?: string }; // Tambahkan parameter untuk halaman CustomerDetail
  BillDetail: { billId: string };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="Transactions"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cube" : "cube-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getStoredToken();
      const { username, password } = await getStoredCredentials();

      if (token && username && password) {
        dispatch(setCredentials({ username, password, token }));
        dispatch(loginUser({ username, password }));
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
            <Stack.Screen name="DetailProduct" component={DetailProduct} />
            <Stack.Screen name="CreateBill" component={CreateBillsScreen} />
            <Stack.Screen
              name="CustomerDetail"
              component={CustomerDetailScreen}
            />
            <Stack.Screen name="BillDetail" component={BillDetailScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
