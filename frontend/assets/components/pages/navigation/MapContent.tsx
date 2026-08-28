import React, { useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { View } from "react-native";
import { Colors } from "@/constants/theme";
type Coordinate = {
  name: string;
  latitude: number;
  longitude: number;
};

type MapContentProps = {
  origin: Coordinate | null;
  destination: Coordinate | null;
  setRouteInfo: (result: any) => void;
};

const MapContent = ({ origin, destination, setRouteInfo }: MapContentProps) => {
  const mapRef = useRef<MapView>(null);

  const [mapReady, setMapReady] = useState(false);
  if (!origin || !destination) {
    return null;
  }

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const fitMapToRoute = () => {
    if (!origin || !destination || !mapRef.current) {
      return;
    }

    mapRef.current.fitToCoordinates(
      [
        {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      ],
      {
        edgePadding: {
          top: 80,
          right: 40,
          bottom: 80,
          left: 40,
        },
        animated: true,
      },
    );
  };

  return (
    <View className="w-full">
      <View className="h-[400px] w-full overflow-hidden rounded-2xl">
        <MapView
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapType="mutedStandard"
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          scrollDuringRotateOrZoomEnabled={true}
          onMapReady={() => {
            console.log("MAP READY");
            setMapReady(true);

            setTimeout(() => {
              fitMapToRoute();
            }, 300);
          }}
        >
          <Marker
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            title="Where from"
            description={origin?.name}
          />

          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Where to"
            description={destination?.name}
          />

          {mapReady && apiKey && (
            <MapViewDirections
              key={`${origin.latitude}-${origin.longitude}-${destination.latitude}-${destination.longitude}`}
              origin={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              apikey={apiKey}
              strokeColor={Colors.button}
              strokeWidth={3}
              mode="DRIVING"
              onStart={(params) => {
                console.log("================================");
                console.log("DIRECTIONS REQUEST STARTED");
                console.log("Origin:", params.origin);
                console.log("Destination:", params.destination);
                console.log("================================");
              }}
              onReady={(result) => {
                console.log("================================");
                console.log("DIRECTIONS ARE READY");
                console.log("Distance:", result.distance);
                console.log("Duration:", result.duration);
                console.log("Coordinates:", result.coordinates.length);
                console.log("================================");

                setRouteInfo(result);
              }}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default MapContent;
