import React, { forwardRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Rive from "rive-react-native";

type Props = {
  isCelebrating: boolean;
  style?: any;
};

const CELEBRATION_URL = "https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv";

const CelebrationOverlay = forwardRef<any, Props>(({ isCelebrating, style }, ref) => (
  isCelebrating ? (
    <View style={styles.overlay} pointerEvents="auto">
      <View style={styles.centered}>
        <Rive
          ref={ref}
          url={CELEBRATION_URL}
          artboardName="Avatar 1"
          stateMachineName="avatar"
          style={{ width: 220, height: 220, ...(style || {}) }}
        />
      </View>
    </View>
  ) : null
));

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    elevation: 100,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CelebrationOverlay;
