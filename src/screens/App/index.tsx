import React, { useState, useCallback } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import Rive from "rive-react-native";

import { useGameStore } from "../../store/gameStore";
import MenuButton from "../../components/MenuButton";
import { words } from "../../utils/wordList";
import AnswerOverlay from "../../components/AnswerOverlay";
import DrawingCanvas from "../../components/DrawingCanvas";

import styles from "./styles";

const App = () => {
  // State
  const [paths, setPaths] = useState<string[]>([]);
  const [guess, setGuess] = useState("");
  const [isDrawing, setIsDrawing] = useState(true);
  const [isRightGuess, setIsRightGuess] = useState(false);
  const [isWrongGuess, setIsWrongGuess] = useState(false);

  // Store
  const score = useGameStore((state) => state.score);
  const setScore = useGameStore((state) => state.setScore);
  const currentIndex = useGameStore((state) => state.currentIndex);
  const setCurrentIndex = useGameStore((state) => state.setCurrentIndex);

  // Handlers
  const handleGuess = useCallback(() => {
    const checkAnswer =
      guess.trim().toLowerCase() === words[currentIndex].toLowerCase();
    if (checkAnswer) {
      setScore(score + 1);
      setIsRightGuess(true);
      setTimeout(() => handleResetGame(), 1500);
    } else {
      setGuess("");
      setIsWrongGuess(true);
      setTimeout(() => setIsWrongGuess(false), 2500);
    }
  }, [guess, currentIndex, score, setScore]);

  const handleResetGame = useCallback(() => {
    setIsRightGuess(false);
    setCurrentIndex((currentIndex + 1) % words.length);
    setPaths([]);
    setIsDrawing(true);
    setGuess("");
  }, [currentIndex, setCurrentIndex]);

  const handleGiveUp = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % words.length);
    setPaths([]);
    setIsDrawing(true);
    setGuess("");
  }, [currentIndex, setCurrentIndex]);

  const handleDoneDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBackgroundContainer}>
        <Rive
          resourceName="drawing_kitty"
          style={styles.riveBackground}
          autoplay={true}
        />
        <View style={styles.topContentOverlay}>
          <Text style={styles.header}>Pictionary</Text>
          <View style={styles.topRow}>
            <View style={styles.leftCol}>
              {isDrawing ? (
                <Text style={styles.wordLabel}>
                  Draw this: {words[currentIndex]}
                </Text>
              ) : (
                <Text style={styles.wordLabel}>Guess the drawing!</Text>
              )}
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.scoreLabel}>Score: {score}</Text>
            </View>
          </View>
        </View>
      </View>
      <DrawingCanvas paths={paths} setPaths={setPaths} disabled={!isDrawing} />
      {isDrawing ? (
        <MenuButton text="Done Drawing" onPress={handleDoneDrawing} />
      ) : (
        <>
          <TextInput
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            onSubmitEditing={handleGuess}
            style={styles.input}
            placeholderTextColor="#aaa"
            editable={!isRightGuess && !isWrongGuess}
          />
          <MenuButton
            text="Submit Guess"
            onPress={handleGuess}
            disabled={isRightGuess || isWrongGuess}
          />
          <MenuButton
            text="Give Up"
            color="#e53935"
            onPress={handleGiveUp}
            disabled={isRightGuess}
          />
        </>
      )}
      {isWrongGuess && <AnswerOverlay result="wrong" />}
      {isRightGuess && <AnswerOverlay result="right" />}
    </SafeAreaView>
  );
};

export default App;
