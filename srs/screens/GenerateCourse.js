import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, Image, ActivityIndcator, Alert,StatusBar  } from 'react-native';
import React, { useState } from 'react';
import Color from '../constant/Color';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from "@rneui/themed";

import Links from '../constant/Links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';

const GenerateCourse = () => {
  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');

  async function getValue() {
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
        setAccountType(Type);
        setEmail(Email);
        console.log('Value retrieved successfully');
        setLoading(false);
      }
    } catch (error) {
      console.log('Error retrieving value:', error);
    }
  }

  const navigation = useNavigation();


  const GenerateCourseHandler = async () => {
    try {
      setLoading(true);
      const data = {
        courseName: courseName,
        department: department,
        Email: email,
      };
      const response = await fetch(`${Links.Domain}/api/User/Generate_course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseJson = await response.json();
      if (responseJson[0].id === 1) {
        setCourseName("");
        setDepartment("");
        setLoading(false);
        Alert.alert("The course is created sucessfully");
      } else {
        setLoading(false);
        Alert.alert("Course is not created please try again later");
      }
      // return responseJson;
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    getValue();
    const backAction = () => {
      BackHandler.goBack();
      // showMessageForTwoSeconds()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );


    return () => backHandler.remove();

  }, [])

  return (
    <View style={styles.container}>
      {/* <View style={[styles.QandAHeadingContainer,{overflow:'visible'}]}>
  <View style={[styles.logoContainer,{overflow:'visible'}]}>
    <Image style={styles.logo} source={require('../../assets/Logo.png')} />
    <View style={{position:'absolute',bottom:-140,alignSelf:'center',justifyContent:"center"}}>
    <View style={{backgroundColor:Color.Color.bottomtabBackground,width:80,height:80,borderRadius:100,elevation: 20,alignSelf:'center',justifyContent:"center"}}>
<Image source={require('../../assets/Institute.png')} style={{width:50,height:50,alignSelf:'center'}} />
    </View>
<Text style={{fontSize:22,color:Color.Color.bottomtabBackground,fontWeight:"700"}}>Institute</Text>
    </View>
    </View>
</View> */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Studydoor</Text>
        </View>
      </View>
      {/* {showMessage && (
        <View style={styles.containerMsg}>
        <View style={styles.boxMsg}>
          <Text style={styles.textMsg}>Press again to quit</Text>
        </View>
      </View>
      )} */}
      {loading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "30%" }}
        />
      ) :
       
          acountType === "Institute" ?
          (
            <SafeAreaView style={{ flexDirection: 'row' }}>
              <ScrollView>
                <View style={styles.inputContainer}>
                  <View style={{ alignSelf: 'center', justifyContent: "center" }}>
                    <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center" }}>
                      <Image source={require('../../assets/Institute.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                    </View>
                    <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700" }}>Institute</Text>
                  </View>
                  <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22, marginBottom: 20, color: Color.Color.topHeaderBackground }}>Generate Course</Text>
                  <Input
                    inputStyle={[styles.input, { color: "#000", marginLeft: 20, }]}
                    placeholder="Enter Course Name"
                    defaultValue={courseName}
                    leftIcon={
                      <Icon
                        name='wysiwyg'
                        size={24}
                        color='#000'
                      />
                    }
                    style={styles.inputBox}
                    onChangeText={(Value) => { setCourseName(Value) }}
                  // autoCapitalize="none"
                  // errorStyle={{ color: "emailErrorText" }}
                  // errorMessage="Enter Valid Email Address"
                  />
                  <Input
                    inputStyle={[styles.input, { color: "#000", marginLeft: 20, }]}
                    placeholder="Enter Department"
                    defaultValue={department}
                    leftIcon={
                      <MaterialCommunityIcons
                        name='format-list-text'
                        size={24}
                        color='#000'
                      />
                    }
                    style={styles.inputBox}
                    onChangeText={(Value) => { setDepartment(Value) }}
                  // autoCapitalize="none"
                  // errorStyle={{ color: "emailErrorText" }}
                  // errorMessage="Enter Valid Email Address"
                  />
                  <TouchableOpacity style={styles.button} onPress={GenerateCourseHandler} disabled={!courseName || !department}>
                    <Text style={styles.buttonText}>Generate Course</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
            ):(
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Text style={{ color: "red" }}  >Faculty can not create courses
              </Text>
            </View>
            )
      }


    </View>
  )
}

export default GenerateCourse

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
  },
  headerText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  inputContainer: {
    // backgroundColor:"#fff",
    margin: "10%",
    marginBottom: 30,
    padding: 0,
  },
  button: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, margin: 10 },
  buttonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
})
