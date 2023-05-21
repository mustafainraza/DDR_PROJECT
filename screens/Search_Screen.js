import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import AppContext from "../Components/forms/AppContext";
import axios from "axios";
import URL from "../config/env";

const Search_Screen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [filteredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");
  const [likes, setlikes] = useState([]);
  const [countlikes, setCountlikes] = useState([]);
  const myContext = useContext(AppContext);

  const checklike = async () => {
    await axios
      .get(`http://${URL.abc}/favourite/showlikes?token=${token}`, {
        headers: {
          investor_id: myContext.investor_id,
        },
      })
      .then(function (response) {
        setlikes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const total_likes = async () => {
    await axios
      .get(`http://${URL.abc}/favourite/countlikes?token=${token}`)
      .then(function (response) {
        setCountlikes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPosts();
    checklike();
    total_likes();
  }, []);

  useEffect(() => {
    if (myContext.investor_id) {
      checklike();
    }
  }, [myContext.investor_id]);

  const fetchPosts = () => {
    const apiURL = `http://${URL.abc}/Campaign/projectdetails?token=${token}`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setfilteredData(responseJson);
        setmasterData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.campaign_title
          ? item.campaign_title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(masterData);
      setsearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <Pressable
        style={{
          backgroundColor: "#003047",
          marginHorizontal: "7%",
          marginVertical: "2%",
          borderRadius: 25,
        }}
        android_ripple={{ borderless: false, color: "lightgrey" }}
        onPress={() => {
          navigation.navigate("Details", {
            title: item.campaign_title,
            data: item.campaign_image,
            disc: item.campaign_description,
            funded: Math.ceil(
              (item.campaign_earning / item.campaign_goal) * 100
            ),
            C_ID: item.campaigner_id,
            GOAL: item.campaign_goal,
            campaign_type: item.campaign_type,
            hours: item.hours,
            backed: item.backers,
            Name: item.campaigner_name,
            total: item.campaign_earning,
            campaign_id: item.campaign_id,
            A: countlikes.find((Item) =>
              Item.campaign_id === item.campaign_id ? Item.all_likes : null
            ),
            isLiked: likes.find((Item) =>
              Item.campaign_id === item.campaign_id ? true : false
            ),
            isbacked: true,
          });
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{ justifyContent: "center", marginLeft: "2%", width: "30%" }}
          >
            <Image
              style={{
                height: "80%",
                width: "100%",
                borderRadius: 20,
              }}
              source={{ uri: item.campaign_image }}
            />
          </View>
          <View>
            <Text style={styles.itemStyle}>
              {"Product Name : " +
                item.campaign_title.toUpperCase().slice(0, 15) +
                "..." +
                "\n\n"}
              {"Description : "}
              {item.campaign_description.length < 20
                ? item.campaign_description
                : item.campaign_description.slice(0, 20) + "..."}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };
  const ListFooter = () => {
    return <View style={styles.headerFooterStyle}></View>;
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: "10%" }}>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <Image
            source={require("../assets/Search.png")}
            style={styles.imageStyle}
          />
          <TextInput
            style={{ flex: 1 }}
            value={search}
            placeholder=" Search Here"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(Item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          maxToRenderPerBatch={5}
          ListFooterComponent={ListFooter}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: "10%",
    color: "white",
    fontSize: 10,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
    flex: 1,
  },
  headerFooterStyle: {
    width: "100%",
    height: 45,
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    borderWidth: 0.5,
    borderColor: "#dcdcdc",
    height: 40,
    borderRadius: 10,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    alignItems: "center",
    backgroundColor: "#dcdcdc",
  },
});
export default Search_Screen;
