import {
  View,
  Text,
  Button,
  Modal,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "./Home";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Main from "./Main";
import {
  Octicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import AppContext from "./forms/AppContext";
import Guides from "../Components/Guide";
import { AuthContext } from "../store/auth-context";

const Drawer = createDrawerNavigator();
export default function Drawer_Nav({ navigation }) {
  const myContext = useContext(AppContext);
  const [modalVisible2, setModalVisible2] = useState(false);
  const authCtx = useContext(AuthContext);

  return (
    <>
      <StatusBar style="dark" backgroundColor="#f5f5f5" />

      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                icon={() => <Ionicons name={"exit"} color={"red"} size={24} />}
                label="Logout"
                onPress={() => authCtx.logout()}
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <FontAwesome name="home" size={24} color="#F23B25" />
            ),
            headerRight: () => (
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: "4%",
                  paddingBottom: "6%",
                  flexDirection: "row-reverse",
                }}
              >
                <Pressable
                  style={{ paddingRight: "8%", paddingTop: 10 }}
                  onPress={() => {
                    setModalVisible2(true);
                  }}
                >
                  <Image
                    style={{
                      height: "100%",
                      width: 25,
                    }}
                    source={require("../assets/filter.png")}
                  />
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
                            marginTop: "80%",
                            minHeight: 280,
                          },
                        ]}
                      >
                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <Pressable
                            android_ripple={{
                              borderless: false,
                              color: "#003047",
                            }}
                            onPress={() => {
                              myContext.setval("all"), setModalVisible2(false);
                            }}
                          >
                            <Text style={{ fontSize: 25, textAlign: "center" }}>
                              All
                            </Text>
                          </Pressable>
                          <View
                            style={{
                              backgroundColor: "grey",
                              width: "100%",
                              height: "0.75%",
                              marginBottom: "10%",
                            }}
                          ></View>
                          <Pressable
                            android_ripple={{
                              borderless: false,
                              color: "#003047",
                            }}
                            onPress={() => {
                              myContext.setval("reward"),
                                setModalVisible2(false);
                            }}
                          >
                            <Text style={{ fontSize: 25, textAlign: "center" }}>
                              Reward
                            </Text>
                          </Pressable>
                          <View
                            style={{
                              backgroundColor: "grey",
                              width: "100%",
                              height: "0.75%",
                              marginBottom: "10%",
                            }}
                          ></View>
                          <Pressable
                            android_ripple={{
                              borderless: false,
                              color: "#003047",
                            }}
                            onPress={() => {
                              myContext.setval("profit"),
                                setModalVisible2(false);
                            }}
                          >
                            <Text style={{ fontSize: 25, textAlign: "center" }}>
                              Profit
                            </Text>
                          </Pressable>
                          <View
                            style={{
                              backgroundColor: "grey",
                              width: "100%",
                              height: "0.75%",
                              marginBottom: "10%",
                            }}
                          ></View>
                          <Pressable
                            android_ripple={{
                              borderless: false,
                              color: "#003047",
                            }}
                            onPress={() => {
                              myContext.setval("equity"),
                                setModalVisible2(false);
                            }}
                          >
                            <Text style={{ fontSize: 25, textAlign: "center" }}>
                              Equity
                            </Text>
                          </Pressable>
                          <View
                            style={{
                              backgroundColor: "grey",
                              width: "100%",
                              height: "0.75%",
                              marginBottom: "8%",
                            }}
                          ></View>
                          <Pressable
                            android_ripple={{
                              borderless: false,
                              color: "#003047",
                            }}
                            onPress={() => {
                              myContext.setval("donation"),
                                setModalVisible2(false);
                            }}
                          >
                            <Text style={{ fontSize: 25, textAlign: "center" }}>
                              Donation
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </Pressable>
                <Pressable
                  style={{
                    justifyContent: "center",
                    paddingRight: "7%",
                    paddingTop: "3%",
                  }}
                  onPress={() => navigation.navigate("Search")}
                >
                  <MaterialIcons name="search" size={30} color="black" />
                </Pressable>
              </View>
            ),
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <FontAwesome name="book" size={24} color="#F23B25" />
            ),
          }}
          name="Guide"
          component={Guides}
        />

        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <FontAwesome name="user" size={24} color="#F23B25" />
            ),
          }}
          name="Profile"
          component={Main}
        />
      </Drawer.Navigator>
    </>
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
    width: "70%",
    height: "10%",
    borderRadius: 20,
    padding: "8%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },

  modalText: {
    fontSize: 18,
    color: "green",
  },
});
