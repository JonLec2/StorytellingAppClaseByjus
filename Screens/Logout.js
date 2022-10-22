import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from 'firebase/compat/app';
import { getAuth, signOut } from "firebase/auth";
import {auth} from '../config'

export default class Logout extends Component {
  componentDidMount() {
    signOut(auth).then(() => {
      console.log("Ingresaste")
    }).catch((error) => {
      // An error happened.
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Cerrar sesión</Text>
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