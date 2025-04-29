import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bill } from "../../data/models/BillsResponseModel";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../../../core/navigation/AppNavigator";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

interface BillsCardProps {
  bill: Bill;
}

const BillsCard: React.FC<BillsCardProps> = ({ bill }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Get the first letter of customer name for the avatar
  const getInitial = (name: string): string => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "?";
  };

  // Handle navigation to bill detail
  const handlePress = () => {
    navigation.navigate("BillDetail", {
      billId: bill.id,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{getInitial(bill.customer.name)}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.customerName}>{bill.customer.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {bill.billDetails.length} items
            </Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.phoneNumber}>{bill.customer.phoneNumber}</Text>
          <Text style={styles.date}>
            {new Date(bill.billDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  phoneNumber: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  badge: {
    backgroundColor: "#e6f2ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#007bff",
    fontWeight: "500",
  },
});

export default BillsCard;
