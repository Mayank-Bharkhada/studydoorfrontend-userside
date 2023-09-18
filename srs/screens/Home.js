// import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, ActivityIndcator } from 'react-native';
// import React, { useState } from 'react';
// import Color from '../constant/Color';
// // import {
// //   LineChart,
// //   BarChart,
// //   PieChart,
// //   ProgressChart,
// //   ContributionGraph,
// //   StackedBarChart
// // } from "react-native-chart-kit";
// import { useNavigation } from '@react-navigation/native';
// import { useEffect } from 'react';
// import Gif from 'react-native-gif';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Input } from "@rneui/themed";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BackHandler } from 'react-native';
// import { ActivityIndicator } from 'react-native';
// import { TouchableOpacity } from 'react-native';

// const screenWidth = Dimensions.get("window").width;

// const Home = (props) => {
//   const [loading, setLoading] = useState(true);
//   const [acountType, setAccountType] = useState("");

//   async function getValue() {
//     try {
//       const Type = await AsyncStorage.getItem("Type");
//       console.log(Type);
//       const Login = await AsyncStorage.getItem("Login");
//       console.log(Login);
//       const Email = await AsyncStorage.getItem("Email");
//       console.log(Email);
//       const Password = await AsyncStorage.getItem("Password");
//       console.log(Password);
//       if (Type !== null && Login !== null && Email !== null && Password !== null ) {
//         setAccountType(Type);
//         console.log('Value retrieved successfully');
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log('Error retrieving value:', error);
//     }
//   }

//   const navigation = useNavigation();

//   const data2 = {
//     labels: ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"],
//     datasets: [
//       {
//         data: [20,50,100,70,170, 140],
//         color: (opacity = 1) => `rgba(0, 136, 88, ${opacity})`, // optional
//         strokeWidth: 2 // optional
//       }
//     ],
//     legend: ["Growth"] // optional
//   };
//   const chartConfig = {
//     backgroundGradientFrom: "#fff",
//     backgroundGradientFromOpacity: 0.07,
//     backgroundGradientTo: "#fff",
//     backgroundGradientToOpacity: 0.07,
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//     barPercentage: 0.5,
//     useShadowColorFromDataset: true // optional
//   };

//   const [showMessage, setShowMessage] = useState(false);

//   const showMessageForTwoSeconds = () => {
//     setShowMessage(true);

//     setTimeout(() => {
//       setShowMessage(false);
//     }, 1000);
//   };



//   useEffect(() => {
//   getValue();
//   const backAction = () => {
//     BackHandler.exitApp();
//     // showMessageForTwoSeconds()
//     return true;
//   };

//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     backAction
//   );


//   return () => backHandler.remove();

//   }, [])

//   return (
//     <>
//     {/* {showMessage && (
//         <View style={styles.containerMsg}>
//         <View style={styles.boxMsg}>
//           <Text style={styles.textMsg}>Press again to quit</Text>
//         </View>
//       </View>
//       )} */}
//     {loading ? (
//         <ActivityIndicator
//         size={50}
//         color={Color.Color.bottomtabBackground}
//         style={{ marginTop: "60%" }}
//       />
//     ) : 
//       acountType === "Student" ?
//       (
//     <View style={{ flex: 1, flexDirection: "row" }} >
//       <View style={{ flex: 2, position: "absolute", left: 0, top: 0, zIndex: -1,height:"100%",backgroundColor:`rgba(13, 136, 56, 0.03 )`}} >
//         <SafeAreaView>
//           <ScrollView>
//             <Text>Student</Text>
//             {/* <View>
//               <ProgressChart
//                 data={{
//                   labels: ["Focus", "Learning", "Q & A"], // optional
//                   data: [0.4, 0.6, 0.8]
//                 }}
//                 width={screenWidth}
//                 height={220}
//                 strokeWidth={13}
//                 radius={16}
//                 chartConfig={{
//                   backgroundGradientFrom: "#ffF",
//                   backgroundGradientFromOpacity: 0.07,
//                   backgroundGradientTo: "#fff",
//                   backgroundGradientToOpacity: 0.07,
//                   decimalPlaces: 2, // optional, defaults to 2dp
//                   color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
//                   labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
//                   style: {
//                     borderRadius: 16,
//                     opacity: 0.5,
//                   },
//                   propsForDots: {
//                     r: "6",
//                     strokeWidth: "2",
//                     stroke: "#218838"
//                   }
//                 }}
//                 style={{
//                   marginVertical: 0,
//                   borderRadius: 0,

