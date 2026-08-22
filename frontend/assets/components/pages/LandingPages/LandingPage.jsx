import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from "react-native";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

import { Colors } from "@/constants/theme";
import useFadeIn from "../../hooks/useFadeIn";

const landingPages = [Page1, Page2, Page3];

export default function LandingPage() {
  const fadeAnim = useFadeIn(currentPage);

  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={landingPages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={(event) => {
          const page = Math.round(event.nativeEvent.contentOffset.x / width);

          setCurrentPage(page);
        }}
        renderItem={({ item: Page, index }) => (
          <View style={[styles.page, { width }]}>
            <Page isActive={currentPage === index} />
          </View>
        )}
      />

      <Animated.View style={[styles.pagination, { opacity: fadeAnim }]}>
        {landingPages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentPage === index && styles.activeDot]}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
  },

  page: {
    flex: 1,
  },

  pagination: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textSecondary,
    marginHorizontal: 5,
  },

  activeDot: {
    width: 24,
    backgroundColor: Colors.highlight,
  },
});
