import { Text, StyleSheet, ImageBackground, Animated } from "react-native";
import { Colors } from "@/constants/theme";
import useFadeIn from "../../hooks/useFadeIn";
export default function Page2({ isActive }) {
  const fadeAnim = useFadeIn(isActive);

  return (
    <ImageBackground
      source={require("../../../images/LandingPagePictures/landing_background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.heroText}>
          Go with friends, peers, classmates on a{" "}
          <Text style={styles.highlight}>carpool</Text>
        </Text>
        <Text style={styles.subHeroText}>
          Carpool party creation and joining features
        </Text>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
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
    color: Colors.textSecondary,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
});
