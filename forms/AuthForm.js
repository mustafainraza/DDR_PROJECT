import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import Input from "../ui/Input";
import Button from "../ui/buttons";

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredname, setenteredname] = useState("");
  const [enteredCNIC, setenteredCNIC] = useState("");
  const [enteredcontact, setenteredcontact] = useState("");
  const {
    name: nameIsInvalid,
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    CNIC: cnicIsInvalid,
    contactno: contactnoIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "name":
        setenteredname(enteredValue);
        break;
      case "CNIC":
        setenteredCNIC(enteredValue);
        break;
      case "contactno":
        setenteredcontact(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      name: enteredname,
      contactno: enteredcontact,
      CNIC: enteredCNIC,
    });
  }

  return (
    <ScrollView>
      {!isLogin && (
        <Input
          label="Enter your name :"
          onUpdateValue={updateInputValueHandler.bind(this, "name")}
          value={enteredname}
          keyboardType="default"
          isInvalid={nameIsInvalid}
        />
      )}
      <Input
        label="Email Address :"
        onUpdateValue={updateInputValueHandler.bind(this, "email")}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
          value={enteredConfirmEmail}
          keyboardType="email-address"
          isInvalid={emailsDontMatch}
        />
      )}
      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, "password")}
        secure
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
      )}
      {!isLogin && (
        <Input
          label="Contact No:"
          onUpdateValue={updateInputValueHandler.bind(this, "contactno")}
          value={enteredcontact}
          keyboardType="phone-pad"
          isInvalid={contactnoIsInvalid}
        />
      )}
      {!isLogin && (
        <Input
          label="CNIC:"
          onUpdateValue={updateInputValueHandler.bind(this, "CNIC")}
          value={enteredCNIC}
          keyboardType="numeric"
          isInvalid={cnicIsInvalid}
        />
      )}
      <View style={styles.buttons}>
        <Button
          onPress={submitHandler}
          backc={"#D6252E"}
          wid={"80%"}
          font={"white"}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: "10%",
  },
});
