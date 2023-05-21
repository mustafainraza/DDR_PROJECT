import {
  View,
  Text,
  ImageBackground,
  Button,
  SafeAreaView,
} from "react-native";
import React from "react";
import AppButton from "../Components/ui/btn";

export default function Start({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/new.png")}
      resizeMode="contain"
      style={{ flex: 1, justifyContent: "center", backgroundColor: 'black' }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <AppButton name={navigation} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
