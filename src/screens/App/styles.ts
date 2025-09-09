import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#b0fafd",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#2d2d2d",
    letterSpacing: 1.2,
    textAlign: "center",
  },
  topBackgroundContainer: {
    width: "100%",
    height: 220,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  riveBackground: {
    width: "100%",
    maxHeight: 400,
    zIndex: 0,
  },
  topContentOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  topRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftCol: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  rightCol: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  scoreLabel: {
    fontSize: 20,
    color: "#888",
    fontWeight: "bold",
    marginRight: 4,
  },
  wordLabel: {
    fontSize: 18,
    color: "#1976d2",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
});

export default styles;
