import React from "react";
import { Pressable, Text } from "react-native";

import { MenuButtonProps } from "./types";

import styles from "./styles";

export default function MenuButton({
  text,
  color = "#1976d2",
  onPress,
  disabled,
  style,
}: MenuButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: color,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}
