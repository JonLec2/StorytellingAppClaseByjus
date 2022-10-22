import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase/compat/app";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { color } from "react-native-reanimated";
import {db} from "../config"
import { getDatabase, ref, set } from "firebase/database";


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

image_1: require("../assets/story_image_1.png");

export default class CreatestoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      light_theme: true,
      dropdownHeight: 40,
      title: "",
      description: "",
      story: "",
      moral: "",
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  
  }

  async addStory() {
    if (
      this.state.title &&
      this.state.description &&
      this.state.story &&
      this.state.moral
    ) {
      let storyData = {
        preview_image: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        story: this.state.story,
        moral: this.state.moral,
        author: "Jonathan",
        created_on: new Date(),
        author_uid: "mksadksm",
        likes: 0,
      };

      set(ref(db, 'posts/' + Math.random().toString(36).slice(2)), {
        preview_image: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        story: this.state.story,
        moral: this.state.moral,
        author: "Jonathan",
        created_on: new Date(),
        author_uid: "mksadksm",
        likes: 0,
      }  )
      .then(() => {
        this.props.navigation.navigate("Indice")
      })

    //  await firebase
    //    .database()
    //    .ref("/posts/" + Math.random().toString(36).slice(2))
    //    .set(storyData)
    //    .then(function (snapshot) {});
    //  //this.props.setUpdateToTrue();
    //  this.props.navigation.navigate("Índice");
    } else {
      Alert.alert(
        "Error",
        "¡Se requieren todos los campos!",
        [{ text: "OK", onPress: () => console.log("OK presionado") }],
        { cancelable: false }
      );
    }
  }




  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: require("../assets/story_image_1.png"),
        image_2: require("../assets/story_image_2.png"),
        image_3: require("../assets/story_image_3.png"),
        image_4: require("../assets/story_image_4.png"),
        image_5: require("../assets/story_image_5.png"),
      };

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Nueva historia</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}
              ></Image>
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "Image 1", value: "image_1" },
                    { label: "Image 2", value: "image_2" },
                    { label: "Image 3", value: "image_3" },
                    { label: "Image 4", value: "image_4" },
                    { label: "Image 5", value: "image_5" },
                  ]}
                  defaultValue={this.state.previewImage}
                  placeholder="Image"
                  containerStyle={{
                    height: 40,
                    marginBottom: 10,
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                    console.log(this.state.dropdownHeight);
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  textStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                    textAlignVertical: "top",
                    padding: RFValue(5),
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#2f345d" }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      previewImage: item.value,
                    })
                  }
                />
              </View>

              <View>
                <TextInput
                  style={styles.inputFont}
                  onChangeText={(title) => this.setState({ title })}
                  placeholder={"Título"}
                  placeholderTextColor="white"
                />
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(description) => this.setState({ description })}
                  placeholder={"Descripción"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor="white"
                />
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(story) => this.setState({ story })}
                  placeholder={"Historia"}
                  multiline={true}
                  numberOfLines={10}
                  placeholderTextColor="white"
                />

                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                    { marginBottom: 20 },
                  ]}
                  onChangeText={(moral) => this.setState({ moral })}
                  placeholder={"Moraleja de la historia"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor="white"
                />
              </View>
              <View style={styles.submitButton}>
                <Button
                  onPress={() => this.addStory()}
                  title="Subir"
                  color="#841584"
                />
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },

  inputFont: {
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    marginBottom: RFValue(20),
    alignItems: "center",
    justifyContent: "center",
  },
});
