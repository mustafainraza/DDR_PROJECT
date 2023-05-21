import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BackedProjects = (props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate("Details", {
          title: props.item.campaign_title,
          data: props.item.campaign_image,
          disc: props.item.campaign_description,
          funded: Math.ceil(
            (props.item.campaign_earning / props.item.campaign_goal) * 100
          ),
          C_ID: props.item.campaigner_id,
          GOAL: props.item.campaign_goal,
          campaign_type: props.item.campaign_type,
          hours: props.item.hours,
          backed: props.item.backers,
          Name: props.item.campaigner_name,
          total: props.item.campaign_earning,
          campaign_id: props.item.campaign_id,
          isbacked: true,
        });
      }}
    >
      <View style={{ height: "100%", width: "30%" }}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: props.item.campaign_image,
          }}
        />
      </View>
      <View style={{ height: "100%", paddingHorizontal: 5, paddingTop: 5 }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: "white" }}>
          {props.item.campaign_title}
        </Text>
        <View style={{ marginTop: "1%" }}></View>
        <Text style={{ color: "white" }} numberOfLines={2}>
          {props.item.campaign_description}
        </Text>
        <Text
          style={{
            color: "#F23B25",
            marginTop: 10,
            fontWeight: "500",
            color: "#D6252E",
          }}
        >
          Amount Invested:{" "}
          <Text style={{ color: "white" }}>
            {props.item.backedamount + " Rs"}
          </Text>
        </Text>
        <Text style={{ color: "#F23B25", fontWeight: "500", color: "#D6252E" }}>
          Status:{" "}
          {props.item.hours <= 0 ? (
            <Text style={{ color: "white" }}>Closed </Text>
          ) : (
            <Text style={{ color: "white" }}>Active</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default BackedProjects;

const styles = StyleSheet.create({
  card: {
    marginTop: "3%",
    backgroundColor: "#003047",
    marginHorizontal: "2%",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    borderRadius: Platform.OS === "ios" ? "8%" : 8,
    padding: 10,
    flexDirection: "row",
    flex: 1,
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
  },
});
