import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/theme";

export default function CreateCarpoolButton() {
  return (
    <View style={styles.buttonRow}>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Image
            source={require("../../../images/ServiceButtonsPictures/CreateCarpool.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.buttonText}>Create Carpool</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
  },
  button: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: "contain",
  },
  buttonRow: {
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: 'fontBold',
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
  }
});
