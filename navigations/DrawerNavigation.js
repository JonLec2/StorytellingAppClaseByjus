import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./Tabnavigator";
import Profile from "../Screens/Profile"
import StackNavigator from "./StackNavigator";
import Logout from "../Screens/Logout";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Cerrar Sesión" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
