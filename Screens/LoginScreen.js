import React, { Component } from "react";
import { StyleSheet, View, Button, Text, StatusBar, SafeAreaView, Image, TouchableOpacity, Platform } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from 'firebase/compat/app';
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
//import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }


  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // No necesitamos reautorizar la conexión con Firebase. 
          return true;
        }
      }
    }
    return false;
  };

  //Encuentra el usuario en la base de datos
  onSignIn = googleUser => {
    // Necesitamos registrar un observador en la autorización de Firebase para asegurar que se inició la autorización.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      //Revisar si ya se hizo sesión en Firebase con el usuario correcto.  
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        //Construir credenciales de Firebas con el token de Google ID.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        //Iniciar sesión con la credencia de usuario de Google.  
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: "dark"
                })
                .then(function(snapshot) {});
            }
          })
          .catch(error => {
            //Lidiar con errores aquí.
            var errorCode = error.code;
            var errorMessage = error.message;
            // El email de la cuenta del usuario usado.
            var email = error.email;
            // El tipo de firebase.auth.AuthCredential que fue usado.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("El usuario ya hizo sesión en Firebase.");
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: "web",
        androidClientId:
        "699576917115-g32tnlv7mnqgj6q5rmuku29kfml41760.apps.googleusercontent.com",
        iosClientId:
          "699576917115-vi3dapgjnu47numbs3aht4vhl9vlfkc3.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };



  render() {

    if (!this.state.fontsLoaded) {
      return <Text>Cargando...</Text>
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.appIcon}
            ></Image>
            <Text style={styles.appTitleText}>{`Aplicación para narrar historias`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}
            >
              <Image
                source={require("../assets/google_icon.png")}
                style={styles.googleIcon}
              ></Image>
              <Text style={styles.googleText}>Inciar sesión con Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cloudContainer}>
            <Image
              source={require("../assets/cloud.png")}
              style={styles.cloudImage}
            ></Image>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: "contain"
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans"
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white"
  },
  googleIcon: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: "contain"
  },
  googleText: {
    color: "black",
    fontSize: RFValue(20),
    fontFamily: "Bubblegum-Sans"
  },
  cloudContainer: {
    flex: 0.3
  },
  cloudImage: {
    position: "absolute",
    width: "100%",
    resizeMode: "contain",
    bottom: RFValue(-5)
  }
});