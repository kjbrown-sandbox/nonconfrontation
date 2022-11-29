import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableHighlightBase, TouchableHighlightComponent, View } from 'react-native'
import React from 'react'
import colors from '../config/colors'

export default function InfoScreen({title, text, buttonText, onPressForward}) {
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
      <TouchableHighlight
        style={styles.button}
        title={buttonText}
        onPress={() => onPressForward("intro")}
      >
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
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
    backgroundColor: colors.secondary,
    padding: 22,
    borderRadius: 5,
    // marginHorizontal: "auto",
    marginBottom: 60,
  },
  buttonText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "700",
  }

})