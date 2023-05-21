import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholderr,
}) => {
  return (
    <View>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholderr}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: "5%",
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "#fcdcbf",
  },
  label: {
    color: "white",
    marginBottom: 4,
    marginLeft: "5%",
    marginTop: "5%",
  },
  labelInvalid: {
    color: "#f37c13",
  },
});
