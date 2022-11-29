import { Text, StyleSheet, View, SafeAreaView, TextInput, TouchableHighlight } from 'react-native'
import {useState, Component } from 'react'
import Icon from "react-native-vector-icons/Ionicons";



import colors from '../config/colors';

export default function BasicScreen({prompt, onPressForward, onPressBackward, children}) {
  return (
    <SafeAreaView style={styles.screen}>
      <Icon
        style={styles.backArrow}
        name="chevron-back-outline"
        onPress={onPressBackward}
      />
      <View style={[styles.textBox, styles.textPrompt]}>
        <Text style={styles.text}>{prompt}</Text>
      </View>
      {children}
      <TouchableHighlight
        style={styles.forwardArrow}
        onPress={onPressForward}
      >
        <Icon
          name="arrow-forward-outline"
          style={styles.forwardArrow}
          onPress={onPressForward}
        />
      </TouchableHighlight>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 50,
    left: 30,
    color: colors.secondary,
    fontSize: 30,
  },
  forwardArrow: {
    position: "absolute",
    bottom: 30,
    right: 20,
    color: colors.secondary,
    fontSize: 50,
    maring: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    color: colors.secondary,
    alignItems: "center",
    paddingTop: 300,
  },
  textBox: {
    color: colors.darkPrimary,
    width: "80%",
    textAlign: "center",
    marginTop: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  textInput: {
    minHeight: 200,
  },
  textPrompt: {
    marginTop: 100
  },
  text: {
    color: colors.darkPrimary,
    fontSize: 20,
    // placeholderTextColor: colors.white,
  }
})