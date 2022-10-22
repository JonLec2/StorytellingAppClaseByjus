import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreatestoryScreen from "../Screens/Createstory";
import FeedScreen from "../Screens/Feed";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet, Text, View } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconname;
          if (route.name === "Indice") {
            iconname = focused ? "book" : "book-outline";
          } else if (route.name === "Createstory") {
            iconname = focused ? "create" : "create-outline";
          }

          return (
            <Ionicons name={iconname} size={RFValue(25)} color={color} style={styles.icons}></Ionicons>
          );
        },
        //tabBarActiveTintColor: "tomato",
        //tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
        },
      })}
      activeColor={"#ee8249"}
      inactiveColor={"gray"}
    >
      <Tab.Screen name="Indice" component={FeedScreen} />
      <Tab.Screen name="Createstory" component={CreatestoryScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});

export default BottomTabNavigator;
