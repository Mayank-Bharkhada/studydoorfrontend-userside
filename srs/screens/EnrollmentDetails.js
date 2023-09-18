import { StyleSheet, Text, View, StatusBar, ScrollView,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import Color from '../constant/Color';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import Links from '../constant/Links';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const EnrollmentDetails = ({ route, navigation }) => {

  // _id: item._id,
  // Institute_id: item.institute_id,
  // InstituteName: item.name,
  // CourseName: item.courseName,
  // Department: item.department,
  // Doe: item.dateOfEstablishment,
  // Address: item.address,
  // City: item.city,
  // State: item.state,
  // Country: item.country,
  // Pincode: item.pincode,
  // Number: item.number

  const { _id, Institute_id, CourseName, Department, UserName, UserUuid } = route.params;
  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [instituteData, setInstituteData] = useState(null)

  async function getValue() {
    try {
      setLoading(true);
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


        const instituteData = await fetch(`${Links.Domain}/api/User/institute_data_by_id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Institute_id: Institute_id })
        });

        const instituteDataJson = await instituteData.json();


        // console.log("instituteDataJson")
        // console.log(instituteDataJson)
        setInstituteData(instituteDataJson[0].data)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error retrieving value:', error);
    }
  }

  async function EnrollHandler() {
    setLoading(true);
    const enrollmentData = {
      Email: email,
      Institute_id: Institute_id,
      Course_id: _id,
      CourseName: CourseName,
      CourseDepartment: Department,
      UserName: UserName,
      UserUuid: UserUuid
    };

    try {
      const response = await fetch(`${Links.Domain}/api/User/Course_Enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(enrollmentData)
      });

      const responseData = await response.json();
      if (responseData[0].id === 1) {
        Alert.alert("Enrollment done successfully")
        navigation.goBack();
        console.log('Enrollment created successfully:', responseData);
        setLoading(false);
      } else {
        Alert.alert("Enrollment Unsuccessfull")
        console.log('Enrollment Unsuccessfull:', responseData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error creating enrollment:', error);
    }
  }


  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
 getValue();
    }
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      // showMessageForTwoSeconds()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();

  }, [])

  console.log(instituteData)
  return (
    <View style={{ justifyContent: "center", alignItems: "center", margin: "10%" }}>
      {loading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "60%" }}
        />
      ) :
        (
          <>
            <ScrollView style={{ width: '100%' }}>

              
        <Image  source={{ uri: `${instituteData.profilePhoto}` }} style={{ alignSelf:"center", width: 150, height: 150, margin: 10}} />
              <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, overflow: 'hidden' }}>

                <View style={[styles.tableRow, { backgroundColor: Color.Color.topHeaderBackground }]}>
                  <View style={[styles.cell, { borderRightWidth: 1, borderColor: '#fff', paddingLeft: 10 }]}>
                    <Text style={{ color: "#fff", fontSize: 20, alignSelf: "center" }}>Title</Text>
                  </View>
                  <View style={[styles.cell, { paddingLeft: 10 }]}>
                    <Text style={{ color: "#fff", fontSize: 20, alignSelf: "center" }}>Details</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                    <Text>Name:</Text>
                  </View>
                  <View style={[styles.cell, { paddingLeft: 10 }]}>
                    <Text>{instituteData.name}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                    <Text>CourseName:</Text>
                  </View>
                  <View style={[styles.cell, { paddingLeft: 10 }]}>
                    <Text>{CourseName}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                    <Text>Date Of Establishment :</Text>
                  </View>
                  <View style={[styles.cell, { paddingLeft: 10 }]}>
                    <Text>{instituteData.dateOfEstablishment}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                    <Text>Number :</Text>
                  </View>
                  <View style={[styles.cell, { paddingLeft: 10 }]}>
                    <TouchableOpacity >
                      <Text>+91 {instituteData.number}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
       
                <View style={styles.tableRow}>
                  <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                    <Text>address :</Text>
                  </View>
                  <View style={[styles.cell, { paddingLeft: 10 }]}>
                    <Text>{instituteData.address},{instituteData.city},{instituteData.state},{instituteData.country} - {instituteData.pincode}</Text>
                  </View>
                </View>
              </View>


              <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground, borderRadius: 5,marginTop:20,alignItems:"center" }} onPress={() => { EnrollHandler(); }}>
                <Text style={{ color: 'white' }}>Enroll</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )
      }
    </View >
  )
}

export default EnrollmentDetails

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
