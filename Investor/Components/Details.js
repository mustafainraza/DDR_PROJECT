import {
  View,
  Text,
  ScrollView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Project from "./project";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import RenderProfile from "./RenderProfile";
import { AuthContext } from "../store/auth-context";
import URL from "../config/env";
import AppContext from "./forms/AppContext";

export default function Details({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [campaignerdetails, setCampaignerdetails] = useState([]);
  const props = route.params;
  const { campaign_id } = route.params;
  const [hours, sethours] = useState(props.hours);
  const [backerdetails, setbackerdetails] = useState([]);
  const myContext = useContext(AppContext);
  const [textString, setString] = useState("BACK THIS PROJECT");

  const track_update = false;

  const getcampaignerdetails = async () => {
    const { C_ID } = props;
    await axios
      .get(`http://${URL.abc}/Campaigner/campaignerdetails?token=${token}`, {
        headers: {
          campaigner_id: C_ID,
        },
      })
      .then(function (response) {
        setCampaignerdetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getbackers = async () => {
    const { campaign_id } = props;
    let getURL = "";
    if (props.campaign_type == "profit") {
      getURL = `http://${URL.abc}/backer/backersprofit?token=${token}`;
    } else if (props.campaign_type == "reward") {
      getURL = `http://${URL.abc}/backer/backersreward?token=${token}`;
    } else if (props.campaign_type == "equity") {
      getURL = `http://${URL.abc}/backer/backerequity?token=${token}`;
    } else {
      getURL = `http://${URL.abc}/backer/backerdonation?token=${token}`;
    }
    await axios
      .get(getURL, {
        headers: {
          campaign_id: campaign_id,
        },
      })
      .then(function (response) {
        setbackerdetails(response.data);
        response.data.find((i) => {
          i.investor_id == myContext.investor_id
            ? setString("ALREADY INVESTED")
            : setString("BACK THIS PROJECT");
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getcampaignerdetails();
    getbackers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        {item.investor_name}
      </Text>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
        {props.campaign_type == "reward"
          ? item.campaign_reward_amount
          : props.campaign_type == "profit"
          ? item.investor_amount
          : props.campaign_type == "equity"
          ? item.campaign_equity_amount
          : props.campaign_type == "donation"
          ? item.investor_donation_amount
          : ""}
      </Text>
    </View>
  );
  return (
    <View style={{ backgroundColor: "#003047", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#003047",
          width: "100%",
          height: "65%",
        }}
      >
        <View style={{ height: "75%" }}>
          <Project
            title={props.title}
            disc={props.disc}
            funded={props.funded}
            backed={props.backed}
            hours={props.hours}
            data={props.data}
            C_ID={props.C_ID}
            campaign_type={props.campaign_type}
            campaign_id={props.campaign_id}
            isLiked={props.isLiked}
            A={props.A}
            isbacked={props.isbacked}
          />
        </View>

        <View style={{ marginLeft: "13%" }}>
          <Text style={{ color: "white" }}>Goal : {props.GOAL}</Text>

          <Text style={{ color: "white" }}>Total Funded: {props.total}</Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: "2%",
            paddingTop: "2%",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <View style={{ flex: 1, height: "100%", paddingTop: "2.5%" }}>
            <MaterialIcons name="campaign" size={40} color="#D6252E" />
          </View>
          <View style={{ flex: 4, height: "50%", paddingTop: "2%" }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                color: "white",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              }}
            >
              Created by
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible2(true);
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 18,
                  color: "white",
                  fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                }}
              >
                {props.Name}
              </Text>
              <View style={styles.centeredView}>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible2}
                  onRequestClose={() => {
                    setModalVisible2(!modalVisible2);
                  }}
                  style={{ flex: 1 }}
                >
                  <Pressable
                    style={styles.centeredView}
                    onPress={() => {
                      setModalVisible2(false);
                    }}
                  />
                  <View
                    style={[
                      styles.modalView,
                      {
                        position: "absolute",
                        alignSelf: "center",
                        marginTop: "45%",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Campaigner Details
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: "5%",
                        height: "5%",
                        borderTopWidth: 1,
                      }}
                    />
                    {<RenderProfile data={campaignerdetails} />}
                  </View>
                </Modal>
              </View>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              height: "55%",
              width: "28%",
              borderColor: "black",
              justifyContent: "center",
              marginEnd: 8,
              alignSelf: "center",
              alignItems: "center",
              backgroundColor: "#D6252E",
            }}
          >
            <Text style={{ color: "white", position: "absolute" }}>
              View Backers
            </Text>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{ flex: 1 }}
              >
                <Pressable
                  style={styles.centeredView}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
                <View
                  style={[
                    styles.modalView,
                    {
                      position: "absolute",
                      alignSelf: "center",
                      marginTop: "45%",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Name
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Amount
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: "5%",
                      height: "5%",
                      borderTopWidth: 1,
                    }}
                  />
                  <FlatList data={backerdetails} renderItem={renderItem} />
                </View>
              </Modal>
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{ backgroundColor: "white", width: "100%", height: "0.75%" }}
      ></View>
      <Pressable
        style={{
          width: "100%",
          height: "11%",
        }}
        onPress={() => {
          navigation.navigate("Track Progress", {
            title: "Track Milestone",
            campaign_id: props.campaign_id,
          });
        }}
      >
        <LinearGradient colors={["#D6252E", "#003047"]}>
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              width: "100%",
              height: "100%",
              paddingLeft: "38%",
              paddingTop: "5%",
            }}
          >
            Updates
          </Text>
        </LinearGradient>
      </Pressable>
      <View
        style={{ backgroundColor: "white", width: "100%", height: "0.75%" }}
      ></View>
      <Pressable
        style={{
          width: "100%",
          height: "11%",
        }}
        onPress={() => {
          navigation.navigate("Comments", {
            campaign_id: props.campaign_id,
          });
        }}
      >
        <LinearGradient colors={["#D6252E", "#003047"]}>
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              width: "100%",
              height: "100%",
              paddingLeft: "35%",
              paddingTop: "5%",
            }}
          >
            Comments
          </Text>
        </LinearGradient>
      </Pressable>
      <View
        style={{ backgroundColor: "white", width: "100%", height: "0.75%" }}
      ></View>

      <Pressable
        disabled={backerdetails.find((i) => {
          return i.investor_id == myContext.investor_id ? true : false;
        })}
        android_ripple={{ color: "lightgreen" }}
        style={{
          marginTop: "3%",
          backgroundColor: "#D6252E",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "80%",
          height: "8%",
          borderRadius: 30,
        }}
        onPress={() => {
          props.campaign_type == "reward" || props.campaign_type == "equity"
            ? navigation.navigate("Rewards", {
                C_ID: props.C_ID,
                campaign_type: props.campaign_type,
                campaign_id: campaign_id,
              })
            : props.campaign_type == "profit"
            ? navigation.navigate("Profitbased Investment", {
                C_ID: props.C_ID,
                campaign_id: campaign_id,
              })
            : navigation.navigate("Donationbased Investment", {
                C_ID: props.C_ID,
                campaign_id: campaign_id,
              });
        }}
      >
        {hours > 0 ? (
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              fontWeight: "bold",
            }}
          >
            {textString}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
              fontWeight: "bold",
            }}
          >
            Campaign Ended
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    width: "90%",
    height: "50%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: "#003047",
  },

  modalText: {
    fontSize: 18,
    color: "green",
  },
});
