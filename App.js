import * as React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./Screens/LoginScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import LoginScreen2 from "./Screens/LoginScreen2";
import firebase from 'firebase/compat/app';
import {firebaseConfig} from "./config"
import { LogBox } from 'react-native';
import Logout from "./Screens/Logout";

const AppSwitchNavigator = createSwitchNavigator({
  //apodo: componenete
  LoadingScreen: LoadingScreen,
  LoginScreen2: LoginScreen2,
  DashboardScreen: DashboardScreen,
  
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

LogBox.ignoreAllLogs();

export default function App() {
  return (
     <AppNavigator/>
  );
}

