import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../config/colors'
import BasicScreen from './BasicScreen'

export default function MultiChoiceScreen({prompt, onPressForward, onPressBackward, choices}) {
  const [userAnswer, setUserAnswer] = useState(null);

  return (
    <BasicScreen
      prompt={prompt}
      onPressForward={() => {onPressForward(userAnswer); setUserAnswer(null);}}
      onPressBackward={onPressBackward}
    >
      <View style={styles.container}>
        {choices.map((choice, index) => {
          return (
            <View
              key={index}
              style={[styles.textBox, userAnswer === choice ? styles.selected : null]}
            >
              <Text style={[styles.text, userAnswer === choice ? styles.selected : null]}
                onPress={() => {
                  setUserAnswer(choice);
                }}
              >
                {choice}
              </Text>
            </View>
          )
        })}
      </View>
    </BasicScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  textBox: {
    width: "100%",
    backgroundColor: colors.secondary,
    // color: colors.darkPrimary,
    marginVertical: 6,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: colors.darkPrimary,
  },
  selected: {
    backgroundColor: colors.darkPrimary,
    color: colors.primary,
  }


})