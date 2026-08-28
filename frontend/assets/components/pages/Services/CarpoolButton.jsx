import { View, Text, Image } from "react-native";
import React from "react";
import { serviceButtonStyles as styles } from "@/styles/serviceButtonStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/theme";

export default function CarpoolButton({ disabled = false }) {
  return (
    <View style={[styles.button, disabled && styles.disabledButton]}>
      <Image
        source={require("../../../images/ServiceButtonsPictures/Carpool.png")}
        style={styles.image}
      />
      <Text style={styles.buttonText}>All Carpools</Text>
      <Ionicons
        name="arrow-forward-circle"
        size={30}
        color={Colors.text}
        style={styles.next}
      />
    </View>
  );
}
