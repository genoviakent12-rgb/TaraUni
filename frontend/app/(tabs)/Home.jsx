import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import SearchButton from "../../assets/components/pages/SearchPage/SearchButton";
import CarpoolButton from "../../assets/components/pages/Services/CarpoolButton";
import CreateCarpoolButton from "../../assets/components/pages/Services/CreateCarpoolButton";
import TransportationButton from "../../assets/components/pages/Services/TransportationButton";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.title}>TaraUni</Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => router.push("/routes/search")}>
          <SearchButton />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>What now?</Text>

      <View style={styles.serviceContainer}>
        {/* Carpool Screen */}
        <TouchableOpacity onPress={() => router.push("/routes/carpool")}>
          <CarpoolButton />
        </TouchableOpacity>

        {/* Create Carpool Screen */}
        <TouchableOpacity onPress={() => router.push("/routes/createCarpool")}>
          <CreateCarpoolButton />
        </TouchableOpacity>

        {/* Transportation Screen */}
        <TouchableOpacity onPress={() => router.push("/routes/transportation")}>
          <TransportationButton />
        </TouchableOpacity>
      </View>

      {/* extra information */}
      <View style={styles.extraInfoContainer}>
        <Text style={styles.extraInfoText}>Extra Information</Text>
        <View style={styles.extraInfoButton}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  title: {
    fontFamily: "fontExtraBold",
    fontSize: 30,
    marginTop: 5,
  },
  upperContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subHeader: {
    fontFamily: "fontBold",
    fontSize: 23,
    marginTop: 20,
    textAlign: "left",
    paddingLeft: 20,
  },
  serviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  extraInfoContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  extraInfoButton: {
    backgroundColor: Colors.button,
    width: "100%", 
    height: 100,
    borderRadius: 20,
    marginTop: 15,
  },
  extraInfoText: {
    alignSelf: "flex-start",
    fontFamily: "ManropeBold",
    fontSize: 23,
  },
});
