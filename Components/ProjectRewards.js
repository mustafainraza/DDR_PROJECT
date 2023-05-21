import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProjectRewards = (props) => {
  return (
    <View style={styles.card}>
      <View style={{ padding: 5 }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#F23B25" }}>
          Project Title: {props.item.campaign_title}
        </Text>
        <View style={{ marginTop: "1%" }}></View>
        <Text style={{ fontWeight: "600", fontSize: 13, color: "white" }}>
          Reward Title: {props.item.campaign_reward_name}
        </Text>
        <View style={{ marginTop: "1%" }}></View>
        <Text
          style={{ fontWeight: "600", fontSize: 13, color: "white" }}
          numberOfLines={2}
        >
          {props.item.campaign_reward_description}
        </Text>
        <View style={{ marginTop: "1%" }}></View>
        <Text style={{ fontWeight: "600", fontSize: 13, color: "white" }}>
          Reward Amount: {props.item.campaign_reward_amount} Rs
        </Text>
      </View>
    </View>
  );
};

export default ProjectRewards;

const styles = StyleSheet.create({
  card: {
    marginTop: "4%", //#003047    #D6252E
    backgroundColor: "#003047",
    marginHorizontal: "2%",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    borderRadius: Platform.OS === "ios" ? "8%" : 8,
    padding: 10,
  },
});
