import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import BasicScreen from './app/screens/BasicScreen';
import ShortAnswerScreen from './app/screens/ShortAnswerScreen';
import MultiChoiceScreen from './app/screens/MultiChoiceScreen';
import InfoScreen from './app/screens/InfoScreen';
import InfoMultiScreen from './app/screens/InfoMultiScreen';

export default function App() {
  const screens = {
    "intro": {
      type: "info",
      title: "Welcome to Nonconfrontation.",
      text: "Occasionally in our lives, we find ourselves wanting to resolve something with a person. Some of us handle it easy. Others of us struggle to voice even small concerns.\n\nWe know we shouldn't push off those conversations, but sometimes we do, anyway, leaving us stuck where we are, struggling all the while.\n\nAnd that’s hard.\n\nFrom feeling belittled by your boss to struggling with a romantic partner to setting boundaries with a parent—if you’re looking for a place to give you a push to handle your own hard conversations, we've got you covered.",
      buttonText: "LET'S TALK",
      forward: "shortIssue",
    },
    "shortIssue": {
      type: "shortAnswer",
      prompt: "What's the issue?",
      placeholder: "I've been feeling neglected for ...",
      forward: "shortNoWorry",
    },
    "shortNoWorry": {
      type: "shortAnswer",
      prompt: "If you could say whatever you wanted to them without worrying, what would you say?",
      placeholder: "I wish they knew that ...",
      forward: "multiTried",
    },
    "multiTried": {
      type: "multiChoice",
      prompt: "Have you tried talking to them about this before?",
      choices: ["Yes", "No"],
      forward: { "Yes": "shortTried", "No": "shortNotTried" },
    },
    "shortNotTried": {
      type: "shortAnswer",
      prompt: "What's stopping you?",
      placeholder: "I'm afraid they'll ...",
      forward: "multiSimilar",
    },
    "multiSimilar": {
      type: "multiChoice",
      prompt: "Have you tried talking to them about something similar?",
      choices: ["Yes", "No"],
      forward: { "Yes": "shortTried", "No": "multiResolved" },
    },
    "shortTried": {
      type: "shortAnswer",
      prompt: "How did the conversation go?",
      placeholder: "It went better than I expected ...",
      forward: "multiWilling",
    },
    "multiWilling": {
      type: "multiChoice",
      prompt: "That conversation left me ________ willing to have future conversations.",
      choices: ["More", "Less", "The same"],
      forward: "multiResolved",
    },
    "multiResolved": {
      type: "multiChoice",
      prompt: "How likely will this get resolved if you don't bring it up?",
      choices: ["Very unlikely", "Unlikely", "No difference", "Likely", "Very likely"],
      forward: "shortTheyFeel",
    },
    "shortTheyFeel": {
      type: "shortAnswer",
      prompt: "How do you think they feel about this?",
      placeholder: "I think they feel ...",
      forward: "shortNotBroughtUp",
    },
    "shortNotBroughtUp": {
      type: "shortAnswer",
      prompt: "Why do you think they haven't brought it up?",
      placeholder: "I think they don't know ...",
      forward: "shortIdeal",
    },
    "shortIdeal": {
      type: "shortAnswer",
      prompt: "What would be your ideal outcome?",
      placeholder: "I would love if ...",
      forward: "callToAction",
    },
    "callToAction": {
      type: "infoMulti",
      title: "You made it.",
      text: "Congratulations. You've made it to the end of the introspection. Many people find writing their thoughts to be cathartic, and it can often bring new insights into the situation and help you emphathize with the other person. Well done making it this far.\n\nNow, let's see how you're feeling. We've got a few options for you. Do you want to talk to this person?",
      buttonTexts: ["Yes! I'll do it", "Yes, but I don't know how", "No, but I feel like I should", "No, and I'm not going to"],
      forward: { "Yes! I'll do it": "endDoIt", "Yes, but I don't know how": "startConv1", "No, but I feel like I should": "startConv1", "No, and I'm not going to": "endNoTalk" },
    },
    "endDoIt": {
      type: "info",
      title: "You got this.",
      text: "We support you 100%. These conversations can be hard, so well done in taking the step forward to talk it out. We're here for you if you need us.",
      buttonText: "LET'S GO AGAIN",
      forward: "intro",
    },
    "endNoTalk": {
      type: "info",
      title: "Best of luck.",
      text: "Some conversations don't need to happen, some aren't worth the trouble, and some we simply aren't ready for. We get it. If you ever change your mind, we're here for you.",
      buttonText: "I'M READY",
      forward: "intro",
    },
    "startConv1": {
      type: "infoMulti",
      title: "You can do this.",
      text: "Starting conversations can be the hardest part, especially when you're worried about how they'll react. Once conversation is flowing, however, many people are able to address their own issues. It just requires a nudge to get there.\n\nThe actual conversation ought to be done in the warmest form of communication possible, meaning: in person, video, voice, or text, in that order.\n\nBut you don’t need to start there.\n\nSimply giving the person a heads up that you want to talk is a great first step towards having the conversation—and this can be done over text.",
      // text: "We know it can be hard to talk to people, especially when you're worried about how they'll react. But you can do it. We're here to help you through it.",
      buttonTexts: ["Okay, I'll message them now", "But what do I say?"],
      forward: { "Okay, I'll message them now": "endDoIt", "But what do I say?": "startConv2" },
    },
    "startConv2": {
      type: "infoMulti",
      title: "Crafting your message.",
      text: "This doesn’t need to be scary. Your message should communicate two things:\n1. You are looking to have a conversation at a future date.\n2. The conversation is important to you.\n\nThis can be done simply with “Hey, you free later today?” or a variation that better suits your relationship. Briefly explain why you want to talk, either as part of your initial message or after their reply.\n\n\"Something’s been bugging me and I wanted to talk about it.\"\n\"I heard something that really confused me. Can we talk?\"\n\nThe purpose of this message is to make it easier to talk down the road. It’s not a conversation in and of itself, but it's a great start.",
      buttonTexts: ["I can do that", "Can I get a space to practice?"],
      forward: { "I can do that": "endDoIt", "Can I get a space to practice?": "startConv3" },
    },
    "startConv3": {
      type: "shortAnswer",
      prompt: "Feel free to practice your message here. When you're ready, copy it over and hit send.",
      placeholder: "Hey, you free later today?",
      forward: "endDoIt",
    },
  }

  const [currentScreen, setCurrentScreen] = useState("intro");
  const [previousScreen, setPreviousScreen] = useState(null);
  const [userResponses, setUserResponses] = useState(null);

  const handleForward = (response = null) => {
    const screen = screens[currentScreen];

    console.log("response", response);
    if (response) {
      setUserResponses(userResponses ? { ...userResponses, [currentScreen]: response } : { [currentScreen]: response });
    }

    const nextPage = typeof (screen.forward) === "string" ? screen.forward : screen.forward[response];
    console.log("responses so far", userResponses);
    setCurrentScreen(nextPage);
    setPreviousScreen(currentScreen);
    console.log("\n");
  };

  const getScreen = (screenName) => {
    const screen = screens[screenName];
    if (!screen) {
      return <>
        <Text>Space</Text>
        <Text>Space</Text>
        <Text>Space</Text>
        <Text>Space</Text>
        <Text>Screen not found: {screenName}</Text>
      </>
    }
    switch (screen.type) {
      case "info":
        return (
          <InfoScreen
            title={screen.title}
            text={screen.text}
            buttonText={screen.buttonText}
            onPressForward={handleForward}
            onPressBackward={() => setCurrentScreen(previousScreen)}
          />
        );
      case "shortAnswer":
        return (
          <ShortAnswerScreen
            id={screenName}
            prompt={screen.prompt}
            placeholder={screen.placeholder}
            onPressForward={handleForward}
            onPressBackward={() => setCurrentScreen(previousScreen)}
          />
        );
      case "multiChoice":
        return (
          <MultiChoiceScreen
            id={screenName}
            prompt={screen.prompt}
            choices={screen.choices}
            onPressForward={handleForward}
            onPressBackward={() => setCurrentScreen(previousScreen)}
          />
        );
      case "infoMulti":
        return (
          <InfoMultiScreen
            title={screen.title}
            text={screen.text}
            buttonTexts={screen.buttonTexts}
            onPressForward={handleForward}
            onPressBackward={() => setCurrentScreen(previousScreen)}
          />
        );
      case "slider":
        return (
          <SliderScreen
            id={screenName}
            prompt={screen.prompt}
            left={screen.left}
            right={screen.right}
            onPressForward={handleForward}
            onPressBackward={() => setCurrentScreen(previousScreen)}
          />
        );
    }
  };

  return (
    getScreen(currentScreen)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
