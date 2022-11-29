import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../config/colors'
import BasicScreen from './BasicScreen'

export default function SliderScreen({prompt, onPressForward, left, right}) {
  const [userAnswer, setUserAnswer] = useState(null);

  // function that allows user to select a number from 1-10
  // recipe for making a cake
  // 1. get ingredients
  // 2. mix ingredients
  // 3. bake cake
  // 4. eat cake
  // 5. clean up
  // 6. repeat
  

  return (
    <BasicScreen
      prompt={prompt}
      onPressForward={onPressForward}
    >
    </BasicScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 154,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  textBox: {
    width: "100%",
    backgroundColor: colors.secondary,
    // color: colors.darkPrimary,
    marginVertical: 4,
    padding: 5,
    borderRadius: 5,
  },
  text: {
    textAlign: "center",
    color: colors.darkPrimary,
  },
  selected: {
    backgroundColor: colors.darkPrimary,
    color: colors.primary,
  }


})