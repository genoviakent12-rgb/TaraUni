import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import MapContent from "../../../assets/components/pages/navigation/MapContent";
import RouteChat from "../../../assets/components/pages/navigation/RouteChat";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from '@expo/vector-icons/Feather';
// import { useLayoutEffect } from "react";

export default function Transportations() {
  // const navigation = useNavigation(); 
  const router = useRouter();
  const { origin, destination } = useLocalSearchParams();
  const [routeInfo, setRouteInfo] = useState(null);

  const originData = useMemo(
    () => (origin ? JSON.parse(origin) : null),
    [origin]
  );
  const destinationData = useMemo(
    () => (destination ? JSON.parse(destination) : null),
    [destination]
  );

  // useLayoutEffect(() => { 
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: { display: "none" },
  //   });

  //   return () => { 
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: undefined, // will restore to default when leaving the screen
  //     });
  //   }
  // }, [navigation]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-5 pb-2">
          <View style={styles.header}>
                  <TouchableOpacity  onPress={() => router.replace("/(tabs)/Home")}>
                    <Feather name="arrow-left" size={24} color={Colors.button} className="self-start ml-1"/>
                  </TouchableOpacity>
                  <Text style={styles.headerText}>Transportations</Text>
                  <View style={styles.headerRight} />
                </View>
          <Text className="text-sm mt-0.5 self-center" style={{ color: Colors.textSecondary }}>
            Compare routes and get live travel advice
          </Text>
        </View>

        {/* Route card */}
        <View
          className="mx-5 mt-4 rounded-3xl bg-white overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 3 },
            elevation: 2,
          }}
        >
          <View className="px-5 pt-5 pb-4">
            {/* Starting point */}
            <View className="flex-row items-start">
              <View
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: `${Colors.button}18` }}
              >
                <FontAwesome6 name="location-dot" size={15} color={Colors.button} />
              </View>
              <View className="ml-3.5 flex-1">
                <Text
                  className="text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: Colors.textSecondary }}
                >
                  Starting Point
                </Text>
                <Text
                  className="text-[15px] font-semibold mt-0.5"
                  style={{ color: Colors.text }}
                  numberOfLines={2}
                >
                  {originData?.name || "Current Location"}
                </Text>
              </View>
            </View>

            {/* Connector */}
            <View className="ml-[17px] flex-row" style={{ height: 22 }}>
              <View
                style={{
                  width: 2,
                  height: "100%",
                  backgroundColor: "#E5E7EB",
                }}
              />
            </View>

            {/* Destination */}
            <View className="flex-row items-start">
              <View
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: `${Colors.button}18` }}
              >
                <FontAwesome5 name="location-arrow" size={13} color={Colors.button} />
              </View>
              <View className="ml-3.5 flex-1">
                <Text
                  className="text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: Colors.textSecondary }}
                >
                  Destination
                </Text>
                <Text
                  className="text-[15px] font-semibold mt-0.5"
                  style={{ color: Colors.text }}
                  numberOfLines={2}
                >
                  {destinationData?.name || "Destination Location"}
                </Text>
              </View>
            </View>
          </View>

          {/* Footer strip */}
          <View
            className="flex-row items-center px-5 py-3"
            style={{ backgroundColor: "#FAFAFA", borderTopWidth: 1, borderTopColor: "#F0F0F0" }}
          >
            <Ionicons name="swap-vertical" size={14} color={Colors.button} />
            <Text className="text-xs font-medium ml-2" style={{ color: Colors.button }}>
              Swap locations
            </Text>
          </View>
        </View>

        <RouteChat originData={originData} destinationData={destinationData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ 
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  headerText: {
    fontFamily: "fontBold",
    fontSize: 20,
  },
  headerRight: {
    width: 24,
  },
})