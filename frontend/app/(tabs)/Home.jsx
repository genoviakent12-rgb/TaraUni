import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import CarpoolButton from "@/assets/components/pages/Services/CarpoolButton";
import CreateCarpoolButton from "@/assets/components/pages/Services/CreateCarpoolButton";
import TransportationButton from "@/assets/components/pages/Services/TransportationButton";
import RouteInputCard from "@/assets/components/pages/SearchPage/RouteInputCard";
import useCurrentLocation from "@/assets/components/hooks/useCurrentLocation";
import homeImageData from "@/assets/components/data/homeImageData";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import {useAuth} from "@/context/AuthContext";


const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 60;

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { location, loading, errorMsg } = useCurrentLocation();

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const hasRoute = origin && destination;

  const sections = [
    {
      id: "home",
    },
  ];

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        renderItem={() => null}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View className="flex-row m-5 justify-between">
              <Image
                source={require("@/assets/images/Placeholder/placeholder.png")}
                className="w-12 h-12 rounded-full"
                resizeMode="resize"
              />
              <TouchableOpacity 
              className=" w-12 h-12  rounded-full items-center justify-center"
              style={{ backgroundColor: `${Colors.button}20` }}
              > 
                <Ionicons name="notifications-outline" size={24} color={Colors.button} />
              </TouchableOpacity>
            </View>

            <View className="mb-3 ml-5">
              <Text className="text-3xl font-bold">Hey,{" "}
                <Text 
                className="text-3xl font-bold"
                style={{color: Colors.button}}
                >
                  {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}` 
                  : "User"}
                  !
                </Text>
              </Text>
              <Text className="text-1xl font-bold">Where will you go today?</Text>
            </View>

            {/* ROUTE INPUT */}
            <View style={styles.searchContainer}>
              <RouteInputCard
                location={location}
                setOrigin={setOrigin}
                setDestination={setDestination}
              />
            </View>

            {/* SERVICES TITLE */}
            <Text style={styles.subHeader}>What now?</Text>

            {!hasRoute && (
              <Text style={styles.description}>
                Enter an origin and destination to use services.
              </Text>
            )}

            {/* SERVICE BUTTONS */}
            <View style={styles.serviceContainer}>
              {/* CARPOOL */}
              <TouchableOpacity
                disabled={!hasRoute}
                onPress={() => {
                  router.push({
                    pathname: "/services/CarpoolScreen",
                    params: {
                      origin: JSON.stringify(origin),
                      destination: JSON.stringify(destination),
                    },
                  });
                }}
              >
                <CarpoolButton disabled={!hasRoute} />
              </TouchableOpacity>

              {/* CREATE CARPOOL */}
              <TouchableOpacity
                disabled={!hasRoute}
                onPress={() => {
                  router.push({
                    pathname: "/services/CreateCarpoolScreen",
                    params: {
                      origin: JSON.stringify(origin),
                      destination: JSON.stringify(destination),
                    },
                  });
                }}
              >
                <CreateCarpoolButton disabled={!hasRoute} />
              </TouchableOpacity>

              {/* TRANSPORTATION */}
              <TouchableOpacity
                disabled={!hasRoute}
                onPress={() => {
                  router.push({
                    pathname: "/services/TransportationsScreen",
                    params: {
                      origin: JSON.stringify(origin),
                      destination: JSON.stringify(destination),
                    },
                  });
                }}
              >
                <TransportationButton disabled={!hasRoute} />
              </TouchableOpacity>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <Text style={styles.subHeader}>What do we offer?</Text>
            {/* EXTRA INFORMATION */}
            <View style={styles.extraInfoContainer}>
              <FlatList
                data={homeImageData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.imageContainer}>
                    <Image
                      source={item.image}
                      style={styles.homeImage}
                      resizeMode="contain"
                    />

                    <View style={styles.textContainer}>
                      <Text style={styles.imageText}>{item.text}</Text>
                    </View>
                  </View>
                )}
              />
            </View>

            <View className="flex-row justify-content self-center ">
              {homeImageData.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: activeIndex === index ? 18 : 8,
                    height: 8,
                    borderRadius: 4, 
                    marginHorizontal: 4, 
                    backgroundColor: activeIndex === index ? "#333" : "#ccc",
                  }}
                />
              ))}
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  title: {
    fontFamily: "fontExtraBold",
    fontSize: 30,
    marginTop: 5,
  },

  searchContainer: {
    justifyContent: "center",
    marginTop: 10,
  },
  subHeader: {
    fontFamily: "fontBold",
    fontSize: 23,
    marginTop: 20,
    textAlign: "left",
    paddingLeft: 20,
  },
  description: {
    fontFamily: "fontRegular",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "left",
    paddingLeft: 20,
    color: Colors.gray
  },
  serviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginTop: 20,
  },
  extraInfoContainer: {
    marginTop: 25,
    paddingHorizontal: 30,
  },
  extraInfoButton: {
    backgroundColor: Colors.button,
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  extraInfoText: {
    alignSelf: "flex-start",
    fontFamily: "fontBold",
    fontSize: 23,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  homeImage: {
    width: "100%",
    height: 220,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
  },
  imageText: {
    fontFamily: "fontBold",
    fontSize: 16,
    marginTop: -10,
  },
});
