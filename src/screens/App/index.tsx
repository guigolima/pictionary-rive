import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";

import DrawingCanvas from "../../components/DrawingCanvas";

import WrongGuessOverlay from "../../components/WrongGuessOverlay";
import { useGameStore } from "../../store/gameStore";
import MenuButton from "../../components/MenuButton";
import { words } from "../../utils/wordList";
import styles from "./index.styles";
import Rive from "rive-react-native";
import RightGuessOverlay from "../../components/RightGuessOverlay";

const App = () => {
  const [paths, setPaths] = useState<string[]>([]);
  const [guess, setGuess] = useState("");
  const [isDrawing, setIsDrawing] = useState(true);
  const [isRightGuess, setIsRightGuess] = useState(false);
  const [isWrongGuess, setIsWrongGuess] = useState(false);

  const score = useGameStore((state) => state.score);
  const setScore = useGameStore((state) => state.setScore);
  const currentIndex = useGameStore((state) => state.currentIndex);
  const setCurrentIndex = useGameStore((state) => state.setCurrentIndex);

  const handleGuess = () => {
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
  };

  const handleResetGame = () => {
    setIsRightGuess(false);
    setCurrentIndex((currentIndex + 1) % words.length);
    setPaths([]);
    setIsDrawing(true);
    setGuess("");
  };

  const handleGiveUp = () => {
    setCurrentIndex((currentIndex + 1) % words.length);
    setPaths([]);
    setIsDrawing(true);
    setGuess("");
  };

  const handleDoneDrawing = () => {
    setIsDrawing(false);
  };

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
              {isDrawing && (
                <Text style={styles.wordLabel}>
                  Draw this: {words[currentIndex]}
                </Text>
              )}
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.scoreLabel}>Score: {score}</Text>
            </View>
          </View>
        </View>
      </View>
      <DrawingCanvas
        paths={paths || []}
        setPaths={setPaths}
        disabled={!isDrawing}
      />
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
      {isWrongGuess && <WrongGuessOverlay />}
      {isRightGuess && <RightGuessOverlay />}
    </SafeAreaView>
  );
};

export default App;
