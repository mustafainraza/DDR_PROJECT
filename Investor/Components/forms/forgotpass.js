import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import Flatbutton from "../ui/Flatbutton";
import { useNavigation } from "@react-navigation/native";
import Input from "../ui/Input";
import Button from "../ui/buttons";
import URL from "../../config/env";
const Forgotpass = () => {
  const edit = async () => {
    await axios
      .post(`http://${URL.abc}/Investors/forgot-pass`, {
        email: enteredEmail,
      })
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [enteredEmail, setEnteredEmail] = useState("");
  const navigation = useNavigation();
  const [errprompt, seterrprompt] = useState({});
  const [text, settext] = useState(true);
  function checkcredentials(e1) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let errors = {};
    if (e1 === "") {
      errors.enteredEmail = "Email is required";
      settext(false);
    } else if (!reg.test(e1)) {
      errors.enteredEmail = "Enter a valid Email Address";
    }
    return errors;
  }
  const submit = () => {
    settext(true);
    seterrprompt(checkcredentials(enteredEmail));
    if (Object.keys(checkcredentials(enteredEmail)).length === 0) {
      edit();
    }
  };
  function updateInputValueHandler(enteredValue) {
    setEnteredEmail(enteredValue);
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
      <View style={styles.box}>
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
          Forgot Password
        </Text>
        <View style={{ marginTop: "0%" }}></View>
        <Input
          label="Email Address :"
          value={enteredEmail}
          onUpdateValue={updateInputValueHandler.bind(this)}
          placeholderr="Enter your email"
        />
        <View style={{ marginLeft: "5%", marginTop: "2%" }}>
          <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
            {errprompt.enteredEmail}
          </Text>
        </View>
        <View style={{ height: "10%" }} />
        <Button onPress={submit} backc={"#D6252E"} wid={"80%"} font={"white"}>
          Submit
        </Button>
        <View style={{ marginTop: "6%" }}></View>
        <Flatbutton
          onPress={() => {
            navigation.navigate("Login");
          }}
          font={"white"}
        >
          Login
        </Flatbutton>
        <View style={{ marginBottom: "6%" }}></View>
      </View>
    </View>
  );
};
export default Forgotpass;
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
    resizeMode: "contain",
  },
  box: {
    position: "absolute",
    top: "30%",
    marginHorizontal: "5%",
    width: "90%",
    height: "36%",
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
