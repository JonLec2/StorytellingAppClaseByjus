import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./Tabnavigator";
import StoryScreen from "../Screens/StoryScreen"

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Inicio" component={BottomTabNavigator} />
      <Stack.Screen name="PantalladeHistoria" component={StoryScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
