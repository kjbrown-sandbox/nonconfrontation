import BasicScreen from "./BasicScreen";
import { StyleSheet, TextInput, View } from 'react-native';

import colors from '../config/colors';
import MultiChoice from "./MultiChoiceScreen";
import { useState } from "react";



export default function ShortAnswerScreen({prompt, onPressForward, onPressBackward, placeholder = "I wish they knew that ..."}) {
  const [userAnswer, setUserAnswer] = useState(null);

  return (
    <BasicScreen
      prompt={prompt}
      onPressForward={() => { onPressForward(userAnswer); setUserAnswer(null);}}
      onPressBackward={onPressBackward}
    >
      <View style={[styles.textBox, styles.textInput]}>
        <TextInput
          id={prompt}
          style={styles.text}
          onChangeText={setUserAnswer}
          value={userAnswer}
          // // defaultValue=""
          placeholder={placeholder}
          placeholderTextColor={colors.neutral}
          multiline={true}
          blurOnSubmit={true}
        />
      </View>
    </BasicScreen>
  )
}

const styles = StyleSheet.create({
  textBox: {
    color: colors.darkPrimary,
    width: "80%",
    // textAlign: "center",
    backgroundColor: colors.white,
    marginTop: 15,
    padding: 8,
    borderRadius: 5,
    // justifyContent: "flex-start",
  },
  textInput: {
    minHeight: 200,
  },
  textPrompt: {
    marginTop: 100
  },
  text: {
    color: colors.darkPrimary,
    // flex: 1,

    width: "100%",
    
  }
})