//                 }}
//                 hideLegend={false}
//               />
//             </View>
//             <View>
//               <LineChart
//                 data={data2}
//                 width={screenWidth}
//                 height={250}
//                 chartConfig={chartConfig}
//                 bezier
//               />
//             </View>
//      */}
//           </ScrollView>
//         </SafeAreaView>
//       </View>
//     </View>
//     ) :
//     acountType === "Institute" ?
//       (

//     <View style={{ flex: 1, flexDirection: "row" }} >
//       <View style={{ flex: 2, position: "absolute", left: 0, top: 0, zIndex: -1,height:"100%",backgroundColor:`rgba(13, 136, 56, 0.03 )`}} >
//         <SafeAreaView>
//           <ScrollView>
//          <Text>Institute</Text>
//             {/* <View>
//               <ProgressChart
//                 data={{
//                   labels: ["Focus", "Learning", "Q & A"], // optional
//                   data: [0.4, 0.6, 0.8]
//                 }}
//                 width={screenWidth}
//                 height={220}
//                 strokeWidth={13}
//                 radius={16}
//                 chartConfig={{
//                   backgroundGradientFrom: "#ffF",
//                   backgroundGradientFromOpacity: 0.07,
//                   backgroundGradientTo: "#fff",
//                   backgroundGradientToOpacity: 0.07,
//                   decimalPlaces: 2, // optional, defaults to 2dp
//                   color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
//                   labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
//                   style: {
//                     borderRadius: 16,
//                     opacity: 0.5,
//                   },
//                   propsForDots: {
//                     r: "6",
//                     strokeWidth: "2",
//                     stroke: "#218838"
//                   }
//                 }}
//                 style={{
//                   marginVertical: 0,
//                   borderRadius: 0,

//                 }}
//                 hideLegend={false}
//               />
//             </View> */}
//             {/* <View>
//               <LineChart
//                 data={data2}
//                 width={screenWidth}
//                 height={250}
//                 chartConfig={chartConfig}
//                 bezier
//               />
//             </View>
//      */}
//           </ScrollView>
//         </SafeAreaView>
//       </View>
//     </View>) :

// (

//   <View style={{ flex: 1, flexDirection: "row" }} >
//     <View style={{ flex: 2, position: "absolute", left: 0, top: 0, zIndex: -1,height:"100%",backgroundColor:`rgba(13, 136, 56, 0.03 )`}} >
//       <SafeAreaView>
//         <ScrollView>
//        <Text>Faculty</Text>
//           {/* <View>
//             <ProgressChart
//               data={{
//                 labels: ["Focus", "Learning", "Q & A"], // optional
//                 data: [0.4, 0.6, 0.8]
//               }}
//               width={screenWidth}
//               height={220}
//               strokeWidth={13}
//               radius={16}
//               chartConfig={{
//                 backgroundGradientFrom: "#ffF",
//                 backgroundGradientFromOpacity: 0.07,
//                 backgroundGradientTo: "#fff",
//                 backgroundGradientToOpacity: 0.07,
//                 decimalPlaces: 2, // optional, defaults to 2dp
//                 color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
//                 style: {
//                   borderRadius: 16,
//                   opacity: 0.5,
//                 },
//                 propsForDots: {
//                   r: "6",
//                   strokeWidth: "2",
//                   stroke: "#218838"
//                 }
//               }}
//               style={{
//                 marginVertical: 0,
//                 borderRadius: 0,

//               }}
//               hideLegend={false}
//             />
//           </View> */}
//           {/* <View>
//             <LineChart
//               data={data2}
//               width={screenWidth}
//               height={250}
//               chartConfig={chartConfig}
//               bezier
//             />
//           </View>
//    */}
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   </View>)
//   }


//     </>
//   )
// }

// export default Home


