import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  StyleSheet
} from "react-native";

import MapContent from "../../../assets/components/pages/navigation/MapContent";
import { Colors } from "@/constants/theme";
import { useState, useMemo } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createCarpool, joinCarpool, removeCarpool } from "../../../assets/components/hooks/CarpoolService";
export default function CreateCarpool() {
  const { origin, destination } = useLocalSearchParams();
  const router = useRouter();

  const originData = useMemo(
    () => (origin ? JSON.parse(origin) : null),
    [origin],
  );
  
  const destinationData = useMemo(
    () => (destination ? JSON.parse(destination) : null),
    [destination],
  );

  const today = new global.Date().toISOString().split("T")[0];
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedMaxPassengers, setSelectedMaxPassengers] = useState(1);

  const [showPassengerSheet, setShowPassengerSheet] = useState(false);
  const [showPriceSheet, setShowPriceSheet] = useState(false);
  const [showTimeAndDateSheet, setShowTimeAndDateSheet] = useState(false);
  const [confirmParty, setConfirmParty] = useState(false);

  const increasePassengers = () => {
    if (selectedPassengers < 5) {
      setSelectedPassengers(selectedPassengers + 1);
    }
  };

  const decreasePassengers = () => {
    if (selectedPassengers > 1) {
      setSelectedPassengers(selectedPassengers - 1);
    }
  };

  const increasePrice = () => {
    if (selectedPrice < 100) {
      setSelectedPrice(selectedPrice + 2);
    }
  };

  const decreasePrice = () => {
    if (selectedPrice > 0) {
      setSelectedPrice(selectedPrice - 1);
    }
  };

  const handleCreateCarpool = async () => { 
    if ( 
      !selectedPassengers || 
      !selectedDate || 
      !selectedTime || 
      !selectedPrice 
    ) { 
      Alert.alert("Missing Information", "Please fill in all required fields.")
      return; 
    }

    try {   
      setLoading(true);
      
      const carpool = { 
        passengers: 0, 
        maxPassengers: selectedMaxPassengers,
        price: selectedPrice,
        date: selectedDate,
        time: selectedTime.toTimeString().slice(0, 8),
        status: "Open", 
        origin: originData?.name || "Current Location", 
        destination: destination?.name || "Destination",

        user: {
          id: 1,
        },
      };

      const createdCarpool = await createCarpool(carpool);

      console.log("Carpool Created Successfully!",
        createdCarpool
      );

      Alert.alert( 
        "Success", 
        "You have successfully created a carpool!",
        [
          { 
            text: "OK",
            onPress: () => router.back()
          }
        ]
      )
    } catch (e) { 
      console.log("Failed to create carpool", e);
      Alert.alert("Failed to create carpool", "Please try again later.");
    } finally { 
      setLoading(false); 
    }
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.background }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <Text className="text-lg font-bold items-center text-center mt-5 text-[26px]">
            Carpool Party
          </Text>
          <Text className="text-base color-gray-400 text-center mb-5 text-[14px]">
            Review your carpool details before creating the ride.
          </Text>
        </View>
        <View className="mx-5 mt-3 rounded-2xl overflow-hidden shadow-sm">
          <MapContent
            origin={originData}
            destination={destinationData}
            setRouteInfo={setRouteInfo}
          />
        </View>

        <Text className="text-lg font-bold text-left mt-5 text-[26px] text-center">
          Hey, John Doe!
        </Text>

        <Text className="text-lg font-medium text-left text-[13.5px] text-center color-gray-400">
          Ready to create a party?
        </Text>

        <Text className="text-lg font-bold text-left mt-5 ml-5 text-[26px]">
          Location Details
        </Text>

        <View className="ml-5 flex-row mb-5">
          {routeInfo && (
            <>
              <Text className="text-base font-medium color-gray-400 ">
                {routeInfo
                  ? `approx. ${Math.round(routeInfo.duration)} minutes`
                  : "Calculating..."}
              </Text>

              <Text className="text-base font-medium color-gray-400 ml-2">
                ·
              </Text>

              <Text className="text-base font-medium color-gray-400 ml-2">
                {routeInfo.distance
                  ? `${routeInfo.distance.toFixed(2)} km`
                  : "Distance not available"}
              </Text>
            </>
          )}
        </View>

        {/* Route card */}
        <View
          className="mx-5 rounded-2xl p-5 bg-white"
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

        {/* Amount of Passengers */}
        <View className="flex-row justify-between items-center mx-5 mt-8 mb-4">
          <Text className="text-lg font-bold text-left text-[26px]">
            Amount of Passengers
          </Text>
          <TouchableOpacity onPress={() => setShowPassengerSheet(true)}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Price per person */}
        <View className="flex-row justify-between items-center mx-5 mt-5 mb-4">
          <Text className="text-lg font-bold text-left text-[26px]">
            Price per Person
          </Text>
          <TouchableOpacity onPress={() => setShowPriceSheet(true)}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Time and Date */}
        <View className="flex-row justify-between items-center mx-5 mt-5 mb-4">
          <Text className="text-lg font-bold text-left text-[26px]">
            Time and Date
          </Text>
          <TouchableOpacity onPress={() => setShowTimeAndDateSheet(true)}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Create party button */}
        <View className="items-center">
          <TouchableOpacity
            className="bg-blue-500 text-white py-5 px-[140px] rounded-[16px] mt-5"
            onPress={() => {
              setConfirmParty(true); 
              handleCreateCarpool();
            }}
            disabled={loading}
          >
            <Text 
            className="font-bold color-white"
            style={styles.createParty}
            >{loading ? "Creating..." : "Create Party"}</Text>
          </TouchableOpacity>
        </View>

        {/* Amount of Passengers Sheet */}
        <Modal
          visible={showPassengerSheet}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowPassengerSheet(false)}
        >
          <Pressable
            className="flex-1 bg-black/30"
            onPress={() => setShowPassengerSheet(false)}
          >
            <View className="flex-1 justify-end">
              <Pressable
                className="bg-white rounded-t-3xl px-6 py-7"
                onPress={(event) => event.stopPropagation()}
              >
                <View className="self-center w-12 h-1.5 bg-gray-300 rounded-full mb-6" />
                <Text className="text-lg font-bold text-center">
                  Amount of Passengers
                </Text>

                <Text className="text-gray-500 text-center mt-2">
                  How many passengers can join?
                </Text>

                <View className="flex-row justify-between items-center mt-8">
                  {/* - */}
                  <TouchableOpacity
                    className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
                    onPress={decreasePassengers}
                  >
                    <MaterialIcons name="remove" size={24} color="black" />
                  </TouchableOpacity>

                  <Text className="text-3xl font-bold">
                    {selectedPassengers}
                  </Text>

                  {/* + */}
                  <TouchableOpacity
                    className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
                    onPress={increasePassengers}
                  >
                    <MaterialIcons name="add" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  className="mt-8 py-4 rounded-xl items-center"
                  style={{
                    backgroundColor: Colors.button,
                  }}
                  onPress={() => setShowPassengerSheet(false)}
                >
                  <Text className="text-white font-bold text-base">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        {/* Price per Person Sheet */}
        <Modal
          visible={showPriceSheet}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowPriceSheet(false)}
        >
          <Pressable
            className="flex-1 bg-black/30"
            onPress={() => setShowPriceSheet(false)}
          >
            <View className="flex-1 justify-end">
              {/* FEWGVDEWFUJIEWHBFUBEFUHBVUFHFHVFHEVIHBVEWUV */}
              <Pressable
                className="bg-white rounded-t-3xl px-6 py-7"
                onPress={(event) => event.stopPropagation()}
              >
                <View className="self-center w-12 h-1.5 bg-gray-300 rounded-full mb-6" />
                <Text className="text-lg font-bold text-center">
                  Price per Person
                </Text>

                <Text className="text-gray-500 text-center mt-2">
                  What is the price for each passenger?
                </Text>

                <View className="flex-row mt-4 items-center justify-center">
                  <Text className="text-[25px] font-bold mt-3">AED</Text>
                </View>

                <View className="flex-row justify-between items-center mt-2">
                  {/* - */}
                  <TouchableOpacity
                    className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
                    onPress={decreasePrice}
                  >
                    <MaterialIcons name="remove" size={24} color="black" />
                  </TouchableOpacity>

                  <Text className="text-3xl font-bold">{selectedPrice}</Text>

                  {/* + */}
                  <TouchableOpacity
                    className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center"
                    onPress={increasePrice}
                  >
                    <MaterialIcons name="add" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className="mt-8 py-4 rounded-xl items-center"
                  style={{
                    backgroundColor: Colors.button,
                  }}
                  onPress={() => setShowPriceSheet(false)}
                >
                  <Text className="text-white font-bold text-base">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        {/* Time and Date Sheet */}
        <Modal
          visible={showTimeAndDateSheet}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTimeAndDateSheet(false)}
        >
          <Pressable
            className="flex-1 bg-black/30"
            onPress={() => setShowTimeAndDateSheet(false)}
          >
            <View className="flex-1 justify-end">
              <Pressable
                className="bg-white rounded-t-3xl px-6 py-7"
                style={{ height: "80%" }}
                onPress={(event) => event.stopPropagation()}
              >
                <View className="self-center w-12 h-1.5 bg-gray-300 rounded-full mb-6" />

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 30 }}
                >
                  <Text className="text-lg font-bold text-center">
                    Date of Travel
                  </Text>

                  <Calendar
                    minDate={today}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={
                      selectedDate
                        ? {
                            [selectedDate]: {
                              selected: true,
                              selectedColor: Colors.button,
                            },
                          }
                        : {}
                    }
                    theme={{
                      todayTextColor: Colors.tint,
                      selectedDayBackgroundColor: Colors.tint,
                      arrowColor: Colors.tint,
                      textDayFontFamily: "font",
                      textMonthFontFamily: "fontBold",
                      textDayHeaderFontFamily: "fontMedium",
                    }}
                  />

                  <Text className="text-lg font-bold text-center mt-10">
                    Time of Travel
                  </Text>

                    <View className="items-center mt-5">
                      <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="spinner"
                    onChange={(event, date) => {
                      if (date) {
                        setSelectedTime(date);
                      }
                    }}
                    style={{
                      width: 100,
                      height: 200,
                    }}
                  />
                    </View>
                
                  
                  <TouchableOpacity
                    className="mt-8 py-4 rounded-xl items-center"
                    style={{
                      backgroundColor: Colors.button,
                    }}
                    onPress={() => setShowTimeAndDateSheet(false)}
                  >
                    <Text className="text-white font-bold text-base">
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
{
  /* <DateTimePicker
  value={selectedTime}
  mode="time"
  onChange={(event, date) => {
    if (date) {
      setSelectedTime(date);
    }
  }}
/> */
}


const styles = StyleSheet.create({ 
  fontFamily: "fontMedium",
    fontSize: 15,
    color: Colors.WHITE,
    letterSpacing: 1.5,
    textTransform: "uppercase",
})