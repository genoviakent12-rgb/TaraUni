import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/context/AuthContext";
import {
  getCarpools,
  removeCarpool,
  joinCarpool,
} from "../../hooks/CarpoolService";
export default function CarpoolsCreatedCard() {
  const { user } = useAuth();
  const [carpools, setCarpools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCarpools = async () => {
      if (!user?.id) {
        setCarpools([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const allCarpools = await getCarpools();

        const myCarpools = allCarpools.filter(
          (carpool) => carpool?.user.id === user.id,
        );
        setCarpools(allCarpools);
      } catch (e) {
        console.error("Error fetching user carpools:", e);
        setCarpools([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserCarpools();
  }, [user?.id]);

  const handleDeleteCarpool = async (carpoolId) => {
    try {
      await removeCarpool(carpoolId);
      setCarpools(carpools.filter((carpool) => carpool.id !== carpoolId));
    } catch (e) {
      console.error("Error deleting carpool:", e);
    }
  };

  const handleJoinCarpool = async (carpoolId) => {
    try {
      await joinCarpool(carpoolId);
      setCarpools(carpools.filter((carpool) => carpool.id !== carpoolId));
    } catch (e) {
      console.error("Error joining carpool:", e);
    }
  };

  // if ( user?.id === carpools?.user?.id ) { 
  //   return ( 
  //     <TouchableOpacity
  //             className="absolute right-0 mr-0 rounded-lg px-5 py-2"
  //             style={{ backgroundColor: Colors.button }}
  //             onPress={() => joinCarpool(carpools.id)}
  //           >
  //             <Text className="text-white font-bold">Join</Text>
  //           </TouchableOpacity>
  //   )
  // } else {
  //   return ( 
  //     <TouchableOpacity
  //             className="absolute right-0 mr-0 rounded-lg px-5 py-2"
  //             style={{ backgroundColor: Colors.button }}
  //             onPress={() => deleteCarpool(carpools.id)}
  //           >
  //             <Text className="text-white font-bold">Delete</Text>
  //           </TouchableOpacity>
  //   )
  // };

  if (carpools.length === 0) {
    return (
      <SafeAreaView className="flex-1">
        <View className="items-center justify-center py-10">
          <Text style={{ color: Colors.textSecondary }}>
            You haven&apos;t created any carpools yet.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 ">
      
      {carpools.map((carpool) => (
        <View
          key={carpool.id}
          className="rounded-2xl p-5 px-5 py-5 h-[200px] w-[90%] justify-center self-center mt-10 overflow-hidden"
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
            <Image
              className="w-10 h-10 rounded-full"
              source={require("@/assets/images/Placeholder/placeholder.png")}
            />
            <Text className="ml-3 text-lg font-bold">
              {carpool?.user?.firstName
                ? `${carpool.user?.firstName}'s Carpool`
                : "Your Carpool"}
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
              {carpool.passengers}/{carpool.maxPassenger}
            </Text>

            <TouchableOpacity
              className="absolute right-0 mr-0 rounded-lg px-5 py-2"
              style={{ backgroundColor: Colors.button }}
              onPress={() => joinCarpool(carpool.id)}
            >
              <Text className="text-white font-bold">Join</Text>
            </TouchableOpacity>
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
              numberOfLines={2}
            >
              {carpool.destination}
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
                AED {carpool.price} per person
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
                {carpool.time?.slice(0, 5)}
              </Text>
            </View>
          </View>
        </View>
      ))}
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