// const styles = StyleSheet.create({
//   // input: {
//   //   width: '80%',
//   //   height: 40,
//   //   marginVertical: 10,
//   //   borderWidth: 1,
//   //   borderColor: '#ccc',
//   //   padding: 10,
//   // },
//   // containerMsg: {
//   //   position:'absolute',
//   //   top:"45%",
//   //   left:"30%",
//   //   flex: 1,
//   //   alignItems: 'center',
//   //   // backgroundColor: 'black',
//   // },
//   // boxMsg: {
//   //   paddingHorizontal:30,
//   //   paddingVertical:10,
//   //   borderRadius:20,
//   //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   // },
//   // textMsg: {
//   //   // fontSize: 20,
//   //   color:"#fff",
//   //   // fontWeight: 'bold',
//   // },
// })


import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, PermissionsAndroid, FlatList, Clipboard, Alert, Linking, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constant/Color'
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';
import { useIsFocused } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// import { createStackNavigator } from '@react-navigation/stack';

// const HomeStack = createStackNavigator();

const Home = ({ }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [avgTestMarks, setAvgTestMarks] = useState(null);
  const [watchedVideoAverage, setWatchedVideoAverage] = useState(null);

  const updateSearch = (search) => {
    setSearch(search);
    console.log(search);
  };

  const searchItems = (search) => {
    console.log(search);
  };

  const searchClear = () => {
    setSearch("");
    console.log("1");
    console.log(search);
  };

  const [userName, setUserName] = useState(null)
  const [userUuid, setUserUuid] = useState(null)
  const [instituteData, setInstituteData] = useState(null)
  const [facultyData, setFacultyData] = useState(null)
  const [studentsData, setStudentsData] = useState(null)
  const [show, setShow] = useState(false)
  const [accType, setAccType] = useState(null)
  const [enrollmentData, setEnrollmetData] = useState(null)

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
        if (Type === "Student") {
          const StudentId = await fetch(`${Links.Domain}/api/User/Student_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });
          const StudentIdJson = await StudentId.json();
          // handle the StudentId data here
          console.log("StudentIdJson")
          console.log(StudentIdJson._id)
          console.log("StudentIdJson")
          setUserName(StudentIdJson.UserName);
          setUserUuid(StudentIdJson.UserUuid);
          console.log("/////////////user name and id//////////////////")
          console.log(StudentIdJson.UserName);
          console.log(StudentIdJson.UserUuid);

          const enrollmentData = await fetch(`${Links.Domain}/api/User/fetch_enrollment_data_by_student_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Student_id: StudentIdJson._id })
          });

          const enrollmentDataJson = await enrollmentData.json();

          console.log("enrollmentDataJson[0].data")
          console.log(enrollmentDataJson[0].data.institute_id)
          if (enrollmentDataJson[0].id === 1) {
            setEnrollmetData(enrollmentDataJson[0].data);

            console.log("enrollmentData[0].data")
            console.log(enrollmentDataJson[0].data)
            if (enrollmentDataJson[0].data.watchedVideos != null) {

              const totalVideos = await fetch(`${Links.Domain}/api/User/total_videos_by_institute_id_and_student_semester`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ instituteId: enrollmentDataJson[0].data.institute_id, semester: enrollmentDataJson[0].data.semester })
              });

              const totalVideosJson = await totalVideos.json();
              // console.log(enrollmentDataJson[0].data.watchedVideos.length)
              const totalWatchedVideos = enrollmentDataJson[0].data.watchedVideos.length;

              console.log("totalWatchedVideos")
              console.log(totalWatchedVideos)
              console.log("totalWatchedVideos")
              if (totalVideosJson.id === 1) {
                if (enrollmentDataJson[0].data.givenExam != null) {

                const totalVideosNew = totalVideosJson.totalVideos;
                console.log("totalVideosNew")
                console.log(totalVideosNew)
                console.log("totalVideosNew")

                
                
                const examResults = enrollmentDataJson[0].data.givenExam;
                let totalMarks = 0;
                examResults.forEach((result) => {
                  totalMarks += result.marks;
                });
                const averageMark = totalMarks / examResults.length;
                setAvgTestMarks(averageMark);
                // setEnrollData(enrollmentDataJson.data)
                if (totalVideosNew) {
                  setWatchedVideoAverage(totalWatchedVideos * 100 / totalVideosNew)
                } else {
                  setWatchedVideoAverage(100)
                }
              }
              }
              }
          }
          const instituteData = await fetch(`${Links.Domain}/api/User/institute_data_by_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Institute_id: enrollmentDataJson[0].data.institute_id })
          });

          const instituteDataJson = await instituteData.json();

          console.log("instituteData")
          console.log("--------------------")
          console.log(instituteData)
          console.log("----------------------")
          console.log("instituteData")
          if (instituteDataJson[0].id === 0) {
            setInstituteData(null);
          } else {

            setInstituteData([instituteDataJson[0].data])
          }



          const facultyData = await fetch(`${Links.Domain}/api/User/Faculty_data_by_institute_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ instituteID: enrollmentDataJson[0].data.institute_id })
          });

          const facultyDataJson = await facultyData.json();


          if (facultyDataJson[0].id === 0) {
            setFacultyData(null)
          } else {
            setFacultyData(facultyDataJson[0].data)
          }

          // console.log("/////////////faculty  data//////////////////")
          // console.log(facultyDataJson[0].data);

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
          // // handle the instituteId data here
          // console.log("instituteIdJson")
          // console.log(instituteIdJson._id)
          setUserName(instituteIdJson.UserName);
          setUserUuid(instituteIdJson.UserUuid);

          const facultyData = await fetch(`${Links.Domain}/api/User/Faculty_data_by_institute_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ instituteID: instituteIdJson._id })
          });
          const facultyDataJson = await facultyData.json();


          // console.log("facultyDataJson[0].data")
          // console.log(facultyDataJson)
          if (facultyDataJson[0].id === 1) {
            if (facultyDataJson[0].data.length > 0) {

              setFacultyData(facultyDataJson[0].data)
            } else {

              setFacultyData(null)
            }
          } else {
            setFacultyData(null)
          }

          const studentsData = await fetch(`${Links.Domain}/api/User/getAllConfirmEnrollments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ institute_id: instituteIdJson._id })
          });
          const studentsDataJson = await studentsData.json();


          if (studentsDataJson[0].id === 0) {
            setStudentsData(null)
          } else {
            if (studentsDataJson[0].data.length > 0) {
              setStudentsData(studentsDataJson[0].data)
            } else {
              console.log("false getting")
              setStudentsData(null)
            }
          }


        }
        if (Type === "Faculty") {

          const instituteId = await fetch(`${Links.Domain}/api/User/Faculty_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });
          const instituteIdJson = await instituteId.json();
          // handle the instituteId data here
          setUserName(instituteIdJson.UserName);
          setUserUuid(instituteIdJson.UserUuid);
          console.log("/////////////user name and id//////////////////")
          console.log(instituteIdJson.UserName);
          console.log(instituteIdJson.UserUuid);


          const instituteData = await fetch(`${Links.Domain}/api/User/institute_data_by_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Institute_id: instituteIdJson.institute_id })
          });

          const instituteDataJson = await instituteData.json();
          // console.log("///////////nstitute data/////////////");
          // console.log(instituteDataJson)

          if (instituteDataJson[0].id === 0) {
            setInstituteData(null);
          } else {

            setInstituteData([instituteDataJson[0].data])
          }
          // setInstituteData([instituteDataJson])

          // // handle the instituteId data here
          console.log("instituteIdJson")
          console.log(instituteIdJson.institute_id)
          console.log(instituteIdJson.course)
          console.log(instituteIdJson.department)



          const studentsData = await fetch(`${Links.Domain}/api/User/getAllConfirmEnrollmentsByCourseAndDepartment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ institute_id: instituteIdJson.institute_id, course: instituteIdJson.course, department: instituteIdJson.department })
          });

          const studentsDataJson = await studentsData.json();


          // console.log("getting")
          // console.log(studentsDataJson)
          if (studentsDataJson[0].id === 0) {
            setStudentsData(null)
          } else {
            if (studentsDataJson[0].data.length > 0) {
              setStudentsData(studentsDataJson[0].data)
            } else {
              setStudentsData(null)
            }
          }

          // setStudentsData(studentsDataJson[0].data)
          // console.log("///////////studunt data/////////////");
          // console.log(studentsDataJson[0].data)

        }


        // setEmail(Email);
        // setAccountType(Type);
        console.log('Value retrieved successfully');
        setIsLoading(false);
        // setLoading(false);
      }
    } catch (error) {

      // setLoading(false);
      setIsLoading(false);
      console.log('Error retrieving value:', error);
    }
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkStoragePermissions();
      getValue();
    }
  }, [isFocused]);

  async function checkStoragePermissions() {
    try {
      const readGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const writeGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (readGranted && writeGranted) {
        console.log('Read and write permissions granted!');
      } else {
        console.log('Read and write permissions not granted, requesting...');
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
          console.log('Read and write permissions granted!');
        } else {
          console.log('Read and write permissions denied!');
        }
      }
    } catch (error) {
      console.log('Error checking storage permissions:', error);
    }
  }


  useEffect(() => {

    if (isFocused) {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);


  const renderStudentItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={[styles.messageContainer, {
          borderBottomWidth: 0.5
        }]}
      // onPress={() => {

      //   const url = `whatsapp://send?phone=${item.number}&text="Enter Your Message here`;
      //   Linking.canOpenURL(url)
      //     .then((supported) => {
      //       if (supported) {
      //         return Linking.openURL(url);
      //       } else {
      //         Alert.alert("WhatsApp is not installed on this device.");
      //       }
      //     }
      //     )
      // }}
      >
        {/* <Image style={styles.messageImageContainer}  source={require('../../assets/1.png')} /> */}
        {/* <View style={[styles.messageImageContainer, { alignItems: "center", justifyContent: "center", backgroundColor: Color.Color.topHeaderBackground }]} > */}
        <Image source={{ uri: `${item.studentProfilePic}` }} style={{ width: 100, height: 100, marginRight: 10 }} />

        {/* </View> */}
        <View style={[styles.messageTextContainer]} >
          <Text style={styles.messageUserDescription}>Name : {item.studentName}</Text>
          <Text style={styles.messageUserDescription}>Number : {item.number}</Text>
          <Text style={styles.messageUserDescription} >Course :{item.courseName} </Text>
          <Text style={styles.messageUserDescription} >Description :{item.courseDepartment} </Text>
          {/* <Text style={styles.messageUserDescription} >Kem chhe bro??</Text> */}
        </View>


      </TouchableOpacity>
    );
  };

  const renderFacultyItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={[styles.messageContainer, {
          borderBottomWidth: 0.5
        }]}
      // onPress={() => {

      //   const url = `whatsapp://send?phone=${item.number}&text="Enter Your Message here`;
      //   Linking.canOpenURL(url)
      //     .then((supported) => {
      //       if (supported) {
      //         return Linking.openURL(url);
      //       } else {
      //         Alert.alert("WhatsApp is not installed on this device.");
      //       }
      //     })
      //     .catch((err) => console.error("Error opening WhatsApp: ", err));
      //   // Clipboard.setString("+91 " + item.number);

      //   // Clipboard.getString()
      //   //   .then((copiedText) => {
      //   //     Alert.alert(copiedText + " copied to clipboard");
      //   //   })
      //   //   .catch((err) => {
      //   //     Alert.alert("Error copying text: ", err);
      //   //   });

      // }}
      >
        {/* <Image style={styles.messageImageContainer}  source={require('../../assets/1.png')} /> */}
        {/* <View style={[styles.messageImageContainer, { alignItems: "center", justifyContent: "center", backgroundColor: Color.Color.topHeaderBackground }]} > */}
        <Image source={{ uri: `${item.profilePhoto}` }} style={{ width: 100, height: 100, marginRight: 10 }} />
        {/* </View> */}
        <View style={styles.messageTextContainer} >
          <Text style={styles.messageUserDescription}>Name : {item.fullName}</Text>
          <Text style={styles.messageUserDescription} >Number :{item.number} </Text>
          <Text style={styles.messageUserDescription} >Course :{item.course} </Text>
          <Text style={styles.messageUserDescription} >Description :{item.department} </Text>
        </View>


      </TouchableOpacity>
    );
  };

  const renderInstituteItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={[styles.messageContainer]}
      // onPress={() => {
      //   const url = `whatsapp://send?phone=${item.number}&text="Enter Your Message here`;
      //   Linking.canOpenURL(url)
      //     .then((supported) => {
      //       if (supported) {
      //         return Linking.openURL(url);
      //       } else {
      //         Alert.alert("WhatsApp is not installed on this device.");
      //       }
      //     }
      //     )

      //   // Clipboard.getString()
      //   //   .then((copiedText) => {
      //   //     Alert.alert(copiedText + " copied to clipboard");
      //   //   })
      //   //   .catch((err) => {
      //   //     Alert.alert("Error copying text: ", err);
      //   //   });
      //   // readFile(userName, userUuid, item.UserName)
      // }}
      >
        {/* <Image style={styles.messageImageContainer}  source={require('../../assets/1.png')} /> */}
        {/* <View style={[styles.messageImageContainer, { alignItems: "center", justifyContent: "center", backgroundColor: Color.Color.topHeaderBackground }]} > */}
        <Image source={{ uri: `${item.profilePhoto}` }} style={{ width: 100, height: 100, marginRight: 10 }} />
        {/* </View> */}
        <View style={styles.messageTextContainer} >
          <Text style={styles.messageUserDescription}>Name : {item.name}</Text>
          <Text style={styles.messageUserDescription}>Number : {item.number}</Text>
          <Text style={styles.messageUserDescription}>Address : {item.address},{item.city},{item.state},{item.country} - {item.pincode}</Text>

          {/* <Text style={styles.messageUserDescription} >Kem chhe bro??</Text> */}
        </View>



      </TouchableOpacity>
    );
  };


  // console.log("studentsData");
  // console.log(studentsData);
  // console.log("institute Data");
  // console.log(instituteData);
  return (
    <View style={{ height: "100%" }}>
      {isLoading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "60%" }}
        />
      ) : (
        // const { spinnerVisibility } = this.state;
        <View style={{ height: "100%" }}>
          <SafeAreaView>
            {/* <View style={styles.messageHeadingContainer}>
          <SearchBar
            placeholder="Search Here..."
            round
            containerStyle={{ margin: 20, marginBottom: 30, backgroundColor: Color.Color.topHeaderBackground, borderTopColor: Color.Color.bottomtabBackground, borderBottomColor: Color.Color.bottomtabBackground }}
            inputContainerStyle={{ height: 35, paddingVertical: 20, paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 25 }}
            // value={this.state.searchValue}
            searchIcon={() => <Icon name="search" size={27} onPress={() => searchItems(search)} color="#000" />}
            onChangeText={updateSearch}
            value={search}
            autoCorrect={false}
            clearIcon={() => <Icon name="clear" size={27} color="#000" onPress={() => searchClear()} />}
          />

        </View> */}

            <ScrollView>
              {
                accType === "Student"

                  ? (




                    instituteData !== null && facultyData !== null ? (
                      <View>

                        
                        <View style={{ flexDirection: "row", backgroundColor: Color.Color.topHeaderBackground }}>
                          <MaterialCommunityIcons
                            name='youtube'
                            size={24}
                            color='#fff'
                          />
                          <Text style={{ color: "#fff", padding: 5 }}>watched :  {enrollmentData.watchedVideos ? enrollmentData.watchedVideos.length : 0} -  Score :  {watchedVideoAverage ? watchedVideoAverage : 0}%</Text>
                        </View>
                        <View style={{ flexDirection: "row", backgroundColor: Color.Color.topHeaderBackground }}>
                          <MaterialCommunityIcons
                            name='cloud-question'
                            size={24}
                            color='#fff'
                          />
                          <Text style={{ width: "60%", color: "#fff", padding: 5, alignSelf: "flex-end" }}>Given :  {enrollmentData.givenExam ? enrollmentData.givenExam.length : 0} -  Score :  {avgTestMarks ? avgTestMarks : 0}%</Text>
                        </View>
                        {instituteData !== null &&
                          <>
                            <View style={styles.titleContainer}>
                              <Text style={styles.titleContainerText} >Enrolled Institute</Text>
                            </View>
                            <FlatList
                              data={instituteData}
                              renderItem={renderInstituteItem}
                              keyExtractor={(item) => item._id} />
                          </>
                        }
                        {
                          facultyData != null && <>

                            <View style={styles.titleContainer}>
                              <Text style={styles.titleContainerText} >Faculties - {facultyData.length}</Text>
                            </View>
                            <FlatList
                              data={facultyData}
                              renderItem={renderFacultyItem}
                              keyExtractor={(item) => item._id} />
                          </>
                        }
                      </View>
                    ) : (
                      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: "50%" }}>
                        <Text style={{ color: "#000" }}>
                          Haven't enroll to any course ??
                        </Text >
                        <Text style={{ color: "#0247fe" }} onPress={() => { navigation.navigate("Enrollment") }} > Enroll Courses</Text>
                      </View>
                    )

                  )
                  :
                  accType === "Institute"
                    ?
                    (

                      facultyData !== null || studentsData !== null ? (
                        <View>
                          {facultyData && <>
                            <View style={styles.titleContainer}>
                              <Text style={styles.titleContainerText} >Faculties - {facultyData.length}</Text>
                            </View>
                            <FlatList
                              data={facultyData}
                              renderItem={renderFacultyItem}
                              keyExtractor={(item) => item._id} />
                          </>
                          }
                          {studentsData &&
                            <><View style={styles.titleContainer}>
                              <Text style={styles.titleContainerText} >Students - {studentsData.length}</Text>
                            </View>
                              <FlatList
                                data={studentsData}
                                renderItem={renderStudentItem}
                                keyExtractor={(item) => item._id} />

                            </>}
                        </View>
                      ) : (
                        <View style={{ flexDirection: "column", alignSelf: "center", marginTop: "50%" }}>
                          <Text style={{ color: "red" }}  >Create courses Wait for Enrollments and
                          </Text>
                          <Text style={{ color: "red", alignSelf: "center" }}> tying to add some factulties</Text>
                        </View>
                      )

                    )
                    :
                    (

                      instituteData !== null || studentsData !== null ? (
                        <View>
                          {instituteData && <>
                            <View style={styles.titleContainer}>
                              <Text style={styles.titleContainerText} >Institute</Text>
                            </View>
                            <FlatList
                              data={instituteData}
                              renderItem={renderInstituteItem}
                              keyExtractor={(item) => item._id} />
                          </>
                          }
                          {studentsData && <>
                            <View style={styles.titleContainer}>
                              <Text style={styles.titleContainerText} >Students - {studentsData.length}</Text>
                            </View>
                            <FlatList
                              data={studentsData}
                              renderItem={renderStudentItem}
                              keyExtractor={(item) => item._id} />
                          </>
                          }
                        </View>
                      ) : (
                        <View style={{ flexDirection: "column", alignSelf: "center", marginTop: "50%" }}>
                          <Text style={{ color: "red" }}  >Ask institute to create courses and Wait for Enrollments
                          </Text>
                        </View>
                      )



                    )

              }
            </ScrollView>
          </SafeAreaView>
        </View>)}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  messageHeadingContainer: {
    width: "100%",
    backgroundColor: Color.Color.topHeaderBackground,
    paddingTop: 5,
  },
  messageContainer: {
    // height: 60,
    // margin: 10,
    flexDirection: "row",
  },
  messageImageContainer: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  messageTextContainer: {
    height: 60,
    // width: "65%",
    padding: 0,
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  messageDateContainer: {
    height: 60,
    padding: 0,
    marginLeft: "auto",
    alignContent: "center"
  },
  messageDateTimeText: {
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "center"
  },
  messageUserTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  messageUserDescription: {
    fontSize: 12,
    paddingHorizontal: 5
  },
  messageBatchContainer: {
    backgroundColor: Color.Color.topHeaderBackground,
    alignSelf: "center",
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  messageBatchTextContainer: {
    color: "#fff",
    fontSize: 10,
  },
  titleContainer: {
    backgroundColor: Color.Color.topHeaderBackground,
    alignItems: 'center',
    justifyContent: "center",
    paddingVertical: 10,
    // borderWidth: 0.5
  },
  titleContainerText: {
    fontSize: 20,
    color: "#fff"
  }
})
