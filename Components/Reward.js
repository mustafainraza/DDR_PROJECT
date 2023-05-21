import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import RewardCard from "./RewardCard";
import Equity_Card from "./Equity_Card";
import axios from "axios";
import URL from "../config/env";
import AppContext from "./forms/AppContext";
import FlashMessage from "react-native-flash-message";

export default function Rewards({ route }) {
  const { campaign_id } = route.params;
  const myContext = useContext(AppContext);
  const [Rewards_data, setRewards_data] = useState([]);
  const [Isdata_loaded, setIsdata_loaded] = useState(false);
  const C_ID = route.params.C_ID;
  const campaign_type = route.params.campaign_type;

  const getrewardDetails = async () => {
    await axios
      .get(`http://${URL.abc}/Campaign/reward_details`, {
        headers: {
          campaign_id: campaign_id,
        },
      })
      .then(function (response) {
        setRewards_data(response.data);
        setIsdata_loaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getequityDetails = async () => {
    await axios
      .get(`http://${URL.abc}/Campaign/equity_details`, {
        headers: {
          campaign_id: campaign_id,
        },
      })
      .then(function (response) {
        setRewards_data(response.data);
        setIsdata_loaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    campaign_type == "reward" ? getrewardDetails() : getequityDetails();
  }, [campaign_type]);

  const renderItem = ({ item }) =>
    campaign_type == "reward" ? (
      <RewardCard
        title={item.campaign_reward_name}
        disc={item.campaign_reward_description}
        price={item.campaign_reward_amount}
        reward_id={item.campaign_reward_id}
        C_ID={C_ID}
        campaign_id={campaign_id}
      />
    ) : (
      <Equity_Card
        percentage={item.campaign_equity_percentage}
        disc={item.campaign_equity_description}
        Total_price={item.campaign_equity_amount}
        equity_id={item.campaign_equity_id}
        C_ID={C_ID}
        campaign_id={campaign_id}
      />
    );
  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      {!Isdata_loaded ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <ActivityIndicator size={80} color="red" />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <FlatList data={Rewards_data} renderItem={renderItem} />
        </View>
      )}
      <FlashMessage position="top" />
    </View>
  );
}

const Set = [
  {
    title: "Reward 1",
    disc: "This is project Reward discription",
    price: 3000,
    reward_id: 1,
  },
  {
    title: "Reward 2",
    disc: "This is project Reward 2 discription",
    price: 6000,
    reward_id: 2,
  },
];

const Set2 = [
  {
    percentage: 30,
    disc: "This is project Equity 1 discription",
    Total_price: 3000,
    equity_id: 1,
  },
  {
    percentage: 10,
    disc: "This is project Equity 2 discription",
    Total_price: 6000,
    equity_id: 2,
  },
];
