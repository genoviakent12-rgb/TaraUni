import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/theme";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,

        tabBarActiveTintColor: Colors.button,
        tabBarInactiveTintColor: Colors.gray,
        tabBarInactiveBackgroundColor: "transparent",

        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 20,
          marginLeft: 25,
          marginBottom: 25,
          height: 60,
          width: 350,
          borderRadius: 99,
          backgroundColor: Colors.whiteText,
          borderWidth: 0.2,
          borderColor:  Colors.gray,
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          // overflow: "hidden",
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        },

        tabBarIconStyle: {
          marginTop: 5,
          marginBottom: 0,
        },

        tabBarLabelStyle: { 
          fontFamily: "fontBold",
          fontSize: 12,
          marginTop: 2.5,
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title:"Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="services"
        options={{
          title:"Services",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="car-side" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title:"Profile",  
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
