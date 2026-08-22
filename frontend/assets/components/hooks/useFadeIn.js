import React from "react";
import { Animated } from "react-native";

export default function useFadeIn(trigger, duration = 1200) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [trigger]);

  return fadeAnim;
}