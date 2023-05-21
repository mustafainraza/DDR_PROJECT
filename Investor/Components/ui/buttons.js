import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const buttons = ({ onPress, children, backc, wid, font }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        { width: wid, alignSelf: "center" },
      ]}
    >
      <View style={[styles.button, { backgroundColor: backc }]}>
        <Text
          style={{
            color: font,
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default buttons;

const styles = StyleSheet.create({
  button: {
    padding: "5%",
    borderRadius: Platform.OS === "ios" ? "15%" : 15,
  },
  pressed: {
    opacity: 0.5,
  },
});
