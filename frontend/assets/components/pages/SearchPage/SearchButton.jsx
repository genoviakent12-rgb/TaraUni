import { View, Text, StyleSheet } from "react-native";
import React, {useState, useEffect } from "react";
import { Colors } from "@/constants/theme";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PLACEHOLDERS = [ 
  "Where to?", 
  "Search a university?",
  "Nearest bus stop?"
];

export default function SearchButton() {
  const [index, setIndex] = useState(0);
  
  useEffect(() => { 
    const interval = setInterval(() => { 
      setIndex((prevIndex) => (prevIndex + 1) % PLACEHOLDERS.length);
    }, 3000); // Change placeholder every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.button}>
      <FontAwesome name="search" size={24} color={Colors.text} style={styles.icon}  />
      <Text style={styles.text}>{PLACEHOLDERS[index]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { 
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10, 
    backgroundColor: Colors.background,
    borderColor: Colors.gray,
    borderWidth: 0.2,
    borderRadius: 99,

    shadowColor: "#000",
    shadowOffset: {
      width: 0, 
      height: 0.2, 
    }, 
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  text: {
    color: Colors.text,
    fontFamily: "fontMedium",
    fontSize: 20,
    padding: 10,
  },
  icon: {
    padding: 10,
  }
});
