import { Alert, StyleSheet, Text, View, Image,Dimensions,ActivityIndicator,StatusBar,BackHandler } from 'react-native'
// import SecureStorage from 'react-native-secure-storage';
import React, { useEffect, useState } from 'react';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "@rneui/themed";
import { TouchableOpacity } from 'react-native';
import { color, set } from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import StudentLogin from './StudentLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gif from 'react-native-gif';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const setScreen = async() =>{
      try {
        const Type = await AsyncStorage.getItem("Type");
        console.log(Type);
        const Login = await AsyncStorage.getItem("Login");
        console.log(Login);
        const Email = await AsyncStorage.getItem("Email");
        console.log(Email);
        const Password = await AsyncStorage.getItem("Password");
        console.log(Password);
        if (Type !== null && Login !== null && Email !== null && Password !== null ) {
          console.log('Value retrieved successfully');
          if(Login === "1"){
            navigation.navigate("StudydoorMain");
        }}else{
        navigation.navigate("StudentLogin");
      }
    } catch (error) {
      console.log('Error retrieving value:', error);
      navigation.navigate("StudentLogin");
      }
  }



  useEffect(() => {
    setScreen();

      const backAction = () => {
        // Do something else instead of exiting the app
        BackHandler.exitApp();
        // closeModal(); // close a modal
        return true;
      };
  
      // getValue();
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();

  }, [])
  
    return (
       <>
      <StatusBar backgroundColor={Color.Color.topHeaderBackground} />  
        {loading ? (
    <>      

      <StatusBar backgroundColor={Color.Color.topHeaderBackground} />
       <ActivityIndicator
       size={50}
       color={Color.Color.bottomtabBackground}
       style={{ marginTop: "60%" }} />
       </>
     
    ) : (
      <>      
      <StatusBar backgroundColor={Color.Color.topHeaderBackground} />
      <ActivityIndicator
      size={50}
      color={Color.Color.bottomtabBackground}
      style={{ marginTop: "60%" }}
    />
    </>
    )}
      </>
    )
 
}

export default Login

const styles = StyleSheet.create({
  safeAreaViewContainer:{height:"100%",backgroundColor:"#fff",paddingBottom:10},
  QandAHeadingContainer: {
    width: 1000,
    height: 1000,
    marginTop: -750,
    // marginLeft:-5,
    alignSelf: "center",
    // borderRadius:1000,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: Color.Color.topHeaderBackground,
    paddingTop: 5,
  },
  mainContainer: {
    // width:1000,
    // height:1000,
    // marginTop:-800,
    // alignSelf:"center",
    // borderBottomRightRadius:1000,
    // borderBottomLeftRadius:1000,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    // paddingTop: 5,
  },
  logoContainer: {
    position: "absolute",
    bottom: 0,
    margin: 80,
    alignSelf: "center",
    fontSize: 30,
    color: "#000",
  },
  header: {
    margin: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    alignItems: "center"
  },
  inputContainer: {
    // backgroundColor:"#fff",
    margin: "10%",
    marginBottom: 30,
    padding: 0,
  },
  loginButton: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10 },
  loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  forgotButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
  forgotButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 }
})