import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from 'firebase/compat/app';
import {auth} from "../config"
import {onAuthStateChanged } from "firebase/auth";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    //si estas loggeando, para ver si esta registrado
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.props.navigation.navigate("DashboardScreen");
      } else {
        this.props.navigation.navigate("LoginScreen2");
        
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});