import { Alert, StyleSheet, Text, View, Image, ActivityIndicator,StatusBar,BackHandler  } from 'react-native'
// import SecureStorage from 'react-native-secure-storage';
import React, { useState,useEffect } from 'react';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "@rneui/themed";
import { TouchableOpacity } from 'react-native';
import { color, set } from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StudentLogin from './StudentLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';

const ForgotPassword = () => {
  
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
    
  const [emailErrorText, setEmailErrorText] = useState("#fff");
  
  const emailError = (Email) =>{
      setEmail(Email);
      const Valid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
      if(Valid.test(Email)){
          setEmailErrorText("#fff");
      }else{
          setEmailErrorText("red");
      }
  }

  const SendOtp = async () => {
    try {
      setLoading(true);
      console.log("Email : " + email)
    const response = await fetch(`${Links.Domain}/api/User/Forgot_Password_Otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log(responseJson[0].id);
    if(responseJson[0].id === 1 ){
      await AsyncStorage.setItem("ForgotPassword","1");
      await AsyncStorage.setItem("Email",email);
      await AsyncStorage.setItem("Otp",`${responseJson[0].Otp[1]}`);
      setLoading(false);
      navigation.navigate("Otp");
    }else{
      setLoading(false);
      Alert.alert("Unable to sent Otp");
    }
  } catch (error) {
    setLoading(false);
      console.log(error);
      Alert.alert("Error! try again later");
  }
  }
  
    useEffect(() => {
  
      const backAction = () => {
        // Do something else instead of exiting the app
        navigation.goBack(); // navigate back to previous screen
        // closeModal(); // close a modal
        return true;
      };
    
      // getValue();
    
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, []);

  return (
    <View style={{ backgroundColor: "#fff",height:"100%" }}>
        <View style={styles.QandAHeadingContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../../assets/Logo.png')} /></View>
        </View>
        {loading ? (
      <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "60%" }}
        />
    ) : (
        <View style={styles.mainContainer}>
          <View style={[styles.inputContainer, {marginTop:"30%"}]}>
            <Input
              inputContainerStyle={{ borderBottomColor: "#000" }}
              inputStyle={{ color: "#000", marginLeft: 20, }}
              placeholder="Email"
              leftIcon={
                <Icon
                name='email'
                size={24}
                color='#000'
                />
              }
              defaultValue={email}
              style={styles.inputBox}
              errorStyle={{ color: emailErrorText }}
              errorMessage="Enter Valid Email Address"
              onChangeText={(Value) => {emailError(Value); }}
              />
            <TouchableOpacity style={styles.loginButton} onPress={() => {SendOtp();}} disabled={email === '' || emailErrorText === 'red'}> 
              <Text style={styles.loginButtonText}> Next </Text>
            </TouchableOpacity>
          </View>

        </View>
    )}
      </View>
  )
}

export default ForgotPassword

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
loginButton: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10,marginTop:30 },
loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
forgotButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
forgotButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 }
})
