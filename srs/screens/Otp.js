import { Alert, StyleSheet, Text, View, Image, ActivityIndicator,BackHandler } from 'react-native'
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
import StudentLogin from './StudentLogin';
import Gif from 'react-native-gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';

const Otp = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState(null);
  const [orignalOtp, setOrignalOtp] = useState(null);
  const [forgorPassword, setForgorPassword] = useState(null);
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  // console.log(password);
  const [number, setNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');


  async function getValue() {
    try {
      const typeValue = await AsyncStorage.getItem('Type');
      console.log(typeValue);
      setType(typeValue !== null ? typeValue : '');

      const emailValue = await AsyncStorage.getItem('Email');
      console.log(emailValue);
      setEmail(emailValue !== null ? emailValue : '');

      const loginValue = await AsyncStorage.getItem('Login');
      console.log(loginValue);
      setLogin(loginValue !== null ? loginValue : '');

      const passwordValue = await AsyncStorage.getItem('Password');
      console.log(passwordValue);
      setPassword(passwordValue !== null ? passwordValue : '');

      const numberValue = await AsyncStorage.getItem('Number');
      console.log(numberValue);
      setNumber(numberValue !== null ? numberValue : '');

      const fullNameValue = await AsyncStorage.getItem('FullName');
      console.log(fullNameValue);
      setFullName(fullNameValue !== null ? fullNameValue : '');

      let dateOfBirthValue = await AsyncStorage.getItem('DateOfBirth');
      if (dateOfBirthValue !== null) {
        console.log(dateOfBirthValue);
        setDateOfBirth(dateOfBirthValue);
      } else {
        dateOfBirthValue = await AsyncStorage.getItem('DateOfEstablishment');
        console.log(dateOfBirthValue);
        setDateOfBirth(dateOfBirthValue);
      }

      const addressValue = await AsyncStorage.getItem('Address');
      console.log(addressValue);
      setAddress(addressValue !== null ? addressValue : '');

      const pincodeValue = await AsyncStorage.getItem('Pincode');
      console.log(pincodeValue);
      setPincode(pincodeValue !== null ? pincodeValue : '');

      const cityValue = await AsyncStorage.getItem('City');
      console.log(cityValue);
      setCity(cityValue !== null ? cityValue : '');

      const stateValue = await AsyncStorage.getItem('State');
      console.log(stateValue);
      setState(stateValue !== null ? stateValue : '');

      const countryValue = await AsyncStorage.getItem('Country');
      console.log(countryValue);
      setCountry(countryValue !== null ? countryValue : '');

      const orignalOtpValue = await AsyncStorage.getItem("Otp");
      console.log(orignalOtpValue);
      setOrignalOtp(orignalOtpValue !== null ? orignalOtpValue : '');

      const ForgorPassword = await AsyncStorage.getItem("ForgotPassword");
      console.log(ForgorPassword);
      setForgorPassword(ForgorPassword !== null ? ForgorPassword : '');

      if (typeValue !== null && orignalOtpValue !== null && emailValue !== null && loginValue !== null && passwordValue !== null && numberValue !== null && fullNameValue !== null && dateOfBirthValue !== null && addressValue !== null && pincodeValue !== null && cityValue !== null && stateValue !== null && countryValue !== null) {
        console.log('All values retrieved successfully');
        console.log('Done');
        setLoading(false);
      } else if (emailValue !== null && ForgorPassword === "1") {
        console.log('Forgot Password Continue');
        setLoading(false);
      } else {
        console.log('no value retrive');
      }
    } catch (error) {
      console.log('Error retrieving value:', error);
    }
  }

  function generateRandomName() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';

    // Generate a string of random characters with the specified length
    for (let i = 0; i < length; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Make sure the string contains at least one uppercase letter, one lowercase letter, and one number
    if (!/[A-Z]/.test(name) || !/[a-z]/.test(name) || !/\d/.test(name)) {
      return generateRandomName(); // Try again if the string doesn't meet the requirements
    }

    return name;
  }

  

  const VarifyOTP = async () => {
    try {
      setLoading(true);
      if (enteredOtp === orignalOtp) {
          if (forgorPassword !== "1") {

   
          if (type === "Student") {

            const userName = generateRandomName();


            const RegisterChatOption = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userName: userName,
                chatPassword: password,
                ChatNickname: fullName.split(" ")[0],
              })
            };


            const RegisterChatData = await fetch(`${Links.AgoraTokenServerDomain}/register_token`, RegisterChatOption);


            const RegisterChatValue = await RegisterChatData.json();

            console.log(RegisterChatValue);
            if (RegisterChatValue.success == true) {
              const userName = RegisterChatValue.userName;
              const userUuid = RegisterChatValue.userUuid;


              const RegisterChatOptionForToken = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userName: userName,
                  userUuid: userUuid
                })
              };

              const RegisterChatDataForToken = await fetch(`${Links.AgoraTokenServerDomain}/login`, RegisterChatOptionForToken);


              const RegisterChatValueForToken = await RegisterChatDataForToken.json();



              const response = await fetch(`${Links.Domain}/api/User/Student_registration`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  Email: email,
                  Name: fullName,
                  Phone: number,
                  DateOfBirth: dateOfBirth,
                  Password: password,
                  Address: address,
                  City: city,
                  State: state,
                  Country: country,
                  Pincode: pincode,
                  userName: RegisterChatValueForToken.chatUsername,
                  userUuid: RegisterChatValueForToken.accessToken,
                }),
              });
              const data = await response.json();
              if (data[0].id === 1) {
                await AsyncStorage.setItem("Login", "1");
                navigation.navigate("StudydoorMain");
                console.log("getting");
                setLoading(false);
              } else {
                setLoading(false);
                Alert.alert("EMail or number is already being used");
              }
            } else {
              setLoading(false);
              Alert.alert("Error! Please try again later . . .");
            }
          } else {

            const userName = generateRandomName();


            const RegisterChatOption = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userName: userName,
                chatPassword: password,
                ChatNickname: fullName.split(" ")[0],
              })
            };


            const RegisterChatData = await fetch(`${Links.AgoraTokenServerDomain}/register_token`, RegisterChatOption);


            const RegisterChatValue = await RegisterChatData.json();

            if (RegisterChatValue.success == true) {
              const userName = RegisterChatValue.userName;
              const userUuid = RegisterChatValue.userUuid;

              const RegisterChatOptionForToken = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userName: userName,
                  userUuid: userUuid
                })
              };

              const RegisterChatDataForToken = await fetch(`${Links.AgoraTokenServerDomain}/login`, RegisterChatOptionForToken);


              const RegisterChatValueForToken = await RegisterChatDataForToken.json();



              const response = await fetch(`${Links.Domain}/api/User/Institute_registration`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  Email: email,
                  Name: fullName,
                  Phone: number,
                  DateOfEstablishment: dateOfBirth,
                  Password: password,
                  Address: address,
                  City: city,
                  State: state,
                  Country: country,
                  Pincode: pincode,
                  UserName: RegisterChatValueForToken.chatUsername,
                  UserUuid: RegisterChatValueForToken.accessToken,
                }),
              });
              const data = await response.json();
              console.log(data);
              console.log(data[0].id === 1);
              if (data[0].id === 1) {
                await AsyncStorage.setItem("Login", "1");
                setLoading(false);
                navigation.navigate("StudydoorMain");
              } else {
                setLoading(false);
                Alert.alert("Email or number is already being used");
              }
            } else {
              setLoading(false);
              Alert.alert("Error! Please try again later . . .");
            }
          }
        } else {
          navigation.navigate("ForgotSetPassword");
        }
        } else {
          setLoading(false);
          Alert.alert("Otp is not matched");
        }


    } catch (error) {
      setLoading(false);
      Alert.alert("Thereis some error");
      console.log("There is some error : ", error)
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
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
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
          <View style={[styles.inputContainer, { marginTop: "30%" }]}>
            <Input
              inputContainerStyle={{ borderBottomColor: "#000" }}
              inputStyle={{ color: "#000", marginLeft: 20, }}
              placeholder="Enter Your OTP Here"
              keyboardType='numeric'
              maxLength={6}
              placeholderTextColor={"#000"}
              leftIcon={
                <MaterialCommunityIcons
                  name='onepassword'
                  size={24}
                  color='#000'
                />
              }
              style={styles.inputBox}
              onChangeText={(value) => { setEnteredOtp(value); }}
            />
            <TouchableOpacity style={styles.loginButton} onPress={() => { VarifyOTP() }} >
              <Text style={styles.loginButtonText}> Varify </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

export default Otp

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
  loginButton: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10 },
  loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  forgotButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
  forgotButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 }
})
