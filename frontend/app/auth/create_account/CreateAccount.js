import {
  View,
  Text,
  Animated,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";

import { useRouter } from "expo-router";

export default function CreateAccount() {
  const router = useRouter();
  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  //animation from bottom to top
  const slideAnim = React.useRef(new Animated.Value(500)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View className="flex-1 w-full">
      {/* background */}
      <ImageBackground
        source={require("../../../assets/images/Background_Gradient.png")}
        resizeMode="cover"
        className="absolute inset-0 justify-center items-center"
      >
        {/* logo */}
        <Image
          source={require("../../../assets/images/Logo/White_Transparent.png")}
          className="w-48 h-48 -mt-[450px]"
          resizeMode="contain"
        />
        <Text className="text-white text-4xl font-bold">Tara Uni</Text>
        <Text className="text-white text-2xl font-small">
          Create an account!
        </Text>
      </ImageBackground>
      {/* start of the form */}
      <Animated.View
        style={[
          styles.bottomContainer,
          {
            transform: [{ translateY: slideAnim }],
            overflow: "hidden",
          },
        ]}
      >
        <View className="m-8">
          {/* full name */}
          <View className="p-4 flex-row gap-5">
            <Ionicons name="person-outline" size={24} color={Colors.gray} />
            <TextInput
              value={fullname}
              onChangeText={setFullname}
              placeholder="Full Name"
              placeholderTextColor={Colors.gray}
              className="flex-1 text-black"
            />
          </View>

          {/* email */}
          <View className="p-4 flex-row gap-5">
            <Fontisto name="email" size={24} color={Colors.gray} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={Colors.gray}
              className="flex-1 text-black"
            />
          </View>

          {/* password */}
          <View className="p-4 flex-row gap-5">
            <MaterialIcons name="lock-outline" size={24} color={Colors.gray} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor={Colors.gray}
              className="flex-1 text-black"
            />
            <TouchableOpacity
              onPress={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              <FontAwesome6
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                color={Colors.gray}
              />
            </TouchableOpacity>
          </View>

          {/* log in button */}
          <View className="self-center justify-center m-5 w-full">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-blue-500 w-full justify-center items-center py-4 rounded-xl"
            >
              <Text className="text-white font-bold text-center">Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* sub text */}
          <Text className="font-medium text-center text-gray-400">
            Welcome!
          </Text>
          <Text className="text-center text-gray-400">
            Enter your full name, email and password to continue
          </Text>

          <View>
            {/* horizontal line */}
            <View className="flex-row items-center justify-center mt-10">
              <View className="flex-1 h-px bg-gray-700" />
              <Text className="text-center text-gray-700 mx-4">
                or Sign up with
              </Text>
              <View className="flex-1 h-px bg-gray-700" />
            </View>
          </View>
        </View>

        {/* social logins */}
        <View className="flex-row justify-center">
          {/* google */}
          <TouchableOpacity className="bg-gray-200 p-3 rounded-full mx-2">
            <FontAwesome6 name="google" size={24} color={Colors.button} />
          </TouchableOpacity>
          {/* fb */}
          <TouchableOpacity className="bg-gray-200 p-3 rounded-full mx-2">
            <FontAwesome6 name="facebook" size={24} color={Colors.button} />
          </TouchableOpacity>
          {/* twitter */}
          <TouchableOpacity className="bg-gray-200 p-3 rounded-full mx-2">
            <FontAwesome6 name="twitter" size={24} color={Colors.button} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/auth/signin/signin")}
          className="items-center mt-5"
        >
          <Text className="text-gray-500">
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: Colors.background,
    height: "55%",
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
