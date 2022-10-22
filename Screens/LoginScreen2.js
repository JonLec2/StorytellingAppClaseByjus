import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  Button,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar
} from "react-native";
import firebase from "firebase/compat/app";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import { ResponseType } from "expo-auth-session";
import { auth, db } from "../config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen2() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "699576917115-1k85gu0hj0id738orh5oi0l4ilon5qt7.apps.googleusercontent.com",
    iosClientId:
      "699576917115-vi3dapgjnu47numbs3aht4vhl9vlfkc3.apps.googleusercontent.com",
    androidClientId:
      "699576917115-g32tnlv7mnqgj6q5rmuku29kfml41760.apps.googleusercontent.com",
    webClientId:
      "699576917115-4mngu8lhb6qng424joa3qkef726j4neb.apps.googleusercontent.com",
      GrantType:  "implicit",
    responseType: "token id_token",
    codeChallengeMethod:  "S256",
    
  });

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  const [idtokeni, setidtokeni] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fontsLoaded, setfontsLoaded] = React.useState(false);

  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setfontsLoaded(true);
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Registered with:", user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  function getUserData(id) {
    let userInfoResponse = fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${id}` },
    });

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
    console.log(userInfo);
  }

  React.useEffect(() => {
    loadFontsAsync();

    if (response?.type === "success") {
    
      var { id_token } = response.params;
      console.log(accessToken)
      console.log(response);
      const credential = GoogleAuthProvider.credential(id_token);

      //console.log(auth, credential)
      signInWithCredential(auth, credential).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      // getUserData(id_token)
    }
  }, [response]);

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  if (!fontsLoaded) {
    return <Text>Cargando...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.appIcon}
          ></Image>
          <Text
            style={styles.appTitleText}
          >{`Aplicación para narrar historias`}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            disabled={!request}
            onPress={() => promptAsync()} >
            <Image
              source={require("../assets/google_icon.png")}
              style={styles.googleIcon}
            />
             <Text style={styles.googleText}>Inciar sesión con Google</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.boton2}
        ></TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },

  button: {
    backgroundColor: "grey",
  },

  imagenbutton: {
    width: 50,
    height: 50,
  },

  boton2: {
    width: 40,
    height: 40,
    backgroundColor: "green",
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
