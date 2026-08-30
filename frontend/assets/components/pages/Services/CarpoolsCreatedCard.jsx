import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function CarpoolsCreatedCard() { 
  return (
    <SafeAreaView className="flex-1">
      <View
        className="mt-5 rounded-2xl p-5 px-5 py-5 h-[170px] w-[90%] justify-center self-center"
        style={{
          backgroundColor: Colors.background,
          borderColor: Colors.gray,
          borderWidth: 0.4,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <View className="flex-row items-center">
          {/* profile picture and name */}
          <Image
            className="w-10 h-10 rounded-full "
            source={require("@/assets/images/Placeholder/placeholder.png")}
          />
          <Text className="ml-3 text-lg font-bold">
            John Doe&apos;s Carpool
          </Text>
          <Ionicons
            name="person-outline"
            size={15}
            color={Colors.textSecondary}
            className="ml-3 mb-1"
          />
          <Text
            className="ml-2 mb-1 text-base font-medium"
            style={{ color: Colors.textSecondary }}
          >
            2
          </Text>
        </View>

        <View
          className="h-[1px] mt-4 mb-2"
          style={{ backgroundColor: Colors.gray + "40" }}
        />

        {/* location */}
        <View className="mt-3 flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: Colors.button + "1A" }}
          >
            <FontAwesome5
              name="location-arrow"
              size={18}
              color={Colors.button}
            />
          </View>
          <Text
            className="ml-4 text-base font-medium"
            style={{ color: Colors.textSecondary }}
            numberOfLines={1}
          >
            123 Main Street
          </Text>
        </View>

        {/* fare and time */}
        <View className="mt-3 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: Colors.button + "1A" }}
            >
              <FontAwesome5
                name="money-bill-wave"
                size={18}
                color={Colors.button}
              />
            </View>
            <Text
              className="ml-4 text-base font-medium"
              style={{ color: Colors.textSecondary }}
            >
              $12.50
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons
              name="time-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text
              className="ml-1 text-base font-medium"
              style={{ color: Colors.textSecondary }}
            >
              12:00 PM
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   margin: 20,
  // },
  // headerText: {
  //   fontFamily: "fontBold",
  //   fontSize: 24,
  //   color: Colors.text,
  // },
  // informationContainer: {
  //   marginTop: 10,
  //   backgroundColor: Colors.background,
  //   borderRadius: 19,
  //   padding: 20,
  //   paddingHorizontal: 20,
  //   paddingVertical: 20,
  //   height: 200,
  //   borderColor: Colors.lightGray,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0.2,
  //     height: 0.2,
  //   },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 5,
  // },
  // informationText: {
  //   fontFamily: "fontMedium",
  //   fontSize: 16,
  //   color: Colors.text,
  //   marginLeft: 15
  // },
  // userContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  // otherInformationContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 20,
  // },
  // profilePicture: {
  //   width: 45,
  //   height: 45,
  //   borderRadius: 99,
  // },
  // userText: {
  //   fontFamily: "fontBold",
  //   fontSize: 18,
  //   color: Colors.text,
  //   marginLeft: 15,
  // }
});
