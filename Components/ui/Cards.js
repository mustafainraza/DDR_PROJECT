import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from "react-native-progress/Bar";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const Card = (props) => {
  let prog = Math.ceil(props.prog * 100);
  let progColor = props.prog > 0 ? props.prog : 0;
  prog = prog > 0 ? Math.ceil(props.prog * 100) : 0;
  const [modalIsVisible, SetModal] = useState(false);
  return (
    <Pressable style={styles.container}>
      <View style={progColor >= 1 ? styles.box : styles.box1}>
        <LinearGradient
          // Button Linear Gradient
          colors={
            progColor >= 1
              ? ["#D6252E", "#003047"]
              : progColor >= 0.5
              ? ["#fff", "#fff", "#003047"]
              : ["white", "white", "white"]
          }
          style={{ flex: 1, borderRadius: Platform.OS === "ios" ? "8%" : 8 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.text,
                progColor >= 1 ? { color: "white" } : { color: "black" },
              ]}
            >
              {props.id}
            </Text>
            <Text
              style={[
                { fontSize: 18, marginTop: "40%", marginLeft: "2%" },
                progColor >= 1 ? { color: "white" } : { color: "black" },
              ]}
            >
              {props.month}
            </Text>
          </View>
          <Text
            style={[
              { fontSize: 10, marginHorizontal: 10 },
              progColor >= 1 ? { color: "white" } : { color: "black" },
            ]}
          >
            {progColor >= 1 ? "Completed" : "Progress: " + prog + "%"}
          </Text>
          <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <ProgressBar
              progress={progColor >= 1 ? progColor : progColor}
              width={80}
              color={progColor >= 1 ? "white" : "#E7614A"}
              borderWidth={0}
              height={3}
            />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.text_box}>
        <Text
          adjustsFontSizeToFit={true}
          style={{ fontSize: 20, fontWeight: "300" }}
        >
          {props.title}
        </Text>
        <Text style={{ marginTop: "2%", fontSize: 13, fontWeight: "100" }}>
          {props.by}
        </Text>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    height: 120,
  },
  box: {
    width: 100,
    marginLeft: "5%",
  },
  text: {
    fontSize: 30,
    marginTop: "25%",
    marginLeft: "10%",
  },
  box1: {
    width: 100,
    marginLeft: "5%",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
  },
  text_box: {
    marginLeft: "5%",
    width: 220,
    paddingTop: "8%",
  },
  inputcontainer: {
    backgroundColor: "#000000aa",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalbox: {
    height: "30%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
  },
});
