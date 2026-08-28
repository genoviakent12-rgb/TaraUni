import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import MapContent from "../../../assets/components/pages/navigation/MapContent";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Transportations() {
  const { origin, destination } = useLocalSearchParams();
  const [routeInfo, setRouteInfo] = useState(null);

  const originData = useMemo(
    () => (origin ? JSON.parse(origin) : null),
    [origin],
  );
  const destinationData = useMemo(
    () => (destination ? JSON.parse(destination) : null),
    [destination],
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.background }}
    >
      <Text className="text-lg font-bold items-center text-center mt-5 text-[26px]">
        Transportations
      </Text>
      <View className="mx-5 mt-3 rounded-2xl overflow-hidden shadow-sm">
        <View className="mx-5 mt-5">
          <View
            className="mx-0 rounded-2xl p-5 bg-white"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            {/* Starting point */}
            <View className="flex-row items-start">
              <View
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: `${Colors.button}20` }}
              >
                <FontAwesome6
                  name="location-dot"
                  size={16}
                  color={Colors.button}
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Starting Point
                </Text>
                <Text className="text-base font-medium text-gray-800 mt-0.5">
                  {originData?.name || "Current Location"}
                </Text>
              </View>
            </View>

            {/* Connector line */}
            <View className="ml-[17px] my-1">
              <View
                style={{
                  width: 2,
                  height: 24,
                  backgroundColor: "#E5E7EB",
                }}
              />
            </View>

            {/* Destination */}
            <View className="flex-row items-start">
              <View
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{ backgroundColor: `${Colors.button}20` }}
              >
                <FontAwesome5
                  name="location-arrow"
                  size={14}
                  color={Colors.button}
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Destination
                </Text>
                <Text className="text-base font-medium text-gray-800 mt-0.5">
                  {destinationData?.name || "Destination Location"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
