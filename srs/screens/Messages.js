import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, PermissionsAndroid, FlatList, Alert, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constant/Color'
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';

import { useIsFocused } from '@react-navigation/native';
import RNFS from 'react-native-fs';



// import { createStackNavigator } from '@react-navigation/stack';

// const HomeStack = createStackNavigator();

const Messages = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
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
  const [accType, setAccType] = useState(null)

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

          const instituteData = await fetch(`${Links.Domain}/api/User/institute_data_by_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Institute_id: enrollmentDataJson[0].data.institute_id })
          });

          const instituteDataJson = await instituteData.json();

          if (instituteDataJson[0].id === 0) {

            setInstituteData(null)
          } else {

            // console.log("getting")

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


          if (facultyDataJson[0].data.length > 0) {
            setFacultyData(facultyDataJson[0].data)
          } else {
            setFacultyData(null)

          }


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
          // handle the instituteId data here
          console.log("instituteIdJson")
          console.log(instituteIdJson._id)
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

          console.log("facultyDataJson")
          console.log(facultyDataJson)
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

          console.log("studentsDataJson");
          console.log(studentsDataJson);

          if (studentsDataJson[0].id === 0) {
            setStudentsData(null)
          } else {
            if (studentsDataJson[0].data.length > 0) {
              setStudentsData(studentsDataJson[0].data)
            } else {
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

          if (instituteDataJson[0].id === 0) {

            setInstituteData(null)
          } else {

            setInstituteData([instituteDataJson[0].data])
          }



          const studentsData = await fetch(`${Links.Domain}/api/User/getAllConfirmEnrollmentsByCourseAndDepartment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ institute_id: instituteIdJson.institute_id, course: instituteIdJson.course, department: instituteIdJson.department })
          });
          const studentsDataJson = await studentsData.json();


          console.log("getting")
          console.log(studentsDataJson[0].data)

          if (studentsDataJson[0].id === 0) {

            setStudentsData(null)
          } else {
            if (studentsDataJson[0].data.length > 0) {
              setStudentsData(studentsDataJson[0].data)
            } else {
              setStudentsData(null)
            }
          }



        }


        // setEmail(Email);
        // setAccountType(Type);
        console.log('Value retrieved successfully');
        // setLoading(false);

        setIsLoading(false);
      }
    } catch (error) {

      // setLoading(false);

      setIsLoading(false);
      Alert.alert("Error retrieving value")
      console.log('Error retrieving value:', error);
    }
  }

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


  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkStoragePermissions();
      getValue();
    }
  }, [isFocused]);


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


  const readFile = async (TsenderUserName, TsenderUuid, TtargetUserName, TargetName) => {
    const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/studydoor/chat`;
    const filePath = `${directoryPath}/${TtargetUserName}.txt`;
    try {
      const directoryExists = await RNFS.exists(directoryPath);

      if (directoryExists) {
        const fileExists = await RNFS.exists(filePath);

        console.log(fileExists);
        if (fileExists) {
          const data = await RNFS.readFile(filePath, 'utf8');
          console.log('File data:', data);
          navigation.navigate("Chats", { senderUserName: TsenderUserName, senderUuid: TsenderUuid, targetUserName: TtargetUserName, msgData: data, targetName :TargetName })
        } else {
          await RNFS.writeFile(filePath, JSON.stringify([{}]));
          console.log('File created:', filePath);
          navigation.navigate("Chats", { senderUserName: TsenderUserName, senderUuid: TsenderUuid, targetUserName: TtargetUserName, msgData: "[{}]", targetName :TargetName  })
          console.log('File does not exist:', filePath);
        }
      } else {
        await RNFS.mkdir(directoryPath);
        console.log('Directory created:', directoryPath);
        await RNFS.writeFile(filePath, JSON.stringify([{}]));
        console.log('File created:', filePath);
        navigation.navigate("Chats", { senderUserName: TsenderUserName, senderUuid: TsenderUuid, targetUserName: TtargetUserName, msgData: "[{}]", targetName :TargetName  })
        console.log('File does not exist:', filePath);
      }

    } catch (error) {
      console.log('Error reading file:', error);
      return 0;
    }
  };

  const renderStudentItem = ({ item }) => {

    console.log("item.UserName")
    console.log(item)
    return (
      <TouchableOpacity
        style={[styles.messageContainer]}
        onPress={() => {
          readFile(userName, userUuid, item.UserName, item.studentName)
        }}
      >
        {/* <Image style={styles.messageImageContainer}  source={require('../../assets/1.png')} /> */}
        <View style={[styles.messageImageContainer, { alignItems: "center", justifyContent: "center" }]} >

          <Image source={{ uri: `${item.studentProfilePic}` }} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 100 }} />
        </View>
        <View style={styles.messageTextContainer} >
          <Text style={styles.messageUserTitle}>{item.studentName}</Text>
          {/* <Text style={styles.messageUserDescription} >Kem chhe bro??</Text> */}
        </View>
        <View style={[styles.messageDateContainer, { alignItems: "center", justifyContent: "center" }]}>

          <Text style={[styles.messageDateTimeText, { color: "#fff", backgroundColor: Color.Color.topHeaderBackground, fontSize: 20, padding: 7, borderRadius: 5 }]} >Chat</Text>
          {/* <Text style={styles.messageDateTimeText} >1:20 AM</Text>
    <View style={styles.messageBatchContainer} >
      <Text style={styles.messageBatchTextContainer}>1</Text>
    </View> */}
        </View>

      </TouchableOpacity>
    );
  };

  const renderFacultyItem = ({ item }) => {


    return (
      <TouchableOpacity
        style={[styles.messageContainer]}
        onPress={() => {
          readFile(userName, userUuid, item.UserName, item.fullName)
        }}
      >
        {/* <Image style={styles.messageImageContainer}  source={require('../../assets/1.png')} /> */}
        <View style={[styles.messageImageContainer, { alignItems: "center", justifyContent: "center" }]} >

          <Image source={{ uri: `${item.profilePhoto}` }} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 100 }} />
        </View>
        <View style={styles.messageTextContainer} >
          <Text style={styles.messageUserTitle}>{item.fullName}</Text>
          {/* <Text style={styles.messageUserDescription} >Kem chhe bro??</Text> */}
        </View>
        <View style={[styles.messageDateContainer, { alignItems: "center", justifyContent: "center" }]}>

          <Text style={[styles.messageDateTimeText, { color: "#fff", backgroundColor: Color.Color.topHeaderBackground, fontSize: 20, padding: 7, borderRadius: 5 }]} >Chat</Text>
          {/* <Text style={styles.messageDateTimeText} >1:20 AM</Text>
    <View style={styles.messageBatchContainer} >
      <Text style={styles.messageBatchTextContainer}>1</Text>
    </View> */}
        </View>

      </TouchableOpacity>
    );
  };

  const renderInstituteItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={[styles.messageContainer]}
        onPress={() => {
          readFile(userName, userUuid, item.UserName, item.name)
        }}
      >
        {/* <Image style={styles.messageImageContainer}  source={require('../../assets/1.png')} /> */}
        <View style={[styles.messageImageContainer, { alignItems: "center", justifyContent: "center" }]} >

          <Image source={{ uri: `${item.profilePhoto}` }} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 100 }} />
        </View>
        <View style={styles.messageTextContainer} >
          <Text style={styles.messageUserTitle}>{item.name}</Text>
          {/* <Text style={styles.messageUserDescription} >Kem chhe bro??</Text> */}
        </View>
        <View style={[styles.messageDateContainer, { alignItems: "center", justifyContent: "center" }]}>

          <Text style={[styles.messageDateTimeText, { color: "#fff", backgroundColor: Color.Color.topHeaderBackground, fontSize: 20, padding: 7, borderRadius: 5 }]} >Chat</Text>
          {/* <Text style={styles.messageDateTimeText} >1:20 AM</Text>
    <View style={styles.messageBatchContainer} >
      <Text style={styles.messageBatchTextContainer}>1</Text>
    </View> */}
        </View>

      </TouchableOpacity>
    );
  };

  console.log("Data")
  console.log(instituteData);
  console.log(facultyData);
  console.log("Data")

  return (
    <SafeAreaView>
      <ScrollView>

        {accType === "Student" && (
          <>
            {instituteData && (
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleContainerText}>Enrolled Institute</Text>
                </View>
                <FlatList
                  data={instituteData}
                  renderItem={renderInstituteItem}
                  keyExtractor={(item) => item._id}
                />
              </>
            )}
            {facultyData && (
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleContainerText}>Faculties</Text>
                </View>
                <FlatList
                  data={facultyData}
                  renderItem={renderFacultyItem}
                  keyExtractor={(item) => item._id}
                />
              </>
            )}
            {
              isLoading ? (
                <ActivityIndicator
                  size={50}
                  color={Color.Color.bottomtabBackground}
                  style={{ marginTop: "60%" }}
                />
              ) :
            !instituteData && !facultyData && (
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: "50%" }}>
                <Text style={{ color: "red" }}>There are no people that you can get connected uploaded by the institute</Text>
              </View>
            )
            
            }
          </>
        )}
        {accType === "Institute" && (
          <>
            {facultyData && (
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleContainerText}>Faculties</Text>
                </View>
                <FlatList
                  data={facultyData}
                  renderItem={renderFacultyItem}
                  keyExtractor={(item) => item._id}
                />
              </>
            )}
            {studentsData && (
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleContainerText}>Students</Text>
                </View>
                <FlatList
                  data={studentsData}
                  renderItem={renderStudentItem}
                  keyExtractor={(item) => item._id}
                />
              </>
            )}
            {isLoading ? (
                <ActivityIndicator
                  size={50}
                  color={Color.Color.bottomtabBackground}
                  style={{ marginTop: "60%" }}
                />
              ) :
            !facultyData && !studentsData && (
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: "50%" }}>
                <Text style={{ color: "red" }}>You have no people to connect</Text>
              </View>
            )}
          </>
        )}
        {accType !== "Student" && accType !== "Institute" && (
          <>
            {instituteData && (
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleContainerText}>Institute</Text>
                </View>
                <FlatList
                  data={instituteData}
                  renderItem={renderInstituteItem}
                  keyExtractor={(item) => item._id}
                />
              </>
            )}
            {studentsData && (
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleContainerText}>Students</Text>
                </View>
                <FlatList
                  data={studentsData}
                  renderItem={renderStudentItem}
                  keyExtractor={(item) => item._id}
                />
              </>
            )}
            {isLoading ? (
                <ActivityIndicator
                  size={50}
                  color={Color.Color.bottomtabBackground}
                  style={{ marginTop: "60%" }}
                />
              ) :
            !instituteData && !studentsData && (
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: "50%" }}>
                <Text style={{ color: "red" }}>There are no people that you can get connected uploaded by the institute</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
  
}

export default Messages

const styles = StyleSheet.create({
  messageHeadingContainer: {
    width: "100%",
    backgroundColor: Color.Color.topHeaderBackground,
    paddingTop: 5,
  },
  messageContainer: {
    height: 60,
    margin: 10,
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
    borderWidth: 0.5
  },
  titleContainerText: {
    fontSize: 20,
    color: "#fff"
  }
})
