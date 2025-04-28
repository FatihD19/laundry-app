import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

interface DeleteButtonProps {
  onDelete: () => Promise<void> | void;
  confirmationTitle?: string;
  confirmationMessage?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  confirmationTitle = "Confirm Delete",
  confirmationMessage = "Are you sure you want to delete this item?",
}) => {
  const handleDelete = () => {
    Alert.alert(confirmationTitle, confirmationMessage, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default DeleteButton;
