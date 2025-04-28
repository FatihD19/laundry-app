import React from "react";
import { Customer } from "../../data/models/CustomerResponseModels";
import { RootStackParamList } from "../../../../core/navigation/AppNavigator";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "@react-navigation/native";
import { AppDispatch } from "../../../../core/redux/store";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
import { deleteExistingCustomer } from "../redux/customerslice";
import DeleteButton from "../../../../core/components/DeleteButton";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  const handlePress = () => {
    navigation.navigate("CustomerDetail", {
      customerId: customer.id,
    });
  };
  const handleDelete = () => {
    dispatch(deleteExistingCustomer(customer.id)).then(() => {
      Alert.alert("Success", "Product deleted successfully");
    });
  };

  return (
    <View style={styles.customerItem}>
      <TouchableOpacity onPress={() => handlePress()}>
        <View style={styles.details}>
          <View>
            <Text style={styles.customerName}>{customer.name}</Text>
            <Text style={styles.customerDetails}>{customer.address}</Text>
            <Text style={styles.customerDetails}>{customer.phoneNumber}</Text>
          </View>
          <DeleteButton
            onDelete={handleDelete}
            confirmationTitle="Confirm Delete"
            confirmationMessage="Are you sure you want to delete this product?"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customerItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customerDetails: {
    fontSize: 14,
    color: "#666",
  },
});
