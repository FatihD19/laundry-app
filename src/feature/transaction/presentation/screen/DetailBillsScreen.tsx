import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";

import { AppDispatch, RootState } from "../../../../core/redux/store";
import { getBillDetail, clearDetail } from "../redux/billSlice";
import { RootStackParamList } from "../../../../core/navigation/AppNavigator";
import { format } from "date-fns";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type BillDetailScreenRouteProp = RouteProp<RootStackParamList, "BillDetail">;

const BillDetailScreen: React.FC = () => {
  const route = useRoute<BillDetailScreenRouteProp>();
  const { billId } = route.params || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    detail: bill,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.bills);

  useEffect(() => {
    if (billId) {
      dispatch(getBillDetail(billId));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearDetail());
    };
  }, [billId, dispatch]);

  // Format date function
  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy, HH:mm");
    } catch {
      return "Invalid date";
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    if (!bill?.billDetails) return 0;

    return bill.billDetails.reduce((sum, detail) => {
      return sum + detail.price * detail.qty;
    }, 0);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!bill) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Bill not found</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bill Details</Text>
        <Text style={styles.billId}>ID: {bill.id}</Text>
      </View>

      {/* Bill Date */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Bill Date:</Text>
          <Text style={styles.value}>{formatDate(bill.billDate)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Created:</Text>
          <Text style={styles.value}>{formatDate(bill.createdAt)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Updated:</Text>
          <Text style={styles.value}>{formatDate(bill.updatedAt)}</Text>
        </View>
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer</Text>
        {bill.customer && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{bill.customer.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{bill.customer.phoneNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{bill.customer.address}</Text>
            </View>
          </>
        )}
      </View>

      {/* User Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Handled By</Text>
        {bill.user && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{bill.user.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{bill.user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{bill.user.role}</Text>
            </View>
          </>
        )}
      </View>

      {/* Bill Details (Products) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>

        {/* Header for the items table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.productColumn]}>
            Product
          </Text>
          <Text style={[styles.tableHeaderText, styles.qtyColumn]}>Qty</Text>
          <Text style={[styles.tableHeaderText, styles.priceColumn]}>
            Price
          </Text>
          <Text style={[styles.tableHeaderText, styles.subtotalColumn]}>
            Subtotal
          </Text>
        </View>

        {/* Items list */}
        {bill.billDetails.map((detail) => (
          <View key={detail.id} style={styles.tableRow}>
            <View style={styles.productColumn}>
              <Text style={styles.productName}>{detail.product.name}</Text>
              <Text style={styles.productType}>{detail.product.type}</Text>
            </View>
            <Text style={styles.qtyColumn}>{detail.qty}</Text>
            <Text style={styles.priceColumn}>
              Rp{detail.price.toLocaleString()}
            </Text>
            <Text style={styles.subtotalColumn}>
              Rp{(detail.price * detail.qty).toLocaleString()}
            </Text>
          </View>
        ))}

        {/* Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>
            Rp{calculateTotal().toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  billId: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: 80,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    flex: 1,
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#555",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  productColumn: {
    flex: 3,
  },
  productName: {
    fontWeight: "500",
    marginBottom: 2,
  },
  productType: {
    fontSize: 12,
    color: "#666",
  },
  qtyColumn: {
    flex: 1,
    textAlign: "center",
  },
  priceColumn: {
    flex: 2,
    textAlign: "right",
  },
  subtotalColumn: {
    flex: 2,
    textAlign: "right",
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#007bff",
  },
  actions: {
    marginTop: 8,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default BillDetailScreen;
