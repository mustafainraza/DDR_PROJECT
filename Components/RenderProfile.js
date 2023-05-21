import { View, Text } from "react-native";
import React from "react";
import { color } from "react-native-reanimated";

export default function RenderProfile(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text> :{" "}
        {props.data[0].campaigner_name}
      </Text>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email</Text> :{" "}
        {props.data[0].campaigner_email}
      </Text>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Phone No</Text> :{" "}
        {props.data[0].campaigner_contact}
      </Text>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>CNIC</Text> :{" "}
        {props.data[0].campaigner_cnic}
      </Text>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Address</Text> :{" "}
        {props.data[0].office_address}
      </Text>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Total Campaigns
        </Text>{" "}
        : {props.data[0].total_campaigns}
      </Text>
    </View>
  );
}
