import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

interface MenuButtonProps {
  text: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function MenuButton({ text, color = "#1976d2", onPress, disabled, style }: MenuButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    maxWidth: 400,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
