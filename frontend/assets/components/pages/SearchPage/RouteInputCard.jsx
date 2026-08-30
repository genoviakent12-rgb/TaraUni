import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ORIGIN_PLACEHOLDER = [
  "Where from?",
  "Which university?",
  "Closest location",
];

const DESTINATION_PLACEHOLDER = [
  "Where to?",
  "Which establishment?",
  "Farthest location",
];

export default function RouteInputCard({
  location,
  origin,
  destination,
  setOrigin,
  setDestination,
}) {
  const [index, setIndex] = useState(0);
  const originText = origin?.name || "";
  const destinationText = destination?.name || "";

  //sets the interval of when to show the placeholder texts
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ORIGIN_PLACEHOLDER.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % DESTINATION_PLACEHOLDER.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Google Places search configuration
  const placesQuery = {
    key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
    language: "en",
    // Use the user's current location to bias nearby results
    location: location
      ? `${location.coords.latitude},${location.coords.longitude}`
      : undefined,
    radius: 5000,
  };

  return (
    <View style={styles.card}>
      {/* Origin */}
      <View style={[styles.locationRow, { zIndex: 20 }]}>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="location-dot" size={24} color={Colors.button} />
        </View>

        <GooglePlacesAutocomplete
          placeholder={ORIGIN_PLACEHOLDER[index]}
          placeholderTextColor={Colors.text}
          fetchDetails={true}
          enablePoweredByContainer={false}
          keyboardShouldPersistTaps="handled"
          textInputProps={{
            defaultValue: originText,
          }}
          onPress={(data, details = null) => {
            if (!details) return;

            setOrigin({
              name: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          styles={{
            container: {
              flex: 1,
              zIndex: 20,
            },

            textInput: {
              ...styles.textInput,
              color: Colors.text,
              opacity: 1,
            },

            listView: styles.listView,
          }}
          query={placesQuery}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Destination */}
      <View style={[styles.locationRow, { zIndex: 10 }]}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="location-arrow" size={21} color={Colors.button} />
        </View>

        <GooglePlacesAutocomplete
          placeholder={DESTINATION_PLACEHOLDER[index]}
          placeholderTextColor={Colors.text}
          fetchDetails={true}
          enablePoweredByContainer={false}
          keyboardShouldPersistTaps="handled"
          textInputProps={{
            defaultValue: destinationText,
          }}
          onPress={(data, details = null) => {
            if (!details) return;

            setDestination({
              name: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          styles={{
            container: {
              flex: 1,
              zIndex: 10,
            },
            textInput: {
              ...styles.textInput,
              color: Colors.text,
              opacity: 1,
            },
            listView: styles.listView,
          }}
          query={placesQuery}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.whiteText,
    borderRadius: 17,
    borderWidth: 0.3,
    borderColor: Colors.gray,
    width: "90%",
    alignSelf: "center",
    zIndex: 10,
    elevation: 10,
  },
  locationRow: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 34,
    height: 34,

    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginLeft: 61,
  },
  textInput: {
    height: 50,
    marginTop: 5,
    fontFamily: "fontBold",
    fontSize: 14,
    color: Colors.text,
    backgroundColor: "transparent",
  },
  listView: {
    position: "absolute",
    top: 55,
    left: -49,
    right: -13,
    backgroundColor: Colors.whiteText,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
  },
});
