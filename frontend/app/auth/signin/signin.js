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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from "expo-router";

import {signIn} from "../../../assets/components/hooks/SignInService";
import {useAuth} from "@/context/AuthContext";

export default function SignIn() {
  const { loginUser } = useAuth();
  const router = useRouter(); 
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //animation from bottom to top
  const slideAnim = React.useRef(new Animated.Value(500)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleSignIn = async () => {
  // 1. Reset error state and start loading
  setError(null);
  setLoading(true);

  // 2. Call the backend API helper
  const result = await signIn(email, password);

  setLoading(false);

  if (result.success) {
    // 3. save the current user globally and to storage
    await loginUser(result.user);
    // 4. Navigate to main app screen (e.g., home or tabs dashboard)
    router.replace("/(tabs)/Home"); 
  } else {
    // 5. Set error message to display on the screen
    setError(result.message);
  }
};

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
          className="w-48 h-48 -mt-[400px]"
          resizeMode="contain"
        />
        <Text className="text-white text-4xl font-bold">Tara Uni</Text>
        <Text className="text-white text-2xl font-small">Let&apos;s sign you in!</Text>
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
        {/* email */}
        <View className="m-8">
          <View className="p-4 flex-row gap-5">
            <Fontisto name="email" size={24} color={Colors.gray} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={Colors.gray}
              className="flex-1 text-black"
              autoCapitalize="none"
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
              autoCapitalize="none"
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
              onPress={handleSignIn}
            >
              <Text className="text-white font-bold text-center">{loading ? "Logging in..." : "Log in"}</Text>
            </TouchableOpacity>
          </View>

          {/* sub text */}
          <Text className="font-medium text-center text-gray-400">
            Welcome back! We&apos;ve missed you
          </Text>
          <Text className="text-center text-gray-400">
            Enter your email and password to continue
          </Text>

          <View>
            {/* horizontal line */}
            <View className="flex-row items-center justify-center mt-10">
              <View className="flex-1 h-px bg-gray-700" />
              <Text className="text-center text-gray-700 mx-4">
                or Log in with
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
        onPress={() => router.push("/auth/create_account/CreateAccount")}
        className="items-center mt-5">
          <Text className="text-gray-500">Don&apos;t have an account? Sign up</Text>
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
    height: "50%",
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
