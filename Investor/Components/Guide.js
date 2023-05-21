import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import Faqs from "./Faqs";

const Guide = () => {
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text style={styles.header}>FAQ's</Text>
      </View>

      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <Faqs title={"How do I start a project?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              Anyone that meets our requirements is eligible to launch a project
              on Elevate Crowd-Funding Application...
            </Text>
          </View>
        </Faqs>

        <Faqs title={"How do I pledge?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              Congratulations on finding a project that you’d like to support!
              Before we start, make sure that you’re logged in to Elevate
              Crowd-Funding account. If you don’t have one yet, you can sign up
              for one here. Go to the specific project’s page and click the
              button “Back this project” button to the right of the main image.
              If you don't want a reward but still want to support the project,
              select the "Pledge without a reward" tier at the top and enter
              your desired pledge amount.
            </Text>
          </View>
        </Faqs>

        <Faqs title={"How can I find interesting projects to back?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              There are a bunch of ways to find cool projects. We have several
              newsletters that you can sign up for to receive customized
              notifications about projects you care about. You can follow your
              favorite Elevate Crowd-Funding creators to see what projects they
              back, you will also be notified when they launch a new campaign.
            </Text>
          </View>
        </Faqs>

        <Faqs title={"What is the minimum amount I can pledget?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              The maximum amount you can pledge to a project varies based on a
              project's country of origin. It is also not possible for a project
              creator to set a reward tier higher than the maximum pledge amount
              allowed for their project’s location.
            </Text>
          </View>
        </Faqs>

        <Faqs title={"What’s my profile page, and what appears?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              When you create a Elevate Crowd-Funding account, a basic profile
              page is created for you. It displays your chosen account name, the
              date the account was created, a list of projects you have backed
              or launched, and whether you are a backer.
            </Text>
          </View>
        </Faqs>

        <Faqs title={"What happens if a project is delayed?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              We know that backing a project, and the anticipation of receiving
              your reward, can be exciting. It’s important to remember, however,
              that when you decide to pledge towards a project on Kickstarter
              you are not purchasing, or pre-ordering, an existing item—you are
              helping to create something new.
            </Text>
          </View>
        </Faqs>

        <Faqs title={"Projects must create something to share?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              Elevate Crowd-Funding can be used to create all sorts of things:
              art and gadgets, events and spaces, ideas and experiences.
            </Text>
          </View>
        </Faqs>

        <Faqs title={"The reward I received is not what I expected"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              Elevate Crowd-Funding is a place for creators to bring their
              creative ideas to life, and we do our best to give them the
              support and freedom necessary to do so. We expect creators to make
              every effort to complete their project as promised
            </Text>
          </View>
        </Faqs>

        <Faqs title={"What types of projects will be considered?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              Projects for cultural spaces, creative events, and
              brick-and-mortar stores providing services and experiences funded
              in Kickstarter’s fifteen creative categories. We will consider
              projects from restaurants, music venues, art/performance spaces,
              recording studios, movie theaters, galleries, game shops, creative
              conferences and festivals, and the like.
            </Text>
          </View>
        </Faqs>
        <Faqs title={"What types of project rewards?"}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Text style={{ fontSize: 14, color: "white" }}>
              These kinds of rewards are always prohibited on Kickstarter: Gift
              cards or vouchers with a cash equivalence Coupons or discounts on
              future purchases
            </Text>
          </View>
        </Faqs>
      </ScrollView>
    </View>
  );
};
export default Guide;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F6F6F6",
  },
  header: {
    paddingTop: "8%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  shadow1: {
    marginLeft: "5%",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
});
