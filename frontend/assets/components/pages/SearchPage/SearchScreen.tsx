// import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
// import RouteInputCard from "@/assets/components/pages/SearchPage/RouteInputCard";
// import useCurrentLocation from "@/assets/components/hooks/useCurrentLocation";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors } from "@/constants/theme";
// import Feather from "@expo/vector-icons/Feather";
// import { useRouter} from "expo-router";

// export default function SearchScreen() {
//   const { location } = useCurrentLocation();
//   const router = useRouter();

//   return (
//     <SafeAreaView
//       className="flex-1"
//       style={{ backgroundColor: Colors.background }}
//     >
//       <View className="relative h-[60px] flex-row items-center px-5 " >
//         <TouchableOpacity 
//         className="z-[10]"
//         onPress={() => router.back()}
//         >
//           <Feather name="arrow-left" size={24} color="black" />
//         </TouchableOpacity>
//         <Text className="absolute left-0 right-0 text-center text-[25px] font-bold">
//           Go for a ride
//         </Text>
//       </View>

//       <View className="justify-content mt-5">
//         <RouteInputCard location={location} setOrigin={setOrigin} setDestination={setDestination}/>
//       </View>
//     </SafeAreaView>
//   );
// }
// // "<View className="relative h-[60px] flex-row items-center px-5">"
// // <Text className="absolute left-0 right-0 text-center text-[25px] font-bold">
