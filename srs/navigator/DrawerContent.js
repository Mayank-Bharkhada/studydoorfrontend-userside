import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../constant/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Links from '../constant/Links';
import DocumentPicker from 'react-native-document-picker';

const DrawerContent = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(null)
  const [accType, setAccType] = useState(null)
  const [studentData, setStudentData] = useState(null)
  const [instituteData, setInstituteData] = useState(null)
  const [facultyData, setFacultyData] = useState(null)
  const [email, setEmail] = useState(null)
  async function getValue() {
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
        setAccType(Type)
        setEmail(Email)

        if (Type === "Student") {
          const StudentId = await fetch(`${Links.Domain}/api/User/Student_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });
          const StudentIdJson = await StudentId.json();

          setStudentData(StudentIdJson);
          console.log("StudentIdJson");
          console.log(StudentIdJson);
        }

        if (Type === "Institute") {

          const instituteId = await fetch(`${Links.Domain}/api/User/Institute_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });
          const instituteIdJson = await instituteId.json();

          setInstituteData(instituteIdJson);
          


        }

        if (Type === "Faculty") {

          const facultyDAta = await fetch(`${Links.Domain}/api/User/Faculty_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });
          const facultyDAtaJson = await facultyDAta.json();

          setFacultyData(facultyDAtaJson);

        }

        console.log('Value retrieved successfully');
        setIsLoading(false);

      }
    } catch (error) {

      // setLoading(false);
      setIsLoading(false);
      console.log('Error retrieving value:', error);
    }
  }

  const pickProfilePicPicker = async () => {
    setIsLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      if(accType === "Student"){
        const formData = new FormData();

        formData.append('profilePic', {
          uri: result[0].uri,
          type: result[0].type,
          name: `${Date.now()}${result[0].name}`,
        });


        
        formData.append('Email', email);
        const response = await fetch(`${Links.Domain}/api/User/upload_profile_pic_for_student`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        const responseData = await response.json();
        console.log(responseData)
        if (responseData[0].id === 1) {
          setIsLoading(false);
          getValue();
        } else {
          setIsLoading(false);
          Alert.alert("there are some problem please try after some time")
        }

      }else if(accType === "Institute"){

        const formData = new FormData();
        formData.append('profilePic', {
          uri: result[0].uri,
          type: result[0].type,
          name: `${Date.now()}${result[0].name}`,
        });
        formData.append('Email', email);
        const response = await fetch(`${Links.Domain}/api/User/upload_profile_pic_for_institute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        const responseData = await response.json();
        console.log(responseData)
        if (responseData[0].id === 1) {
          // navigation.navigate("VarifyIdentity");

          setIsLoading(false);
          getValue();
        } else {
          setIsLoading(false);
          Alert.alert("there are some problem please try after some time")
        }
      }else{

        const formData = new FormData();
        formData.append('profilePic', {
          uri: result[0].uri,
          type: result[0].type,
          name: `${Date.now()}${result[0].name}`,
        });
        formData.append('Email', email);
        const response = await fetch(`${Links.Domain}/api/User/upload_profile_pic_for_faculty`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        const responseData = await response.json();
        // console.log("responseData")
        console.log(responseData)
        if (responseData[0].id === 1) {
          // navigation.navigate("VarifyIdentity");
// setFacultyData(responseData[0].data)
          setIsLoading(false);
          getValue();
        } else {
          setIsLoading(false);
          Alert.alert("there are some problem please try after some time")
        }
      }
      console.log(result)
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getValue()

    // return () => {
    //   second
    // }
  }, [])


  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage successfully cleared!');
      navigation.navigate("StudentLogin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: 150, backgroundColor: Color.Color.topHeaderBackground, borderWidth: 0.5, padding:5,paddingTop: 50 }}>
        {
          isLoading ?
          (
            <ActivityIndicator
            size={50}
            color={"#fff"}
            style={{ marginTop: "1%" }}
        />
          ):(
          accType === "Student" && studentData !== null ? (
              <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
              <View style={{ position: 'relative', borderRadius: 100 }}>
                <Image
                  source={{ uri: studentData.profilePhoto }}
                  style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: "#000" }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    // padding: 10,
                  }}
                  onPress={() => {pickProfilePicPicker()}}
                >
                  <MaterialCommunityIcons
                    name='plus-circle'
                    size={25}
                    color={Color.Color.topHeaderBackground}
                  />
                </TouchableOpacity>
              </View>
              {/* <Image source={{ uri: `https://studydoor.s3.amazonaws.com/1683652235449IMG-20211031-WA0014.jpg` }} style={{ width: 70, height: 70, marginRight: 10, borderRadius: 100 }} /> */}
              <View style={{ width: "70%", marginLeft: 10 }}>
                <Text style={{ color: "#fff", fontWeight: "400", fontSize: 10 }}>Name : {studentData.name}</Text>
                <Text style={{ color: "#fff", fontWeight: "400", fontSize: 10 }}>Email : {studentData.email}</Text>
              </View>
            </View>
          ) : accType === "Institute" && instituteData !== null ? (
            <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
              <View style={{ position: 'relative', borderRadius: 100 }}>
                <Image
                  source={{ uri: instituteData.profilePhoto }}
                  style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: "#000" }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    // padding: 10,
                  }}
                  onPress={() => {pickProfilePicPicker()}}
                >
                  <MaterialCommunityIcons
                    name='plus-circle'
                    size={25}
                    color={Color.Color.topHeaderBackground}
                  />
                </TouchableOpacity>
              </View>
              {/* <Image source={{ uri: `https://studydoor.s3.amazonaws.com/1683652235449IMG-20211031-WA0014.jpg` }} style={{ width: 70, height: 70, marginRight: 10, borderRadius: 100 }} /> */}
              <View style={{ width: "70%", marginLeft: 10 }}>
                <Text style={{ color: "#fff", fontWeight: "400", fontSize: 10 }}>Name : {instituteData.name}</Text>
                <Text style={{ color: "#fff", fontWeight: "400", fontSize: 10 }}>Email : {instituteData.email}</Text>
              </View>
            </View>
          ) : accType === "Faculty" && facultyData !== null ?(
            <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
              <View style={{ position: 'relative', borderRadius: 100 }}>
                <Image
                  source={{ uri: facultyData.profilePhoto }}
                  style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: "#000" }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#ffffff',
                    borderRadius: 20,
                    // padding: 10,
                  }}
                  onPress={() => {pickProfilePicPicker()}}
                >
                  <MaterialCommunityIcons
                    name='plus-circle'
                    size={25}
                    color={Color.Color.topHeaderBackground}
                  />
                </TouchableOpacity>
              </View>
              {/* <Image source={{ uri: `https://studydoor.s3.amazonaws.com/1683652235449IMG-20211031-WA0014.jpg` }} style={{ width: 70, height: 70, marginRight: 10, borderRadius: 100 }} /> */}
              <View style={{ width: "70%", marginLeft: 10 }}>
                <Text style={{ color: "#fff", fontWeight: "400", fontSize: 10 }}>Name : {facultyData.fullName}</Text>
                <Text style={{ color: "#fff", fontWeight: "400", fontSize: 10 }}>Email : {facultyData.email}</Text>
              </View>
            </View>
          ):(
            null
          )
          )
        }


      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            clearAsyncStorage();
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerContent;
