import React from "react";
import { View, StyleSheet } from "react-native";
import Rive from "rive-react-native";

export default function RightGuessOverlay() {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <Rive
        resourceName="correct"
        style={{ width: "100%", maxHeight: 300 }}
        autoplay={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
    backgroundColor: "rgba(0,0,0,0.30)",
  },
});
