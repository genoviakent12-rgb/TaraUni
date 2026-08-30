import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useCurrentLocation from "../../../assets/components/hooks/useCurrentLocation";

import RouteInputCard from "@/assets/components/pages/SearchPage/RouteInputCard";
import CarpoolsCreatedCard from "@/assets/components/pages/Services/CarpoolsCreatedCard";

export default function Carpool() {
  const router = useRouter();
  const { location } = useCurrentLocation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/Home")}>
          <Feather name="arrow-left" size={24} color={Colors.button} />
        </TouchableOpacity>
        <Text style={styles.headerText}>All Carpools</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Route search */}
      <View style={styles.routeInputContainer}>
        <RouteInputCard location={location} />
      </View>

      {/* Existing carpools */}
      <View style={styles.carpoolsContainer}>
        <CarpoolsCreatedCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  routeInputContainer: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    fontFamily: "fontBold",
    fontSize: 20,
  },
  headerRight: {
    width: 24,
  },
  carpoolsContainer: {
    marginTop: -30,
  },
});
