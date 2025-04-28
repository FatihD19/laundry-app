import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppDispatch, RootState } from "../../../../core/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "../redux/billSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import AddButton from "../../../../core/components/AddButton";

const TransactionScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.bills
  );
  const { username } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getBills());
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
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Your Bills</Text>
        {items.length > 0 ? (
          items.map((bill, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BillDetail", { billId: bill.id })
              }
            >
              <View key={index} style={styles.billItem}>
                <Text style={styles.billText}>Bill ID: {bill.id}</Text>
                <Text style={styles.billText}>
                  Amount: {bill.customer.name}
                </Text>
                <Text style={styles.billText}>Status: {bill.user.role}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.subText}>No bills available.</Text>
        )}
      </View>

      {/* Floating Action Button */}
      <AddButton
        title="Add Bill"
        onPress={() => navigation.navigate("CreateBill")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  userInfo: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 18,
    color: "#666",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#666",
  },
  billItem: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  billText: {
    fontSize: 16,
    color: "#333",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export default TransactionScreen;
