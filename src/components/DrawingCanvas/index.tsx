import React, { useRef, useMemo } from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

import { DrawingCanvasProps, Point } from "./types";

import styles from "./styles";

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  paths,
  setPaths,
  disabled = false,
}) => {
  const current = useRef<Point[] | null>(null);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (e) => {
          if (disabled) return;
          const { locationX: x, locationY: y } = e.nativeEvent;
          current.current = [{ x, y }];
          setPaths((prev) => [...prev, `M ${x} ${y}`]);
        },
        onPanResponderMove: (e) => {
          if (disabled) return;
          const { locationX: x, locationY: y } = e.nativeEvent;
          if (!current.current) return;
          current.current.push({ x, y });
          setPaths((prev) => {
            const newPaths = [...prev];
            const d = current
              .current!.map((p, i) =>
                i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
              )
              .join(" ");
            newPaths[newPaths.length - 1] = d;
            return newPaths;
          });
        },
        onPanResponderRelease: () => {
          if (disabled) return;
          current.current = null;
        },
      }),
    [disabled, setPaths]
  );

  return (
    <View
      style={styles.container}
      {...(!disabled ? panResponder.panHandlers : {})}
    >
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((d, i) => (
          <Path key={i} d={d} stroke="#222" strokeWidth={4} fill="none" />
        ))}
      </Svg>
    </View>
  );
};

export default DrawingCanvas;
