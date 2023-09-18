import { StyleSheet, Text, View,Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constant/Color'
import { TouchableOpacity } from 'react-native'
import { BackHandler } from 'react-native'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Links from '../constant/Links'
import { useIsFocused } from '@react-navigation/native';

const VarifyIdentity = ({navigation}) => { 
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [dataShow, setDataShow] = useState(false);
  const [mode, setMode] = useState("Unverified");


  async function getValue() {
    try {
      const Type = await AsyncStorage.getItem("Type");
      console.log("Type");
      console.log(Type);
      console.log("Type");
      const Login = await AsyncStorage.getItem("Login");
      console.log(Login);
      const Email = await AsyncStorage.getItem("Email");
      console.log(Email);
      const Password = await AsyncStorage.getItem("Password");
      console.log(Password);
      if (Type !== null && Login !== null && Email !== null && Password !== null ) {
        setAccountType(Type);
        setEmail(Email);
        // setPassword(Password);
    const settings = {
      method: 'Post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: Email,
      }),
    };
    let result;
    if(Type === "Student"){
      const fetchResponse = await fetch(`${Links.Domain}/api/User/Student_data`, settings);
      result = await fetchResponse.json();
      setData(result);
    }else{
      const fetchResponse = await fetch(`${Links.Domain}/api/User/Institute_data`, settings);
      result = await fetchResponse.json();
      setData(result);
    }
        console.log('Value retrieved successfully');
        console.log("data.varified");
    console.log(result);
    console.log("data.varified");
     if(result.verified === 0 && result.verificationRequest === 0){
       setMode("Unverified");
    }else if(result.verified === 0 && result.verificationRequest === 1){  
        setMode("Pending");
    }else{      
  navigation.navigate("StudydoorMain");
    }
    setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error retrieving value:', error);
    }
  }

  useEffect(() => {
    setLoading(true)
    if (isFocused) {
      getValue(); 
  }
    }, [isFocused])
    

    useEffect(() => {  
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
    <View style={{alignItems:'center',justifyContent:"center",height:"100%",backgroundColor:`rgba(13, 136, 56, 0.03 )`}}>
      {
        loading ? (
          <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "40%" }}
        />
      ) : 
        mode === "Unverified" ? (
          <>
          <Image
          source={require('../../assets/unverifiedBanner.png')}
          style={{ width: 700, height: 400, marginTop: -60}} />
          <Image
            source={require('../../assets/UnvarifiedAccount.png')}
            style={{ width: 350, height: 350, marginTop: -120 }} /><TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate("SubmitDocuments") } }>
              <Text style={styles.loginButtonText}> Submit Documents </Text>
            </TouchableOpacity><Text style={{ fontSize: 15, marginTop: 30, justifyContent: "space-around", color: "red" }}>*Your account is not verified yet</Text><Text style={{ fontSize: 15, marginTop: 0, justifyContent: "space-around", color: "red" }}>Submit document to verify your account</Text></>
        ):
        mode === "Pending" &&
        (
          <View style={{width:"100%"}}>
          <ScrollView>
          <Image
          source={require('../../assets/PendingBanner.png')}
          style={{alignSelf:"center", width: 700, height: 400, marginTop: -100}} />
          <Image
              source={require('../../assets/PandingAccount.png')}
              style={{ alignSelf:"center", width: 350, height: 350, marginTop: -100 }} /><Text style={{ fontSize: 15, marginTop: 30,alignSelf:"center", justifyContent: "space-around", color: "orange" }}>*Your have submitted document, please wait </Text><Text style={{ alignSelf:"center", fontSize: 15, marginTop: 0, marginBottom:30, justifyContent: "space-around", color: "orange" }}>It can take up to 3 business days</Text>
              </ScrollView>
              </View>  
        )
      }
    </View>
  )
}

export default VarifyIdentity

const styles = StyleSheet.create({
  loginButton: { backgroundColor: "red", borderRadius: 5, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, margin: 5,padding:10 },
  loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 20 },
})

