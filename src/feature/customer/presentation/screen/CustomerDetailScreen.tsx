import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerDetail,
  createNewCustomer,
  updateExistingCustomer,
  getCustomers,
} from "../redux/customerslice";
import { RootState, AppDispatch } from "../../../../core/redux/store";
import {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../../data/models/CustomerRequestModels";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../core/navigation/AppNavigator";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

interface CustomerDetailScreenProps {
  route: {
    params: {
      customerId?: string; // Optional for create mode
    };
  };
  navigation: any;
}

const CustomerDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "CustomerDetail">>();
  const { customerId } = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const { detail, isLoading, error } = useSelector(
    (state: RootState) => state.customers
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomerDetail(customerId));
    }
  }, [customerId, dispatch]);

  useEffect(() => {
    if (detail && customerId) {
      setName(detail.name);
      setaddress(detail.address);
      setPhone(detail.phoneNumber);
    }
  }, [detail, customerId]);

  const handleSave = () => {
    if (customerId) {
      // Update customer
      const updatedCustomer: UpdateCustomerRequest = {
        id: customerId,
        name,
        address,
        phoneNumber: phone,
      };
      dispatch(updateExistingCustomer(updatedCustomer))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Customer updated successfully");
          dispatch(getCustomers()); // Refresh the customer list
          navigation.goBack();
        })
        .catch((err) => Alert.alert("Error", err));
    } else {
      // Create customer
      const newCustomer: CreateCustomerRequest = {
        name,
        address,
        phoneNumber: phone,
      };
      dispatch(createNewCustomer(newCustomer))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Customer created successfully");
          navigation.goBack();
        })
        .catch((err) => Alert.alert("Error", err));
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {customerId ? "Update Customer" : "Create Customer"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="address"
        value={address}
        onChangeText={setaddress}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default CustomerDetailScreen;
