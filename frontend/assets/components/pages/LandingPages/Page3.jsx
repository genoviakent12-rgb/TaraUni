import {
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Animated,
} from "react-native";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import useFadeIn from "../../hooks/useFadeIn";
export default function Page3({ isActive }) {
  const router = useRouter();

  const fadeAnim = useFadeIn(isActive);

  const handleGetStarted = () => {
    router.push("/auth/signin/signin");
  };

  return (
    <ImageBackground
      source={require("../../../images/LandingPagePictures/landing_background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.heroText}>
          Let AI find <Text style={styles.highlight}>your best route</Text>
        </Text>

        <Text style={styles.subHeroText}>
          UniGo considers your schedule, walking time, bus routes, and delays to
          help you get to class on time.
        </Text>

        <Pressable style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  heroText: {
    fontFamily: "Anton",
    fontSize: 45,
    paddingHorizontal: 25,
    color: Colors.whiteText,
  },
  highlight: {
    fontFamily: "Anton",
    fontSize: 45,
    color: Colors.highlight,
  },
  subHeroText: {
    fontFamily: "ManropeMedium",
    fontSize: 20,
    lineHeight: 30,
    color: Colors.textSecondary,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  button: {
    marginHorizontal: 25,
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: Colors.highlight,
  },
  buttonText: {
    fontFamily: "ManropeBold",
    fontSize: 18,
    color: Colors.blackBackground,
  },
});
