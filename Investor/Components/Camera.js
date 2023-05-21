import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import AppContext from "./forms/AppContext";
import axios from "axios";
import URL from "../config/env";
import { AuthContext } from "../store/auth-context";

export default function Cameraa({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const myContext = useContext(AppContext);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    myContext.setimageset(true);
    myContext.setPickedImagePath("data:image/jpg;base64,null");
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      myContext.setPickedImagePath(photo.base64);
      setCapturedPhoto(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const edit_image = async () => {
    await axios
      .patch(`http://${URL.abc}/profile/editprofile`, {
        image: myContext.pickedImagePath,
        token: token,
      })
      .then(function (response) {
        alert(response.data);
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {capturedPhoto ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: capturedPhoto }}
            style={{ width: "100%", height: "80%" }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#D6252E",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => setCapturedPhoto(null)}
          >
            <Text style={{ color: "white" }}>Retake Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#D6252E",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={edit_image}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.3,
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "#D6252E",
                padding: 5,
                borderRadius: 5,
                marginBottom: "5%",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.5,
                backgroundColor: "#D6252E",
                padding: 5,
                borderRadius: 5,
                //marginLeft: "40%",
                alignSelf: "flex-end",
                alignItems: "center",
                marginBottom: "5%",
              }}
              onPress={takePicture}
            >
              <Text style={{ fontSize: 18, color: "white" }}>
                {" "}
                Take Picture{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}
