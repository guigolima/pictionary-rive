import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WrongGuessOverlay() {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <Text style={styles.text}>Nope, try again!</Text>
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
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  text: {
    color: "#e53935",
    fontSize: 32,
    fontWeight: "bold",
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#e53935",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
