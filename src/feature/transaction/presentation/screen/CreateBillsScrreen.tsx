import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../core/redux/store";
import { getCustomers } from "../../../customer/presentation/redux/customerslice";
import { fetchProducts } from "../../../product/redux/productSlice";
import { createNewBill } from "../redux/billSlice";
import {
  BillDetail,
  CreateBillsRequest,
  Product,
} from "../../data/models/BillsRequestModel";
import { useNavigation } from "@react-navigation/native";

interface BillItemUI {
  productId: string;
  quantity: string; // Changed to string to match the model
  productName?: string;
  price?: number;
}

const CreateBillsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  // Get data from redux
  const { items: customers, isLoading: customersLoading } = useSelector(
    (state: RootState) => state.customers
  );
  const { items: products, isLoading: productsLoading } = useSelector(
    (state: RootState) => state.products
  );

  // Form state
  const [customerId, setCustomerId] = useState<string>("");
  const [billItems, setBillItems] = useState<BillItemUI[]>([
    { productId: "", quantity: "1" }, // Changed to string
  ]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");

  // Load customers and products on component mount
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Add product to bill
  const addProductToBill = () => {
    if (!selectedProductId) {
      Alert.alert("Error", "Please select a product");
      return;
    }

    const selectedProduct = products.find((p) => p.id === selectedProductId);

    if (selectedProduct) {
      const newItem: BillItemUI = {
        productId: selectedProductId,
        quantity: quantity, // Already a string
        productName: selectedProduct.name,
        price: selectedProduct.price,
      };

      setBillItems([...billItems, newItem]);
      setSelectedProductId("");
      setQuantity("1");
    }
  };

  // Remove product from bill
  const removeProductFromBill = (index: number) => {
    const updatedItems = billItems.filter((_, i) => i !== index);
    setBillItems(updatedItems);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!customerId) {
      Alert.alert("Error", "Please select a customer");
      return;
    }

    if (
      billItems.length === 0 ||
      (billItems.length === 1 && !billItems[0].productId)
    ) {
      Alert.alert("Error", "Please add at least one product");
      return;
    }

    try {
      // Convert UI bill items to API model format
      const billDetails: BillDetail[] = billItems
        .filter((item) => item.productId)
        .map((item) => ({
          product: {
            id: item.productId,
          } as Product,
          qty: parseInt(item.quantity),
        }));

      const request: CreateBillsRequest = {
        customerId,
        billDetails,
      };

      await dispatch(createNewBill(request)).unwrap();
      Alert.alert("Success", "Bill created successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create bill");
      console.error(error);
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return billItems
      .filter((item) => item.productId)
      .reduce(
        (sum, item) => sum + (item.price || 0) * parseFloat(item.quantity),
        0
      );
  };

  // Show loading indicator
  if (customersLoading || productsLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Bill</Text>
      </View>

      {/* Customer Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Customer</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={customerId}
            onValueChange={(itemValue) => setCustomerId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a customer..." value="" />
            {customers.map((customer) => (
              <Picker.Item
                key={customer.id}
                label={`${customer.name} (${customer.phoneNumber})`}
                value={customer.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Product Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Products</Text>
        <View style={styles.productForm}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedProductId}
              onValueChange={(itemValue) => setSelectedProductId(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a product..." value="" />
              {products.map((product) => (
                <Picker.Item
                  key={product.id}
                  label={`${
                    product.name
                  } - Rp${product.price.toLocaleString()}`}
                  value={product.id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.label}>Quantity:</Text>
            <TextInput
              style={styles.quantityInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addProductToBill}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Products</Text>
        {billItems.filter((item) => item.productId).length > 0 ? (
          <>
            <View style={styles.productListHeader}>
              <Text style={styles.productColumn}>Product</Text>
              <Text style={styles.quantityColumn}>Qty</Text>
              <Text style={styles.priceColumn}>Price</Text>
              <Text style={styles.actionColumn}>Action</Text>
            </View>
            {billItems
              .filter((item) => item.productId)
              .map((item, index) => (
                <View key={index} style={styles.productItem}>
                  <Text style={styles.productColumn}>{item.productName}</Text>
                  <Text style={styles.quantityColumn}>{item.quantity}</Text>
                  <Text style={styles.priceColumn}>
                    Rp
                    {(
                      (item.price || 0) * parseFloat(item.quantity)
                    ).toLocaleString()}
                  </Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeProductFromBill(index)}
                  >
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </>
        ) : (
          <Text style={styles.emptyText}>No products added yet</Text>
        )}
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>
          Rp{calculateTotal().toLocaleString()}
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Bill</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
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
    marginBottom: 12,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  productForm: {
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  quantityContainer: {
    marginBottom: 12,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  productListHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 8,
  },
  productItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productColumn: {
    flex: 3,
  },
  quantityColumn: {
    flex: 1,
    textAlign: "center",
  },
  priceColumn: {
    flex: 2,
    textAlign: "right",
  },
  actionColumn: {
    flex: 1,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyText: {
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    paddingVertical: 16,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreateBillsScreen;
