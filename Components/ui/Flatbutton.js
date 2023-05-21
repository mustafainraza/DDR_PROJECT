import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Flatbutton = ({ children, onPress, wid, font }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        { width: wid, alignSelf: "center" },
      ]}
    >
      <View>
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

export default Flatbutton;

const styles = StyleSheet.create({});
