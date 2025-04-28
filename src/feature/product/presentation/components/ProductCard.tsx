import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../../data/models/ProductModels";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../../core/navigation/AppNavigator";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../core/redux/store";
import { deleteExitingProduct } from "../../redux/productSlice";
import DeleteButton from "../../../../core/components/DeleteButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const handlePress = () => {
    navigation.navigate("DetailProduct", {
      productId: product.id,
    });
  };
  const handleDelete = () => {
    dispatch(deleteExitingProduct(product.id)).then(() => {
      Alert.alert("Success", "Product deleted successfully");
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.name}>{product.name}</Text>
      <View style={styles.details}>
        <View>
          <Text style={styles.price}>Rp {product.price.toLocaleString()}</Text>
          <Text style={styles.type}>per {product.type}</Text>
        </View>
        <DeleteButton
          onDelete={handleDelete}
          confirmationTitle="Confirm Delete"
          confirmationMessage="Are you sure you want to delete this product?"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "600",
  },
  type: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProductCard;
