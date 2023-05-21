import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../store/auth-context";
import AppContext from "./forms/AppContext";
import URL from "../config/env";
import { showMessage } from "react-native-flash-message";

export default function Equity_Card(props) {
  const { campaign_id } = props;
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const myContext = useContext(AppContext);
  const stripe = useStripe();

  const navigation = useNavigation();

  const pay = async () => {
    try {
      if (props.Total_price < 200)
        return Alert.alert("You cannot donate below 200 Rupees");
      const response = await fetch(
        `http://${URL.abc}/payment/pay?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: props.Total_price, name: "Ali" }),
        }
      );
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Merchant Name",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      await axios
        .post(`http://${URL.abc}/Campaign/equity_investment?token=${token}`, {
          investor_id: myContext.investor_id,
          C_equity_id: props.equity_id,
          cid: campaign_id,
        })
        .then(function (response) {
          // Alert.alert("Payment Successful");
          showMessage({
            message: "Transaction Successfull",
            description: `Successfully Invested ${props.Total_price} Rs`,
            type: "success",
            duration: 1500,
          });
        })
        .catch(function (error) {
          console.log(error.msg);
        })
        .finally(() => {
          setTimeout(() => {
            navigation.goBack();
            navigation.goBack();
          }, 1000);
        });
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong,try again later");
    }
  };
  return (
    <StripeProvider publishableKey="pk_test_51MyMrzEBgz1Gk70hQ56CokGaRKkUYDWhV16OJlzsIYKxfdPgzEZBQ7FnQlClbQmRecpMBPXCR06bKjif93OfyyPd00cwV5DZYt">
      <View style={styles.card}>
        <View style={{ height: "100%" }}>
          <Text style={styles.title_style}>
            Equity In Percentage:
            <Text style={styles.body_style}>{"  " + props.percentage}%</Text>
          </Text>

          <Text style={styles.title_style}>
            Description:
            <Text style={styles.body_style}>{"  " + props.disc}</Text>
          </Text>

          <Text style={styles.title_style}>
            Total PRICE:
            <Text style={styles.text}>{"  " + props.Total_price}</Text>
          </Text>
          <Pressable
            android_ripple={{
              color: "lightgreen",
              borderless: false,
              radius: 95,
            }}
            style={styles.Pressable}
            onPress={() => {
              pay();
            }}
          >
            <Text style={styles.text}>SELECT</Text>
          </Pressable>
        </View>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  Pressable: {
    backgroundColor: "#D6252E",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    minHeight: "20%",
    height: "30%",
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontStyle: "italic",
  },
  card: {
    marginTop: "10%",
    marginBottom: "4%",
    flex: 1,
    backgroundColor: "#003047",
    alignSelf: "center",
    width: "80%",
    height: "70%",
    borderRadius: 20,
    padding: 10,
  },
  title_style: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
  },
  body_style: {
    fontWeight: "400",
    fontSize: 18,
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
  },
});
