import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AuthContent from "../Components/forms/AuthContent";
import { createUser } from "../utils/auth";
import { useState, useContext } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../Components/ui/LoadingOverlay";

const Signup = () => {
  const [isAuthentication, setAuthentication] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password, name, CNIC, contactno }) {
    setAuthentication(true);
    try {
      const token = await createUser({
        email,
        password,
        name,
        CNIC,
        contactno,
      });
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Sign Up Failed", error.response.data);
      setAuthentication(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Creating User ..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
};

export default Signup;

const styles = StyleSheet.create({});
