import { StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

export const serviceButtonStyles = StyleSheet.create({
  button: {
    width: 155,
    height: 220,
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    justifyContent: "center",
    marginBottom: 20,
    padding: 12,
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center", // keep the image centered even though its siblings are left-aligned
  },
  buttonText: {
    fontFamily: "fontExtraBold",
    fontSize: 15,
    marginTop: 10,
    textAlign: "left",
  },
  next: {
    position: "absolute",
    bottom: 5,
    left: 10,
  },
  disabledButton: {
    backgroundColor: "#cacaca",
    opacity: 0.5,
  },
});