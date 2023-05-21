import { View, Text, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import AuthContent from "../Components/forms/AuthContent";
import { loginUser } from "../utils/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../Components/ui/LoadingOverlay";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [isAuthentication, setAuthentication] = useState(false);
  async function loginHandler({ email, password }) {
    setAuthentication(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Login Failed", error.response.data);
      setAuthentication(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Loggin you in ..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default Login;

const styles = StyleSheet.create({});
