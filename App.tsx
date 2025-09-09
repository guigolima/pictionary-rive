import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import DrawingCanvas from "./components/DrawingCanvas";
import RiveCelebration from "./components/RiveCelebration";
import { WORDS } from "./utils/wordList";
import { useGameStore } from "./store/gameStore";

export default function App() {
  const [paths, setPaths] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(true);
  const [guess, setGuess] = useState("");
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const riveRef = useRef<any>(null);

  // Zustand store
  const score = useGameStore((state) => state.score);
  const setScore = useGameStore((state) => state.setScore);
  const currentIndex = useGameStore((state) => state.currentIndex);
  const setCurrentIndex = useGameStore((state) => state.setCurrentIndex);

  const handleDoneDrawing = () => {
    setIsDrawing(false);
  };

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === WORDS[currentIndex].toLowerCase()) {
      setScore(score + 1);
      setIsCelebrating(true);
      setIsLoading(true);
      riveRef.current?.fireState &&
        riveRef.current.fireState("State Machine 1", "Celebrate");
      setTimeout(() => {
        setIsCelebrating(false);
        setIsLoading(false);
        setCurrentIndex((currentIndex + 1) % WORDS.length);
        setPaths([]);
        setIsDrawing(true);
        setGuess("");
      }, 1500);
    } else {
      setGuess("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading next word...</Text>
        </View>
      )}
      <Text style={styles.header}>🎨 Pictionary Demo</Text>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>
      {isDrawing && (
        <>
          <Text style={styles.wordLabel}>Draw this:</Text>
          <Text style={styles.word}>{WORDS[currentIndex]}</Text>
        </>
      )}
      <DrawingCanvas paths={paths} setPaths={setPaths} />
      {isDrawing ? (
        <Pressable style={styles.button} onPress={handleDoneDrawing}>
          <Text style={styles.buttonText}>Done Drawing</Text>
        </Pressable>
      ) : (
        <>
          <TextInput
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            onSubmitEditing={handleGuess}
            style={styles.input}
            placeholderTextColor="#aaa"
            editable={!isLoading}
          />
          <Pressable
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleGuess}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Submit Guess</Text>
          </Pressable>
          <Pressable
            style={[styles.giveUpButton, isLoading && styles.buttonDisabled]}
            onPress={() => {
              setCurrentIndex((currentIndex + 1) % WORDS.length);
              setPaths([]);
              setIsDrawing(true);
              setGuess("");
            }}
            disabled={isLoading}
          >
            <Text style={styles.giveUpButtonText}>Give Up</Text>
          </Pressable>
        </>
      )}
      <RiveCelebration
        ref={riveRef}
        isCelebrating={isCelebrating}
        style={{ width: 200, height: 200 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2d2d2d",
    letterSpacing: 1.2,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#888",
    marginRight: 4,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4caf50",
  },
  wordLabel: {
    fontSize: 16,
    color: "#888",
    marginTop: 8,
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    color: "#222",
  },
  button: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1976d2",
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
  riveContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "rgba(25, 118, 210, 0.85)",
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  giveUpButton: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#e53935",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  giveUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
