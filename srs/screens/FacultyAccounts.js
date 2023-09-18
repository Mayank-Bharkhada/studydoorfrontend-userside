

import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View,ActivityIndicator,StatusBar  } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constant/Color'
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import Links from '../constant/Links';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '@rneui/base';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Picker } from '@react-native-picker/picker';

const FacultyAccounts = ({ navigation }) => {

  
  const [isLoading, setIsLoading] = useState(true);
  const [coursesData, setCoursesData] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [institute_id, setInstitute_id] = useState(null);

  const [email, setEmail] = useState("");

  const [emailErrorText, setEmailErrorText] = useState("#fff");

  const emailError = (Email) => {
    setEmail(Email);
    const Valid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    if (Valid.test(Email)) {
      setEmailErrorText("#fff");
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
    } else {
      setFullNameErrorText("red");
    }
  }
  const [courseErrorText, setcourseErrorText] = useState("#fff");
  const [course, setCourse] = useState('');

  const CourseError = (course) => {
    setCourse(course);
    const Valid = /^[a-zA-Z ]+$/
    if (Valid.test(course)) {
      setcourseErrorText("#fff");
    } else {
      setcourseErrorText("red");
    }
  }
  const [departmentErrorText, setDepartmentErrorText] = useState("#fff");
  const [department, setDepartment] = useState('');

  const DepartmentError = (department) => {
    setDepartment(department);
    const Valid = /^[a-zA-Z ]+$/
    if (Valid.test(department)) {
      setDepartmentErrorText("#fff");
    } else {
      setDepartmentErrorText("red");
    }
  }

  const [numberErrorText, setNumberErrorText] = useState("#fff");
  const [number, setNumber] = useState('');

  const numberError = (number) => {
    setNumber(number);
    const Valid = /^[6-9]\d{9}$/;
    if (Valid.test(number)) {
      setNumberErrorText("#fff");
    } else {
      setNumberErrorText("red");
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


  async function saveFacultyData() {
    try {

      setIsLoading(true);
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



        const response = await fetch(`${Links.Domain}//api/User/creaate_faculty_account`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            institute_id: institute_id,
            fullName: fullName,
            number: number,
            course: course,
            department: department,
            userName: RegisterChatValueForToken.chatUsername,
            userUuid: RegisterChatValueForToken.accessToken,
            email: email,
            password: password
          })
        });
        const json = await response.json();

        if (json[0].id === 1) {
          console.log('Saved faculty data:', json);
          Alert.alert("Faculty account created successfully");
        } else {
          console.log('Error saving faculty data:', json);
          Alert.alert("Error : please try again using differnt email and number ...");

        }
      }
      
    setIsLoading(false);
    } catch (error) {      
    setIsLoading(false);
    Alert.alert("Error : please try again using differnt email and number ...");
      console.error('Error saving faculty data:', error);
    }
  }





  const getValue = async () => {
    
    setIsLoading(true);
    try {
      const Type = await AsyncStorage.getItem("Type");
      console.log(Type);
      const Login = await AsyncStorage.getItem("Login");
      console.log(Login);
      const Email = await AsyncStorage.getItem("Email");
      console.log(Email);
      const Password = await AsyncStorage.getItem("Password");
      console.log(Password);
      if (Type !== null && Login !== null && Email !== null && Password !== null) {
        // setAccountType(Type);
        console.log("start");
        const data = {
          Email: Email,
        };
        const response = await fetch(`${Links.Domain}/api/User/Institute_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const responseJson = await response.json();
        // handle the response data here
        console.log(responseJson);

        setInstitute_id(responseJson._id);

        const instituteCourses = await fetch(`${Links.Domain}/api/User/course_data_by_institute_id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ InstituteId: responseJson._id })
        });
        const instituteCoursesJson = await instituteCourses.json();
        // handle the instituteCourses data here
        console.log(instituteCoursesJson);
        setCoursesData(instituteCoursesJson);
        // institute_id(responseJson[0].data);
        console.log('Value retrieved successfully');
        // setLoading(false);
      }
      
    setIsLoading(false);
    } catch (error) {
      
    setIsLoading(false);
      console.log('Error retrieving value:', error);
    }
  }


  console.log(email != "" && emailErrorText === "#fff" && number != "" && numberErrorText === "#fff" && fullName != "" && fullNameErrorText === "#fff" && department != "" && departmentErrorText === "#fff" && course != "" && courseErrorText === "#fff" && password != "" && passwordErrorText === "#fff" && passwordConfirm != "" && passwordConfirmErrorText === "#fff" && passwordConfirm === password)
  console.log(email != "" && emailErrorText === "#fff" && number != "" && numberErrorText === "#fff" && fullName != "" && fullNameErrorText === "#fff" && department != "" && departmentErrorText === "#fff" && course != "" && courseErrorText === "#fff" && password != "" && passwordErrorText === "#fff" && passwordConfirm != "" && passwordConfirmErrorText === "#fff" && passwordConfirm === password)

  console.log(email != "" && emailErrorText === "#fff" && number != "" && numberErrorText === "#fff" && fullName != "" && fullNameErrorText === "#fff" && department != "" && departmentErrorText === "#fff" && course != "" && courseErrorText === "#fff" && password != "" && passwordErrorText === "#fff" && passwordConfirm != "" && passwordConfirmErrorText === "#fff" && passwordConfirm === password)


  useEffect(() => {
    getValue();
    // getAllCourse();
    const backAction = () => {
      // Do something else instead of exiting the app

      navigation.goBack(); // navigate back to previous screen
      // closeModal(); // close a modal
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
    <View style={styles.header}>
                <View style={styles.headerContent}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>Studydoor</Text>
                </View>
              </View>
      {isLoading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "70%" }}
        />
      ) : (
        // const { spinnerVisibility } = this.state;
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>Studydoor</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View style={{ alignSelf: 'center', justifyContent: "center", paddingTop: 20 }}>
                  <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center" }}>
                    <Image source={require('../../assets/Institute.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                  </View>
                  <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700" }}>Institute</Text>
                </View>
                <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22, marginBottom: 20, color: Color.Color.topHeaderBackground }}>Create Account for Faculty</Text>

                <View>
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
                      errorMessage="Enter faculty number"
                      maxLength={10}
                    />
                    <Input
                      inputContainerStyle={{ borderBottomColor: "#000" }}
                      inputStyle={{ color: "#000", marginLeft: 20, }}
                      placeholder="Enter faculty name"
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




                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Department :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >
                        {coursesData && <Picker
                          selectedValue={department}
                          onValueChange={(itemValue, itemIndex) => { DepartmentError(itemValue) }}
                          mode={'dropdown'}
                        >
                          <Picker.Item label='Select a department' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          {coursesData.map((course) => (

                            <Picker.Item key={course._id} label={course.department} value={course.department} />
                          ))}
                        </Picker>}
                      </View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Course :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >
                        {coursesData && <Picker
                          selectedValue={course}
                          onValueChange={(itemValue, itemIndex) => { CourseError(itemValue) }}
                          mode={'dropdown'}
                        >
                          <Picker.Item label='Select a course' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          {coursesData.map((course) => (

                            <Picker.Item key={course._id} label={course.courseName} value={course.courseName} />
                          ))}
                        </Picker>}
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
                    <TouchableOpacity style={styles.loginButton} onPress={() => { saveFacultyData() }} disabled={!(email != "" && emailErrorText === "#fff" && number != "" && numberErrorText === "#fff" && fullName != "" && fullNameErrorText === "#fff" && department != "" && departmentErrorText === "#fff" && course != "" && courseErrorText === "#fff" && password != "" && passwordErrorText === "#fff" && passwordConfirm != "" && passwordConfirmErrorText === "#fff" && passwordConfirm === password)} >
                      <Text style={styles.loginButtonText}> Create </Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text style={{ color: "#000" }}>
                    Already have account ?
                  </Text >
                  <Text style={{ color: "#0247fe" }} onPress={() => { navigation.navigate("InstituteLogin") }} > Login account</Text>
                </View> */}
                  </View>


                </View>
              </View>
            </View>
          </ScrollView>


        </SafeAreaView>
      )
      }
    </>
  )

}



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Color.background,
    paddingTop: 80,
    height: "100%"
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    paddingTop: 20,
    width: "100%",
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Color.topHeaderBackground,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // width:"100%"
  },
  headerText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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

export default FacultyAccounts

