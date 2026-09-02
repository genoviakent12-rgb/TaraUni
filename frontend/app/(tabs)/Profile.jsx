import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await logoutUser();
          },
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, onPress, danger = false }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="flex-row items-center px-5 py-4"
      >
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${
            danger ? "bg-red-50" : "bg-blue-50"
          }`}
        >
          <Ionicons
            name={icon}
            size={21}
            color={danger ? "#EF4444" : "#2563EB"}
          />
        </View>

        <Text
          className={`flex-1 ml-4 text-base font-medium ${
            danger ? "text-red-500" : "text-gray-800"
          }`}
        >
          {title}
        </Text>

        {!danger && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9CA3AF"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-5 pb-4">
        <Text className="text-3xl font-bold text-gray-900">
          Profile
        </Text>
        <Text className="text-gray-500 mt-1">
          Manage your TaraUni account
        </Text>
      </View>

      {/* Profile Card */}
      <View className="items-center mt-6 mb-8">
        {/* Profile picture */}
        <View className="w-28 h-28 rounded-full bg-blue-100 items-center justify-center">
          <Ionicons
            name="person"
            size={55}
            color="#2563EB"
          />
        </View>

        <Text className="text-2xl font-bold text-gray-900 mt-4">
          {user?.firstName} {user?.lastName}
        </Text>

        <Text className="text-gray-500 mt-1">
          {user?.email}
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center mt-3"
        >
          <Ionicons
            name="create-outline"
            size={17}
            color="#2563EB"
          />

          <Text className="text-blue-600 font-medium ml-1">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View className="mx-5 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <MenuItem
          icon="person-outline"
          title="Personal Information"
          onPress={() => {}}
        />

        <View className="h-[1px] bg-gray-100 ml-20" />

        <MenuItem
          icon="car-outline"
          title="My Carpools"
          onPress={() => {}}
        />

        <View className="h-[1px] bg-gray-100 ml-20" />

        <MenuItem
          icon="time-outline"
          title="Ride History"
          onPress={() => {}}
        />

        <View className="h-[1px] bg-gray-100 ml-20" />

        <MenuItem
          icon="settings-outline"
          title="Settings"
          onPress={() => {}}
        />
      </View>

      {/* Logout */}
      <View className="mx-5 mt-5 rounded-2xl border border-red-100 overflow-hidden">
        <MenuItem
          icon="log-out-outline"
          title="Log Out"
          danger
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;