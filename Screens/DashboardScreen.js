import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "../navigations/DrawerNavigation"

export default function DashboardScreen() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}