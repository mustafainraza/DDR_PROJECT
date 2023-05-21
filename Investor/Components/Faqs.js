import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Faqs = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={{ marginTop: "4%" }}>
      <TouchableOpacity style={styles.button} onPress={() => toggleExpand()}>
        <Text style={[styles.title]}>{props.title}</Text>

        <Ionicons
          name={expanded ? "caret-up" : "caret-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && props.children ? (
        <View style={styles.childHr}>{props.children}</View>
      ) : null}
    </View>
  );
};

export default Faqs;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },

  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 57,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "#D6252E",
    marginHorizontal: "5%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#22A7F0",
    elevation: 5,
  },
  parentHr: {
    height: 2,
    width: "100%",
  },
  childHr: {
    marginTop: 10,
    paddingVertical: "4%",
    paddingLeft: 15,
    marginHorizontal: "5%",
    backgroundColor: "#003047",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
  },
});
