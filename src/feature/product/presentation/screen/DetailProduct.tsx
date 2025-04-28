import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Button } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../core/navigation/AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../core/redux/store";

import LoadingIndicator from "../../../../core/components/LoadingIndicator";
import {
  createProduct,
  getProductDetail,
  updateExitingProduct,
} from "../../redux/productSlice";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../../data/models/ProductRequestModels";
import { Picker } from "@react-native-picker/picker";

const DetailProduct: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "DetailProduct">>();
  const { productId } = route.params || {};

  const dispatch = useDispatch<AppDispatch>();
  const { detail, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (detail && productId) {
      setname(detail.name);
      setPrice(detail.price.toString());
      setType(detail.type);
    }
  }, [detail, productId]);

  const handleSave = () => {
    if (productId) {
      const updateProduct: UpdateProductRequest = {
        id: productId,
        name: name,
        price: parseInt(price),
        type: type,
      };
      dispatch(updateExitingProduct(updateProduct))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Product updated successfully");
          dispatch(getProductDetail(productId));
          navigation.goBack();
        })
        .catch((err) => Alert.alert("Error", err));
    } else {
      const newProuct: CreateProductRequest = {
        name,
        price: parseInt(price),
        type,
      };
      console.log("newProuct: ", newProuct);
      dispatch(createProduct(newProuct))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Product created successfully");
          navigation.goBack();
        })
        .catch((err) => Alert.alert("Error", err));
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
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
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textField} value={name} onChangeText={setname} />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.textField}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Type</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Kg" value="Kg" />
          <Picker.Item label="Gram" value="Gram" />
          <Picker.Item label="Ons" value="Ons" />
          <Picker.Item label="Buah" value="Buah" />
          <Picker.Item label="Lusin" value="Lusin" />
        </Picker>
      </View>
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textField: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
});

export default DetailProduct;
