import React, { useRef } from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

type Point = { x: number; y: number };

type Props = {
  paths: string[];
  setPaths: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function DrawingCanvas({ paths, setPaths }: Props) {
  const current = useRef<Point[] | null>(null);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX: x, locationY: y } = e.nativeEvent;
        current.current = [{ x, y }];
        setPaths((p) => [...p, `M ${x} ${y}`]);
      },
      onPanResponderMove: (e) => {
        const { locationX: x, locationY: y } = e.nativeEvent;
        if (!current.current) return;
        current.current.push({ x, y });
        setPaths((prev) => {
          const newPaths = [...prev];
          const d = current.current!
            .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
            .join(" ");
          newPaths[newPaths.length - 1] = d;
          return newPaths;
        });
      },
      onPanResponderRelease: () => {
        current.current = null;
      },
    })
  ).current;

  return (
    <View style={styles.container} {...pan.panHandlers}>
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((d, i) => (
          <Path key={i} d={d} stroke="#222" strokeWidth={4} fill="none" />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: "#1976d2",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});
