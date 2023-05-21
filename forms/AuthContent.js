import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  VirtualizedList,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Flatbutton from "../ui/Flatbutton";
import { useNavigation } from "@react-navigation/native";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
    name: false,
    CNIC: false,
    contactno: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let {
      email,
      confirmEmail,
      password,
      confirmPassword,
      name,
      CNIC,
      contactno,
    } = credentials;

    email = email.trim();
    password = password.trim();
    name = name.trim();
    CNIC = CNIC.trim();
    contactno = contactno.trim();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const emailIsValid = reg.test(email);
    const passwordIsValid = password.length > 5;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    const cnicIsValid = CNIC.length === 13;
    const nameIsValid = name.length > 0;
    const contactIsValid = contactno.length > 0;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin &&
        (!emailsAreEqual ||
          !passwordsAreEqual ||
          !cnicIsValid ||
          !nameIsValid ||
          !contactIsValid))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        name: !nameIsValid,
        contactno: !contactIsValid,
        CNIC: !cnicIsValid,
      });
      return;
    }
    onAuthenticate({ email, password, name, contactno, CNIC });
  }

  return (
    <View style={styles.body}>
      <View style={styles.half}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            style={styles.background}
            source={require("../../assets/new.png")}
          />
        </View>
      </View>
      <View style={isLogin ? styles.box : styles.box1}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            letterSpacing: 0.12,
            fontWeight: "bold",
            marginTop: "3%",
            fontSize: 20,
          }}
        >
          {isLogin ? "LOGIN" : "Sign Up"}
        </Text>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={isLogin ? { height: "10%" } : { height: "5%" }} />
        <Flatbutton onPress={switchAuthModeHandler} font={"white"}>
          {isLogin
            ? "Not A User ? Create an Account"
            : "Already a User ? Login"}
        </Flatbutton>
        <View style={{ marginTop: "2%" }}></View>
        {isLogin ? (
          <Flatbutton
            onPress={() => {
              navigation.navigate("forgotpass");
            }}
            font={"white"}
          >
            Forgot Password
          </Flatbutton>
        ) : null}
        <View style={{ marginBottom: "14%" }}></View>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#003047", //#003047 #D6252E
    opacity: 0.9,
  },
  half: {
    height: "55%",
    backgroundColor: "black",
    borderBottomLeftRadius: Platform.OS === "ios" ? "60%" : 60,
    borderBottomRightRadius: Platform.OS === "ios" ? "60%" : 60,
  },
  background: {
    width: "80%",
    height: "80%",
    resizeMode: "center",
  },
  box: {
    position: "absolute",
    top: "30%",
    marginHorizontal: "5%",
    width: "90%",
    height: "55%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
  box1: {
    position: "absolute",
    top: "30%",
    marginHorizontal: "5%",
    width: "90%",
    height: "67%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
});
