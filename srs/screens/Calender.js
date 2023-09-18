import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Linking,StatusBar,BackHandler  } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Dimensions } from 'react-native';
import Color from '../constant/Color';
import { Input } from "@rneui/themed";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';
import { SearchBar } from '@rneui/themed';
import { FlatList } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation } from '@react-navigation/native';
const Celender = () => {

const navigation = useNavigation();
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showExamDatePicker, setShowExamDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [examDate, setExamDate] = useState(new Date());
  const [isJoinLecForInstitute, setIsJoinLecForInstitute] = useState(false);
  const [isGenerateLecForInstitute, setIsGenerateLecForInstitute] = useState(false);
  const [lectureForInstituteData, setLectureForInstituteData] = useState(false);
  const [isChooseDesition, setIsChooseDesition] = useState(true);


  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    setStartTime(selectedTime);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    setEndTime(selectedTime);
  };

  const handleExamDateChange = (event, selectedDate) => {
    setShowExamDatePicker(false);
    setExamDate(selectedDate);
  };

  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [coursesData, setCoursesData] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [instituteId, setInstituteId] = useState('');
  const [StudentId, setStudentId] = useState('');
  const [lecturesData, setLecturesData] = useState();
  const [bookUri, setBookUri] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureDescription, setLectureDescription] = useState('');
  const [lectureUri, setlectureUri] = useState(null);
  const [lectureTitleErrorText, setLectureTitleErrorText] = useState('#000');

  const [bookTitle, setBookTitle] = useState();
  const [bookTitleErrorText, setBookTitleErrorText] = useState("#fff");
  const [filteredbooks, setFilteredbooks] = useState("");
  const [showlectureUrl, setShowlectureUrl] = useState(null);
  const [showlecture, setShowlecture] = useState(false);
  const [readBookUri, setReadBookUri] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isLectureLoading, setIsLectureLoading] = useState(true);

  const renderItem = ({ item }) => {

    const dateStringStartTime = item.startTime;
    const dateStringEndTime = item.endTime;
    const dateStringExamDate = item.examDate;
    const dateStartTime = new Date(dateStringStartTime);
    const dateEndTime = new Date(dateStringEndTime);
    const dateExamDate = new Date(dateStringExamDate);

    const hoursStartTime = dateStartTime.getHours();
    const minutesStartTime = dateStartTime.getMinutes();
    const hoursEndTime = dateEndTime.getHours();
    const minutesEndTime = dateEndTime.getMinutes();
    const month = dateExamDate.getMonth() + 1; // Returns a zero-based value (0 = January)
    const year = dateExamDate.getFullYear();
    const day = dateExamDate.getDate(); // Returns the day of the month (1-31)

    console.log("item")
    console.log(item)
    return (
      <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
        <View style={{ width: 70, borderRadius: 100, height: 70, marginRight: 10, backgroundColor: Color.Color.topHeaderBackground, alignItems: "center", justifyContent: "center" }}><Text style={{ color: "#fff" }}>{day}</Text></View>
        <View style={{ width: "60%" }}>
          <Text>Title: {item.title}</Text>
          <Text>Faculty Name: {item.description}</Text>
          <Text>Time: {hoursStartTime + ":" + minutesStartTime + ":" + "00"} TO {hoursEndTime + ":" + minutesEndTime + ":" + "00"}</Text>
          <Text>Date: {day + "/" + month + "/" + year}</Text>
        </View>

        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
          // navigation.navigate('lecturePlay', { lectureUrl: item.lectureUrl })
          navigation.navigate("JoinLecture", { ChannelName: item.ChannalName, ChannalToken: item.ChannalToken });
        }}>
          <Text style={{ color: 'white' }}>Join</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemForInstitute = ({ item }) => {

    console.log(item)
    const dateStringStartTime = item.startTime;
    const dateStringEndTime = item.endTime;
    const dateStringExamDate = item.examDate;
    const dateStartTime = new Date(dateStringStartTime);
    const dateEndTime = new Date(dateStringEndTime);
    const dateExamDate = new Date(dateStringExamDate);

    const hoursStartTime = dateStartTime.getHours();
    const minutesStartTime = dateStartTime.getMinutes();
    const hoursEndTime = dateEndTime.getHours();
    const minutesEndTime = dateEndTime.getMinutes();
    const month = dateExamDate.getMonth() + 1; // Returns a zero-based value (0 = January)
    const year = dateExamDate.getFullYear();
    const day = dateExamDate.getDate(); // Returns the day of the month (1-31)

    return (
      <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
        <View style={{ width: 70, borderRadius: 100, height: 70, marginRight: 10, backgroundColor: Color.Color.topHeaderBackground, alignItems: "center", justifyContent: "center" }}><Text style={{ color: "#fff" }}>{day}</Text></View>
        <View style={{ width: "60%" }}>
          <Text>Title: {item.title}</Text>
          <Text>Faculty Name: {item.description}</Text>
          <Text>Time: {hoursStartTime + ":" + minutesStartTime + ":" + "00"} TO {hoursEndTime + ":" + minutesEndTime + ":" + "00"}</Text>
          <Text>Date: {day + "/" + month + "/" + year}</Text>
        </View>

        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
          // navigation.navigate('lecturePlay', { lectureUrl: item.lectureUrl })
          navigation.navigate("JoinLecture", { ChannelName: item.ChannalName, ChannalToken: item.ChannalToken });
        }}>
          
          <Text style={{ color: 'white' }}>Join</Text>
        </TouchableOpacity>
      </View>
    );
  };


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
          setStudentId(StudentIdJson._id);
          console.log(StudentIdJson._id);


          const lectures = await fetch(`${Links.Domain}/api/User/fetch_all_lectures_by_users_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Student_id: StudentIdJson._id })
          });
          const lecturesJson = await lectures.json();
          // handle the lectures data here
          console.log("lecturesJson");
          console.log(lecturesJson);
          if(lecturesJson[0].id === 0){

            setLecturesData(null);
          }else{

            setLecturesData(lecturesJson[0].data);
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
          setInstituteId(instituteIdJson._id);
          const instituteCourses = await fetch(`${Links.Domain}/api/User/course_data_by_institute_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ InstituteId: instituteIdJson._id })
          });
          const instituteCoursesJson = await instituteCourses.json();
          // handle the instituteCourses data here

          console.log(instituteCoursesJson);
          setCoursesData(instituteCoursesJson);
          const instituteLecture = await fetch(`${Links.Domain}/api/User/lactures_data_by_institute_id_for_institute`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ InstituteId: instituteIdJson._id })
          });

          const instituteLectureJson = await instituteLecture.json();
          console.log("lactureDataForInstitute");
          console.log(instituteLectureJson[0].data.length > 0);
          if(instituteLectureJson[0].id === 0){
            setLectureForInstituteData(null);
          }else{
            if(instituteLectureJson[0].data.length > 0){
              setLectureForInstituteData(instituteLectureJson[0].data);
            }else{
              setLectureForInstituteData(null);

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
          setInstituteId(instituteIdJson.institute_id);
          console.log("instituteIdJson")
          console.log(instituteIdJson)
          console.log("instituteIdJson")
          const instituteCourses = await fetch(`${Links.Domain}/api/User/course_data_by_institute_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ InstituteId: instituteIdJson.institute_id })
          });
          const instituteCoursesJson = await instituteCourses.json();
          // handle the instituteCourses data here
          console.log("instituteCoursesJson");
          console.log(instituteCoursesJson);
          console.log("instituteCoursesJson");
          setCoursesData(instituteCoursesJson);
          const instituteLecture = await fetch(`${Links.Domain}/api/User/lactures_data_by_institute_id_for_faculty`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ InstituteId: instituteIdJson.institute_id, course: instituteIdJson.course, department: instituteIdJson.department })
          });

          const instituteLectureJson = await instituteLecture.json();
          

          if(instituteLectureJson[0].id === 0){
            setLectureForInstituteData(null);
          }else{
            if(instituteLectureJson[0].data.length > 0){
              setLectureForInstituteData(instituteLectureJson[0].data);
            }else{
              setLectureForInstituteData(null);

            }

          }
        }
        setEmail(Email);
        setAccountType(Type);
        console.log('Value retrieved successfully');
        setLoading(false);
      }
    } catch (error) {

      setLoading(false);
      console.log('Error retrieving value:', error);
    }
  }
  const lectureTitleError = (text) => {
    if (text.match(/^[a-zA-Z ]*$/)) {
      setLectureTitle(text);
      setLectureTitleErrorText('#000');
    } else {
      setLectureTitleErrorText('red');
    }
  };

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


  const GenerateLectureHandler = async () => {
    setLoading(true);
    if (!selectedDepartment) {
      Alert.alert('Please select a department.');
      return;
    }
    if (!selectedCourse) {
      Alert.alert('Please select a course.');
      return;
    }
    if (!selectedSemester) {
      Alert.alert('Please select a semester.');
      return;
    }
    if (!lectureTitle) {
      Alert.alert('Please enter a title for the lecture.');
      return;
    }

    const ChannelName = generateRandomName();

    console.log("ChannelName")
    console.log(ChannelName)
    console.log("ChannelName")

    const Tokenoptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ChannelName: ChannelName,
      })
    };


    const TokenData = await fetch(`${Links.AgoraTokenServerDomain}/access_token_for_Meeeting`, Tokenoptions);


    const TokenValue = await TokenData.json();
console.log("TokenData")
console.log(TokenValue)
console.log("TokenData")

    const Token = TokenValue.token;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: lectureTitle,
        description: lectureDescription,
        course: selectedCourse,
        department: selectedDepartment,
        semester: selectedSemester,
        instituteId: instituteId,
        startTime: startTime,
        endTime: endTime,
        examDate: examDate,
        channelName: ChannelName,
        token: Token,
      })
    };

    try {
      const response = await fetch(`${Links.Domain}/api/User/Generate_lacture`, requestOptions);
      const data = await response.json();
      console.log('Server response:', data);
      if (data[0].id === 1) {
        // navigation.navigate("VarifyIdentity");
        setSelectedCourse(null)
        setSelectedDepartment(null)
        setSelectedSemester(null)
        setLectureTitle(null);
        setLoading(false);
        Alert.alert(data[0].text)
      } else {
        setLoading(false);
        Alert.alert('Error Generating Lecture.');
      }
    } catch (error) {
      console.error('Error Generating Lecture :', error);
      Alert.alert('Error Generating Lecture.');
    }
  };


  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
 getValue();
    }
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {

      // Do something else instead of exiting the app
      navigation.goBack();
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
    <SafeAreaView style={{}}>
      {loading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "60%" }}
        />
      ) :
        acountType === "Student" ?
          (
            <View style={{ height: "100%", width: "100%" }}>
              <View>
                <SafeAreaView>


                  {lecturesData ?
                  ( <FlatList
                    data={lecturesData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id} />
                  ):(
                    <View style={{ flexDirection: "column", alignSelf: "center", marginTop: "50%",alignItems:"center" }}>
                    <Text style={{ color: "red" }}  >There are no lectures created by intitute</Text>
                  </View>
                  )
                }


                </SafeAreaView>
              </View>
            </View>

          ) : (
            acountType === "Institute" ? (
              isChooseDesition ? (
                <View style={styles.mainchooseContainer}>
                  <View style={[styles.inputChooseContainer, { marginTop: "25%" }]}>
                    <TouchableOpacity style={styles.chooseButton} onPress={() => {
                      setIsJoinLecForInstitute(true)
                      setIsChooseDesition(false)
                    }}>
                      {/* <Image source={require('../../assets/Student.png')} style={[styles.image,{marginLeft:5}]} /> */}
                      <Text style={styles.chooseButtonText}>JoinLecture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chooseButton} onPress={() => {
                      setIsGenerateLecForInstitute(true)
                      setIsChooseDesition(false)
                    }}>
                      {/* <Image source={require('../../assets/Institute.png')} style={styles.image} /> */}
                      <Text style={styles.chooseButtonText}>Generate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                isGenerateLecForInstitute ? (
                  <ScrollView style={{ flexGrow: 1, height: "100%", padding: 50, marginBottom: 100, backgroundColor: "#fff" }}>
                    <View style={{ alignSelf: 'center', justifyContent: "center" }}>
                      <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center" }}>
                        <Image source={require('../../assets/Institute.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                      </View>
                      <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700" }}>Institute</Text>
                    </View>
                    <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22, marginBottom: 20, color: Color.Color.topHeaderBackground }}>Generate lectures</Text>

                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Department :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >
                        <Picker
                          selectedValue={selectedDepartment}
                          onValueChange={(itemValue, itemIndex) => setSelectedDepartment(itemValue)}
                          mode={'dropdown'}
                        >
                          <Picker.Item label='Select a department' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          {coursesData

                            .map((course) => (

                              <Picker.Item key={course._id} label={course.department} value={course.department} />
                            ))}
                        </Picker>
                      </View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Course :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >
                        <Picker
                          selectedValue={selectedCourse}
                          onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
                          mode={'dropdown'}
                        >
                          <Picker.Item label='Select a course' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          {coursesData

                            .map((course) => (

                              <Picker.Item key={course._id} label={course.courseName} value={course.courseName} />
                            ))}
                        </Picker>
                      </View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Semester :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >

                        <Picker
                          selectedValue={selectedSemester}
                          onValueChange={(itemValue, itemIndex) => setSelectedSemester(itemValue)}
                          mode={'dropdown'}

                        >
                          <Picker.Item label='Select a semester' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          <Picker.Item label='1' value='1' />
                          <Picker.Item label='2' value='2' />
                          <Picker.Item label='3' value='3' />
                          <Picker.Item label='4' value='4' />
                          <Picker.Item label='5' value='5' />
                          <Picker.Item label='6' value='6' />
                          <Picker.Item label='7' value='7' />
                          <Picker.Item label='8' value='8' />
                        </Picker>
                      </View>
                    </View>

                    <View style={{ marginVertical: 20, marginBottom: 0 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Lecture Title :</Text>
                      <Input
                        placeholder='Enter the lecture title'
                        value={lectureTitle}
                        onChangeText={(text) => lectureTitleError(text)}
                        errorStyle={{ color: lectureTitleErrorText }}
                        errorMessage={
                          lectureTitleErrorText === 'red'
                            ? 'lecture title should contain only alphabets and spaces.'
                            : null
                        }
                      />
                    </View>

                    <View style={{ marginVertical: 20, marginBottom: 0 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Lecture Description :</Text>
                      <Input
                        placeholder='Enter the lecture description'
                        value={lectureDescription}
                        onChangeText={(text) => setLectureDescription(text)}
                      />
                    </View>


                    {/* Start Time Button */}
                    <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                      <Text>Start Time: {startTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showStartTimePicker && (
                      <DateTimePicker
                        testID="startTimePicker"
                        value={startTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleStartTimeChange}
                      />
                    )}

                    {/* End Time Button */}
                    <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                      <Text>End Time: {endTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showEndTimePicker && (
                      <DateTimePicker
                        testID="endTimePicker"
                        value={endTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleEndTimeChange}
                      />
                    )}

                    {/* Exam Date Button */}
                    <TouchableOpacity onPress={() => setShowExamDatePicker(true)}>
                      <Text>Exam Date: {examDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showExamDatePicker && (
                      <DateTimePicker
                        testID="examDatePicker"
                        value={examDate}
                        mode="date"
                        display="default"
                        onChange={handleExamDateChange}
                      />
                    )}

                    <TouchableOpacity style={styles.button}
                      onPress={() => { GenerateLectureHandler() }}
                      disabled={!selectedCourse || !selectedDepartment || !selectedDepartment || !lectureTitle || !lectureDescription}
                    >
                      <Text style={styles.buttonText}>Generate Lecture</Text>
                    </TouchableOpacity>

                    <Text style={{ color: "#FFA836", marginBottom: 80, alignSelf: "center" }} onPress={() => {
                      setIsGenerateLecForInstitute(false);
                      setIsJoinLecForInstitute(true);
                    }} > Join Lecture </Text>
                  </ScrollView>

                )
                  : (
                    <View style={{ height: "100%", width: "100%" }}>
                      <View>
                        <SafeAreaView>


                          {lectureForInstituteData ? (
                          <FlatList
                            data={lectureForInstituteData}
                            renderItem={renderItemForInstitute}
                            keyExtractor={(item) => item._id} />
                          ):(
                            <View style={{ flexDirection: "column", alignSelf: "center", marginVertical: "50%" }}>
                              <Text style={{ color: "red",alignSelf:"center" }}> No Lectures generated by intitute</Text>
                          </View>
                          )
                          }
                        </SafeAreaView>
                        <TouchableOpacity  style={{ backgroundColor: "#FFA836",marginHorizontal:"20%",padding:10,borderRadius:5}}  onPress={() => {
                          setIsJoinLecForInstitute(false);
                          setIsGenerateLecForInstitute(true);
                        }} >

                        <Text style={{ color: "#fff", alignSelf: 'center' }}  > Generate Lecture </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                  )
              )

            ) :
              isChooseDesition ? (
                <View style={styles.mainchooseContainer}>
                  <View style={[styles.inputChooseContainer, { marginTop: "25%" }]}>
                    <TouchableOpacity style={styles.chooseButton} onPress={() => {
                      setIsJoinLecForInstitute(true)
                      setIsChooseDesition(false)
                    }}>
                      {/* <Image source={require('../../assets/Student.png')} style={[styles.image,{marginLeft:5}]} /> */}
                      <Text style={styles.chooseButtonText}>JoinLecture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chooseButton} onPress={() => {
                      setIsGenerateLecForInstitute(true)
                      setIsChooseDesition(false)
                    }}>
                      {/* <Image source={require('../../assets/Institute.png')} style={styles.image} /> */}
                      <Text style={styles.chooseButtonText}>Generate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : 
                isGenerateLecForInstitute ? (
                  <ScrollView style={{ flexGrow: 1, height: "100%", padding: 50, marginBottom: 100, backgroundColor: "#fff" }}>
                    <View style={{ alignSelf: 'center', justifyContent: "center" }}>
                      <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center" }}>
                        <Image source={require('../../assets/Institute.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                      </View>
                      <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700" }}>Institute</Text>
                    </View>
                    <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22, marginBottom: 20, color: Color.Color.topHeaderBackground }}>Generate lectures</Text>

                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Department :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >
                        <Picker
                          selectedValue={selectedDepartment}
                          onValueChange={(itemValue, itemIndex) => setSelectedDepartment(itemValue)}
                          mode={'dropdown'}
                        >
                          <Picker.Item label='Select a department' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          {coursesData

                            .map((course) => (

                              <Picker.Item key={course._id} label={course.department} value={course.department} />
                            ))}
                        </Picker>
                      </View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Course :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >
                        <Picker
                          selectedValue={selectedCourse}
                          onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
                          mode={'dropdown'}
                        >
                          <Picker.Item label='Select a course' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          {coursesData

                            .map((course) => (

                              <Picker.Item key={course._id} label={course.courseName} value={course.courseName} />
                            ))}
                        </Picker>
                      </View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Semester :</Text>
                      <View style={{ borderWidth: 1, borderRadius: 5 }} >

                        <Picker
                          selectedValue={selectedSemester}
                          onValueChange={(itemValue, itemIndex) => setSelectedSemester(itemValue)}
                          mode={'dropdown'}

                        >
                          <Picker.Item label='Select a semester' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                          <Picker.Item label='1' value='1' />
                          <Picker.Item label='2' value='2' />
                          <Picker.Item label='3' value='3' />
                          <Picker.Item label='4' value='4' />
                          <Picker.Item label='5' value='5' />
                          <Picker.Item label='6' value='6' />
                          <Picker.Item label='7' value='7' />
                          <Picker.Item label='8' value='8' />
                        </Picker>
                      </View>
                    </View>

                    <View style={{ marginVertical: 20, marginBottom: 0 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Lecture Title :</Text>
                      <Input
                        placeholder='Enter the lecture title'
                        value={lectureTitle}
                        onChangeText={(text) => lectureTitleError(text)}
                        errorStyle={{ color: lectureTitleErrorText }}
                        errorMessage={
                          lectureTitleErrorText === 'red'
                            ? 'lecture title should contain only alphabets and spaces.'
                            : null
                        }
                      />
                    </View>

                    <View style={{ marginVertical: 20, marginBottom: 0 }}>
                      <Text style={{ fontSize: 16, marginBottom: 10 }}>Lecture Description :</Text>
                      <Input
                        placeholder='Enter the lecture description'
                        value={lectureDescription}
                        onChangeText={(text) => setLectureDescription(text)}
                      />
                    </View>


                    {/* Start Time Button */}
                    <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                      <Text>Start Time: {startTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showStartTimePicker && (
                      <DateTimePicker
                        testID="startTimePicker"
                        value={startTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleStartTimeChange}
                      />
                    )}

                    {/* End Time Button */}
                    <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                      <Text>End Time: {endTime.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showEndTimePicker && (
                      <DateTimePicker
                        testID="endTimePicker"
                        value={endTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleEndTimeChange}
                      />
                    )}

                    {/* Exam Date Button */}
                    <TouchableOpacity onPress={() => setShowExamDatePicker(true)}>
                      <Text>Exam Date: {examDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showExamDatePicker && (
                      <DateTimePicker
                        testID="examDatePicker"
                        value={examDate}
                        mode="date"
                        display="default"
                        onChange={handleExamDateChange}
                      />
                    )}

                    <TouchableOpacity style={styles.button}
                      onPress={() => { GenerateLectureHandler() }}
                      disabled={!selectedCourse || !selectedDepartment || !selectedDepartment || !lectureTitle || !lectureDescription}
                    >
                      <Text style={styles.buttonText}>Generate Lecture</Text>
                    </TouchableOpacity>

                    <Text style={{ color: "#FFA836", marginBottom: 80, alignSelf: "center" }} onPress={() => {
                      setIsGenerateLecForInstitute(false);
                      setIsJoinLecForInstitute(true);
                    }} > Join Lecture </Text>
                  </ScrollView>

                )
                  : (
                    <View style={{ height: "100%", width: "100%" }}>
                    <View>
                      <SafeAreaView>


                        {lectureForInstituteData ? (
                        <FlatList
                          data={lectureForInstituteData}
                          renderItem={renderItemForInstitute}
                          keyExtractor={(item) => item._id} />
                        ):(
                          <View style={{ flexDirection: "column", alignSelf: "center", marginVertical: "50%" }}>
                            <Text style={{ color: "red",alignSelf:"center" }}> No Lectures generated by intitute</Text>
                        </View>
                        )
                        }
                      </SafeAreaView>
                      <TouchableOpacity  style={{ backgroundColor: "#FFA836",marginHorizontal:"20%",padding:10,borderRadius:5}}  onPress={() => {
                        setIsJoinLecForInstitute(false);
                        setIsGenerateLecForInstitute(true);
                      }} >

                      <Text style={{ color: "#fff", alignSelf: 'center' }}  > Generate Lecture </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  )
              )
      }
    </SafeAreaView>
  )
}

export default Celender

const styles = StyleSheet.create({
  BookContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BookButton: {
    backgroundColor: Color.Color.topHeaderBackground,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginTop: 0,
    marginBottom: 10,
  },
  BookButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
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
    height: "100%",
    // backgroundColor:"#fff",
    margin: "10%",
    marginBottom: 30,
    padding: 0,
  },
  button: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10, marginTop: 20 },
  buttonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
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
  },
  mainchooseContainer: {
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
  inputChooseContainer: {
    // backgroundColor:"#fff",
    margin: "10%",
    marginBottom: 30,
    padding: 0,
  },
  chooseButton: { width: 200, alignSelf: 'center', padding: 20, paddingTop: 30, backgroundColor: Color.Color.topHeaderBackground, borderRadius: 20, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 20 },
  chooseButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  // chooseButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
  // ButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
  image: {
    alignSelf: 'center'
  }
})






