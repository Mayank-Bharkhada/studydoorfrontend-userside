import { StyleSheet, Text, View,StatusBar, Linking,ScrollView,Image  } from 'react-native'
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

const EnrollConfirm = ({ route, navigation }) => {

  const { Enroll_id, Student_id, Name, studentProfilePic, Course, courseDepartment } = route.params;
  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [studentData, setStudentData] = useState(null);

  console.log("Enroll_id");
  console.log(Student_id);
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
        const StudentId = await fetch(`${Links.Domain}/api/User/Student_data_by_id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ StudentId: Student_id })
        });
        const StudentIdJson = await StudentId.json();
        // handle the StudentId data here
        console.log("StudentIdJson");
        console.log(StudentIdJson);
        setStudentData(StudentIdJson)
        setAccountType(Type);
        setEmail(Email);
        console.log('Value retrieved successfully');
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error retrieving value:', error);
    }
  }

  async function EnrollConfirmHandler() {
    setLoading(true);
    const enrollmentData = {
      Enroll_id: Enroll_id
    };

    try {
      const response = await fetch(`${Links.Domain}/api/User/enroll_Confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(enrollmentData)
      });

      const responseData = await response.json();
      if (responseData[0].id === 1) {
        Alert.alert("Enrollment is confirmed")
        navigation.goBack();
        console.log('Enrollment is confirmed:', responseData);
        setLoading(false);
      } else {
        Alert.alert("Enrollment is not confirmed")
        console.log('Enrollment is not confirmedl:', responseData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error confirming enrollment:', error);
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

  return (
    <>
          {loading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "60%" }}
        />
      ) :
        (
              <ScrollView style={{width:"100%"}}>
                
          <View style={{height:"100%",width:"100%",alignItems:"center",justifyContent:"center",paddingVertical:10}}>
        <Image  source={{ uri: `${studentData.profilePhoto}` }} style={{ alignSelf:"center", width: 150, height: 150, margin: 10}} />
            <View style={{ width: '90%', borderWidth: 1, borderColor: 'gray', borderRadius: 10, overflow: 'hidden' }}>

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
                  <Text>Course:</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <Text>{Course}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                  <Text>Department:</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <Text>{courseDepartment}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                  <Text>Name:</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <Text>{studentData.name}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                  <Text>Number :</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <Text>+91 {studentData.phone}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                  <Text>DOB :</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <Text>{studentData.date}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                  <Text >officialTranscriptUrl :</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <TouchableOpacity onPress={() => {
                    Linking.openURL(studentData.officialTranscriptUrl);
                  }}>
                    <Text style={{color:"blue"}} >{studentData.officialTranscriptUrl}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>

                <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                  <Text>leavigCertificateUrl :</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <TouchableOpacity onPress={() => {
                    Linking.openURL(studentData.leavigCertificateUrl);
                  }}>
                    <Text style={{color:"blue"}} >{studentData.leavigCertificateUrl}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
                  <Text>governmentIssuedIdentificationUrl :</Text>
                </View>
                <View style={[styles.cell, { paddingLeft: 10 }]}>
                  <TouchableOpacity onPress={() => {
                    Linking.openURL(studentData.leavigCertificateUrl);
                  }}>
                    <Text style={{color:"blue"}} >{studentData.governmentIssuedIdentificationUrl}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground,width:"90%",marginTop:20, borderRadius:5}} onPress={() => { EnrollConfirmHandler(); }}>
              <Text style={{ color: 'white',alignSelf:"center" }}>Confirm</Text>
            </TouchableOpacity>
            </View>
      </ScrollView>
        )
      }
    </>
  )
}

export default EnrollConfirm

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
    paddingHorizontal:10
  },
})
