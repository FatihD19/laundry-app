import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../feature/auth/presentation/screen/LoginScreen";
import CreateBillsScreen from "../../feature/transaction/presentation/screen/CreateBillsScrreen";

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
