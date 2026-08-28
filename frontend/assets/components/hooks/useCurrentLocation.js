import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

export default function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useCurrentLocation mounted");

    async function getCurrentLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied.");

          Alert.alert(
            "Location Required",
            "Please enable location permission to use location-based features.",
          );

          return;
        }

        const servicesEnabled = await Location.hasServicesEnabledAsync();

        if (!servicesEnabled) {
          setErrorMsg("Location services are disabled.");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        console.log("CURRENT LOCATION:", currentLocation?.coords);

        setLocation(currentLocation);
      } catch (error) {
        console.log("LOCATION ERROR:", error);
        setErrorMsg("Unable to get your current location.");
      } finally {
        setLoading(false);
      }
    }

    getCurrentLocation();

    return () => {
    console.log("useCurrentLocation unmounted");
  };
  
  }, []);

  return {
    location,
    loading,
    errorMsg,
  };
}
