import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AppDispatch, RootState } from "../../../../core/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../redux/customerslice";
import AddButton from "../../../../core/components/AddButton";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useNavigation } from "@react-navigation/native";
import CustomerCard from "../components/CustomerCard";

const CustomerScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.customers
  );
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer</Text>
      </View>
      {items.length > 0 ? (
        <FlatList
          style={{ width: "100%", padding: 16 }}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CustomerCard customer={item} />}
          // <View style={styles.customerItem}>
          //   <TouchableOpacity
          //     onPress={() =>
          //       navigation.navigate("CustomerDetail", {
          //         customerId: item.id,
          //       })
          //     }
          //   >
          //     <Text style={styles.customerName}>{item.name}</Text>
          //     <Text style={styles.customerDetails}>{item.address}</Text>
          //     <Text style={styles.customerDetails}>{item.phoneNumber}</Text>
          //   </TouchableOpacity>
          // </View>
        />
      ) : (
        <Text style={styles.subText}>No customers available.</Text>
      )}
      <AddButton
        title="Add Customer"
        onPress={() => navigation.navigate("CustomerDetail")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "#f5f5f5",
    // padding: 16,
  },
  header: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subText: {
    fontSize: 16,
    color: "#666",
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
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#007bff",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CustomerScreen;
