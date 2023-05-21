import { View, Text, ScrollView, Alert, Button } from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import Card from "./ui/Cards";
import LottieView from "lottie-react-native";
import axios from "axios";
import { AuthContext } from "../store/auth-context";
import URL from "../config/env";

export default function TrackUpdates({ route }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const { campaign_id } = route.params;
  const animation = useRef(null);
  const [data, setData] = useState([]);
  const getdata = async () => {
    await axios
      .get(`http://${URL.abc}/milestones/getmilestones?token=${token}`, {
        headers: {
          campaign_id: campaign_id,
        },
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  useEffect(() => {
    animation.current?.play();
    getdata();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: "8%", marginLeft: "5%" }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: Platform.OS === "ios" ? "Arial" : "",
              fontWeight: "500",
            }}
          >
            Milestone
          </Text>
        </View>
        {data.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: "40%" }}>
            <LottieView
              autoPlay={false}
              loop={false}
              ref={(animate) => {
                animation.current = animate;
              }}
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#FFFFFF",
              }}
              source={require("../assets/no-data.json")}
            />
          </View>
        ) : (
          data.map((item, i) => {
            const name = [
              "Jan",
              "Feb",
              "March",
              "April",
              "May",
              "June",
              "July",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec",
            ];
            return (
              <View key={i}>
                <Card
                  id={item.day}
                  month={name[item.month - 1]}
                  prog={item.awai}
                  title={item.milestone_title}
                  by={item.milestone_desc}
                />
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
