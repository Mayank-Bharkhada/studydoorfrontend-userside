import { Alert, StyleSheet, Text, View, Image,StatusBar,BackHandler, ScrollView   } from 'react-native'
// import SecureStorage from 'react-native-secure-storage';
import React, { useState, useEffect } from 'react';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "@rneui/themed";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const ChoiseForCreateAccount = () => {
  const navigation = useNavigation();
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
    <View style={{ backgroundColor: "#fff" }}>
    <View style={styles.QandAHeadingContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/Logo.png')} /></View>
    </View>
    <View style={styles.mainContainer}>
      <View style={[styles.inputContainer, {marginTop:"10%"}]}>
        <TouchableOpacity style={styles.Button} onPress={() => {navigation.navigate("CreateAccountForStudent")}}>
        <Image source={require('../../assets/Student.png')} style={[styles.image,{marginLeft:5}]} />
          <Text style={styles.ButtonText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => {navigation.navigate("CreateAccountForInstitute")}}>
        <Image source={require('../../assets/Institute.png')} style={styles.image} />
          <Text style={styles.ButtonText}>Institute</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

export default ChoiseForCreateAccount

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
  Button: { width:200, alignSelf:'center', padding:20,paddingTop:30, backgroundColor: Color.Color.topHeaderBackground, borderRadius: 20, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 20 },
  ButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  // Button: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
  // ButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  image:{
    alignSelf:'center'
  }
})
