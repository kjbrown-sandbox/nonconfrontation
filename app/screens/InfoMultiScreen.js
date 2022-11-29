import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableHighlightBase, TouchableHighlightComponent, View } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

import {useState} from 'react'
import colors from '../config/colors'

export default function InfoMultiScreen({title, text, buttonTexts, onPressForward}) {
  const [userAnswer, setUserAnswer] = useState(null);
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.textArea}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.text}>
          {text}
        </Text>
      </ScrollView>
      {buttonTexts.map((buttonText, index) => {
        return (
          <TouchableHighlight
            key={index}
            style={[styles.button, userAnswer === buttonText ? styles.selected : null]}
            title={buttonText}
            onPress={() => setUserAnswer(buttonText)}
          >
            <Text style={[styles.text, userAnswer === buttonText ? styles.selected : null]}
                onPress={() => {
                  setUserAnswer(buttonText);
                }}
              >
                {buttonText}
              </Text>
          </TouchableHighlight>
        )
      })}
      <TouchableHighlight
        style={styles.forwardArrow}
        onPress={() => onPressForward(userAnswer)}
      >
        <Icon
          name="arrow-forward-outline"
          style={styles.forwardArrow}
          onPress={() => onPressForward(userAnswer)}
        />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    color: colors.secondary,
    // alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    // colo
    paddingBottom: 150,
  },
  textArea: {
    flexGrow: 0,
    height: "70%",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkPrimary,
    // color: "black",
    // textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    color: colors.darkPrimary,
    // textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: colors.secondary,
    // color: colors.darkPrimary,
    marginVertical: 6,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: colors.darkPrimary,
  },
  selected: {
    backgroundColor: colors.darkPrimary,
    color: colors.primary,
  },
  forwardArrow: {
    position: "absolute",
    bottom: 30,
    right: 20,
    color: colors.secondary,
    fontSize: 50,
    maring: 20,
  },

})