import { Alert, StyleSheet, Text, View, Image,StatusBar,BackHandler  } from 'react-native'
// import SecureStorage from 'react-native-secure-storage';
import React, { useEffect, useState } from 'react';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import Links from '../constant/Links';

const ForgotSetPassword = () => {
  
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState(null)
  
  const [passwordErrorText, setPasswordErrorText] = useState("#fff");
  const [password, setPassword] = useState('');
  const [fontSizeShow, setFontSizeShow] = useState(8);
  
  const getValue = async() => {
  const emailValue = await AsyncStorage.getItem('Email');
  // console.log(emailValue);
  setEmail(emailValue !== null ? emailValue : '');
  }
  console.log(email);
  console.log(password);
  const passwordError = (password) => {
    setPassword(password);
    const Valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\w\d\s:])([^\s]){8,}$/;
    if (Valid.test(password)) {
      setPasswordErrorText("#fff");
      setFontSizeShow(8);
    } else {
      setFontSizeShow(12);
      setPasswordErrorText("red");
    }
  }

  const [passwordConfirmErrorText, setPasswordConfirmErrorText] = useState("#fff");
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const passwordConfirmError = (passwordConfirm) => {
    setPasswordConfirm(passwordConfirm);
    if (passwordConfirm === password) {
      setPasswordConfirmErrorText("#fff");
    } else {
      setPasswordConfirmErrorText("red");
    }
  }

  const updatePassword = async() => {
    try {
    setLoading(true);
    const response = await fetch(`${Links.Domain}/api/User/Forgot_Password_Set`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data[0].id === 1) {
      console.log("hiiiiii");
      await AsyncStorage.clear();
      setLoading(false);
      navigation.navigate("StudentLogin");
    } else {
      setPassword(null);
      setPasswordConfirm(null);
      setLoading(false);
      Alert.alert("Can not update password try again later");
    }
  } catch (error) {
    setLoading(false);
    Alert.alert("Error! There are some error please try again later");
    console.log(error);
  }
  }



    useEffect(() => {
      getValue();
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
        <View style={[styles.inputContainer, { marginTop: "20%" }]}>
          <Input
            inputContainerStyle={{ borderBottomColor: "#000" }}
            inputStyle={{ color: "#000", marginLeft: 20, }}
            placeholder="Password"
            // placeholderTextColor={"#000"}
            leftIcon={
              <Icon
                name='lock-open'
                size={24}
                color='#000'
              />
            }
            secureTextEntry={true}
            // defaultValue={password}
            style={styles.inputBox}
            onChangeText={(Value) => { passwordError(Value) }}
            autoCapitalize="none"
            errorStyle={{ color: passwordErrorText, fontSize: fontSizeShow }}
            errorMessage="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          />
          <Input
            inputContainerStyle={{ borderBottomColor: "#000" }}
            inputStyle={{ color: "#000", marginLeft: 20, }}
            placeholder="Confirm Password"
            // placeholderTextColor={"#000"}
            leftIcon={
              <Icon
                name='lock-open'
                size={24}
                color='#000'
              />
            }
            secureTextEntry={true}
            style={styles.inputBox}
            onChangeText={(Value) => { passwordConfirmError(Value) }}
            autoCapitalize="none"
            errorStyle={{ color: passwordConfirmErrorText }}
            errorMessage="Confirm password and password both should be sameS"
          />
          <TouchableOpacity style={styles.loginButton} onPress={() => { updatePassword();}} disabled={password === '' || passwordConfirm === '' || passwordConfirmError === 'red' || passwordErrorText === 'red'} >
            <Text style={styles.loginButtonText}> Confirm </Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
    </View>
  )
}

export default ForgotSetPassword

const styles = StyleSheet.create({
  safeAreaViewContainer: { height: "100%", backgroundColor: "#fff", paddingBottom: 10 },
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
  loginButton: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10,marginTop:10 },
  loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  forgotButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
  forgotButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 }
})
