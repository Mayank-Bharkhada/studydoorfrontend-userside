import { Alert, StyleSheet, Text, View, Image,StatusBar,ActivityIndicator,BackHandler  } from 'react-native'
// import SecureStorage from 'react-native-secure-storage';
import React, { useState,useEffect } from 'react';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, ListItem } from "@rneui/themed";
import { TouchableOpacity } from 'react-native';
import { color, set } from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import Gif from 'react-native-gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';

const CreateAccountForInstitute = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const setButtonEnabled = () => {
    if (email != null && fullName != null && number != null && dateOfEstablishment != null && password != null && address != null && city != null && state != null && country != null && pincode != null) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }
  const [email, setEmail] = useState("");

  const [emailErrorText, setEmailErrorText] = useState("#fff");

  const emailError = (Email) => {
    setEmail(Email);
    const Valid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    if (Valid.test(Email)) {
      setEmailErrorText("#fff");
      setButtonEnabled();
    } else {
      setEmailErrorText("red");
    }
  }
  const [fullNameErrorText, setFullNameErrorText] = useState("#fff");
  const [fullName, setFullName] = useState('');

  const fullNameError = (fullName) => {
    setFullName(fullName);
    const Valid = /^[a-zA-Z ]+$/
    if (Valid.test(fullName)) {
      setFullNameErrorText("#fff");
      setButtonEnabled();
    } else {
      setFullNameErrorText("red");
    }
  }

  const [numberErrorText, setNumberErrorText] = useState("#fff");
  const [number, setNumber] = useState('');

  const numberError = (number) => {
    setNumber(number);
    const Valid = /^[6-9]\d{9}$/;
    if (Valid.test(number)) {
      setNumberErrorText("#fff");
      setButtonEnabled();
    } else {
      setNumberErrorText("red");
    }
  }

  const [addressErrorText, setAddressErrorText] = useState("#fff");
  const [address, setAddress] = useState('');

  const addressError = (address) => {
    setAddress(address);
    const Valid = /^[a-zA-Z0-9\s,'-]*$/;
    if (Valid.test(address)) {
      setAddressErrorText("#fff");
      setButtonEnabled();
    } else {
      setAddressErrorText("red");
    }
  }

  const [pincodeErrorText, setPincodeErrorText] = useState("#fff");
  const [pincode, setPincode] = useState('');

  const pincodeError = (Pincode) => {
    setPincode(Pincode);
    const Valid = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
    if (Valid.test(Pincode)) {
      setPincodeErrorText("#fff");
      setButtonEnabled();
    } else {
      setPincodeErrorText("red");
    }
  }

  const [passwordErrorText, setPasswordErrorText] = useState("#fff");
  const [password, setPassword] = useState('');
  const [fontSizeShow, setFontSizeShow] = useState(8);

  const passwordError = (passwordText) => {
    setPassword(passwordText);
    const Valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\w\d\s:])([^\s]){8,}$/;
    if (Valid.test(passwordText)) {
      setPasswordErrorText("#fff");
      setButtonEnabled();

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
      setButtonEnabled();
    } else {
      setPasswordConfirmErrorText("red");
    }
  }



  const [dateOfEstablishment, setDateOfEstablishment] = useState(new Date());
  const [dateOfEstablishmentShow, setDateOfEstablishmentShow] = useState();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      const date = new Date(selectedDate);
      const newDate = date.toISOString();

      setDateOfEstablishment(newDate);

      setButtonEnabled();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const finalDate = day + "-" + month + "-" + year
      setDateOfEstablishmentShow(finalDate);
      console.log('Selected date:', selectedDate);
    }
  };
  const showDatePicker = () => {
    setDateOfEstablishment(new Date(dateOfEstablishment));
    console.log(dateOfEstablishment);
    setButtonEnabled();
    setShowPicker(true);
  };

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');


  const createStudentAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Links.Domain}/api/User/Institute_Otp`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Phone: number,
        }),
      });
      const data = await response.json();
      console.log("data[0].Otp[0]");
      console.log(data);

      if (data[0].Otp[0]) {
        await AsyncStorage.setItem("Type", "Institute");
        await AsyncStorage.setItem("Login", "0");
        await AsyncStorage.setItem("Email", email);
        await AsyncStorage.setItem("Number", number);
        await AsyncStorage.setItem("FullName", fullName);
        await AsyncStorage.setItem("DateOfEstablishment", dateOfEstablishment);
        await AsyncStorage.setItem("Address", address);
        await AsyncStorage.setItem("Pincode", pincode);
        await AsyncStorage.setItem("City", city);
        await AsyncStorage.setItem("State", state);
        await AsyncStorage.setItem("Country", country);
        await AsyncStorage.setItem("Password", password);
        await AsyncStorage.setItem("Otp", `${data[0].Otp[1]}`);
        setLoading(false);
        Alert.alert("success");
        navigation.navigate("Otp");
      } else {
        setLoading(false);
        Alert.alert("Otp is not sent please try again later");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("There is some problem please try later");
      console.error(error);
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

  console.log(password);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.QandAHeadingContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../../assets/Logo.png')} /></View>
          </View>
          {loading ? (
            <View style={{height:500}}>
            <ActivityIndicator
            size={50}
            color={Color.Color.bottomtabBackground}
            style={{ marginTop: "60%" }}
          />
          </View>
          ) : (
            <View style={styles.mainContainer}>
              <View style={styles.inputContainer}>
                <Input
                  inputStyle={{ color: "#000", marginLeft: 20, }}
                  placeholder="Email"
                  leftIcon={
                    <Icon
                      name='email'
                      size={24}
                      color='#000'
                    />
                  }
                  style={styles.inputBox}
                  defaultValue={email}
                  onChangeText={(Value) => { emailError(Value) }}
                  autoCapitalize="none"
                  errorStyle={{ color: emailErrorText }}
                  errorMessage="Enter Valid Email Address"
                />
                <Input
                  inputContainerStyle={{ borderBottomColor: "#000" }}
                  inputStyle={{ color: "#000", marginLeft: 20, }}
                  placeholder="Contact number"
                  // placeholderTextColor={"#000"}
                  leftIcon={
                    <Icon
                      name='phone'
                      size={24}
                      color='#000'
                    />
                  }
                  defaultValue={number}
                  style={styles.inputBox}
                  onChangeText={(Value) => { numberError(Value) }}
                  autoCapitalize="none"
                  errorStyle={{ color: numberErrorText }}
                  errorMessage="Enter valid number don't use country code"
                  maxLength={10}
                />
                <Input
                  inputContainerStyle={{ borderBottomColor: "#000" }}
                  inputStyle={{ color: "#000", marginLeft: 20, }}
                  placeholder="Name of the university"
                  // placeholderTextColor={"#000"}
                  leftIcon={
                    <MaterialCommunityIcons
                      name='card-account-details'
                      size={24}
                      color='#000'
                    />
                  }
                  defaultValue={fullName}
                  style={styles.inputBox}
                  onChangeText={(Value) => { fullNameError(Value) }}
                  autoCapitalize="none"
                  errorStyle={{ color: fullNameErrorText }}
                  errorMessage="Name of the university only contail alphabats"
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <Input
                    inputContainerStyle={{ borderBottomColor: "#000" }}
                    inputStyle={{ color: "#000", marginLeft: 20, }}
                    placeholder="Date Of Establishment"
                    // placeholderTextColor={"#000"}
                    defaultValue={dateOfEstablishmentShow}
                    leftIcon={
                      <Icon
                        name='date-range'
                        size={24}
                        color='#000'
                      />
                    }
                    style={styles.inputBox}
                    //   disabled
                    editable={false}
                  />
                  {showPicker && (
                    <DateTimePicker
                      value={dateOfEstablishment}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                      theme={{ backgroundColor: Color.Color.bottomtabBackground, foregroundColor: 'black' }}
                    />
                  )}
                </TouchableOpacity>
                <Input
                  inputContainerStyle={{ borderBottomColor: "#000" }}
                  inputStyle={{ color: "#000", marginLeft: 20, }}
                  placeholder="Address"
                  // placeholderTextColor={"#000"}
                  leftIcon={
                    <MaterialCommunityIcons
                      name='card-account-details'
                      size={24}
                      color='#000'
                    />
                  }
                  defaultValue={address}
                  style={styles.inputBox}
                  onChangeText={(Value) => { addressError(Value) }}
                  autoCapitalize="none"
                  errorStyle={{ color: addressErrorText }}
                  errorMessage="Enter Valid address"
                />
                <Input
                  inputContainerStyle={{ borderBottomColor: "#000" }}
                  inputStyle={{ color: "#000", marginLeft: 20, }}
                  placeholder="Pincode"
                  // placeholderTextColor={"#000"}
                  leftIcon={
                    <Icon
                      name='location-pin'
                      size={24}
                      color='#000'
                    />
                  }
                  defaultValue={pincode}
                  style={styles.inputBox}
                  onChangeText={(Value) => { pincodeError(Value) }}
                  autoCapitalize="none"
                  errorStyle={{ color: pincodeErrorText }}
                  errorMessage="Enter valid pioncode"
                  maxLength={6}
                />

                <View style={styles.pickerContainerOutside}>
                  <View style={styles.pickerContainerInside}>
                    <Icon
                      name='my-location'
                      size={24}
                      color='#000'
                    />
                    <Picker
                      selectedValue={city}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        setCity(itemValue);
                        setButtonEnabled();
                      }}
                    >
                      <Picker.Item label="Select a City" value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                      <Picker.Item label="Ahemdabad" value="Ahemdabad" />
                      <Picker.Item label="Mumbai" value="Mumbai" />
                      <Picker.Item label="Rajot" value="Rajkot" />
                      <Picker.Item label="Surat" value="Surat" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.pickerContainerOutside}>
                  <View style={styles.pickerContainerInside}>
                    <Icon
                      name='my-location'
                      size={24}
                      color='#000'
                    />
                    <Picker
                      selectedValue={state}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        setState(itemValue);
                        setButtonEnabled();
                      }}
                    >
                      <Picker.Item label="Select a State" value={null} style={{ color: '#666', opacity: 0.5 }} enabled={false} />
                      <Picker.Item label="Gujarat" value="Gujarat" />
                      <Picker.Item label="Maharashtra" value="Maharastra" />
                      <Picker.Item label="Punjab" value="Punjab" />
                      <Picker.Item label="Delhi" value="Delhi" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.pickerContainerOutside}>
                  <View style={styles.pickerContainerInside}>
                    <Icon
                      name='my-location'
                      size={24}
                      color='#000'
                    />
                    <Picker
                      selectedValue={country}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        setCountry(itemValue);
                        setButtonEnabled();
                      }}
                    >
                      <Picker.Item label="Select a Country" value={null} style={{ color: '#666', opacity: 0.5 }} enabled={false} />
                      <Picker.Item label="India" value="India" />
                      <Picker.Item label="USA" value="USA" />
                      <Picker.Item label="UK" value="UK" />
                      <Picker.Item label="CANADA" value="CANADA" />
                    </Picker>
                  </View>
                </View>


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
                  defaultValue={password}
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
                <TouchableOpacity style={styles.loginButton} onPress={() => { createStudentAccount() }} disabled={!isEnabled && email != null && fullName != null && number != null && dateOfEstablishment != null && password != null && address != null && city != null && state != null && country != null && pincode != null} >
                  <Text style={styles.loginButtonText}> Sign Up </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text style={{ color: "#000" }}>
                    Already have account ?
                  </Text >
                  <Text style={{ color: "#0247fe" }} onPress={() => { navigation.navigate("InstituteLogin") }} > Login account</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default CreateAccountForInstitute

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
  loginButton: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginVertical: 15 },
  loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  forgotButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
  forgotButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  pickerContainerOutside: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 25
  },
  pickerContainerInside: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    // borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // margin: 10,   
  },
  pickerIcon: {
    marginRight: 10
  },
  picker: {
    flex: 1,
    marginLeft: 15,
    // opacity: 
  }
})
