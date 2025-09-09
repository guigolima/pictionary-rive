import React from "react";
import { View } from "react-native";
import Rive from "rive-react-native";

import styles from "./styles";

import { AnswerOverlayProps } from "./types";

export default function AnswerOverlay({ result }: AnswerOverlayProps) {
  const resourceName = result === "right" ? "correct" : "error";
  return (
    <View style={styles.overlay} pointerEvents="none">
      <Rive
        resourceName={resourceName}
        style={{ width: "100%", maxHeight: 300 }}
        autoplay={true}
      />
    </View>
  );
}
