import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../constant/Color';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { Input } from '@rneui/base';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import Links from '../constant/Links';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Quiz = () => {
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showExamDatePicker, setShowExamDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [examDate, setExamDate] = useState(new Date());


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

  const navigation = useNavigation();
  // console.log(navigation);

  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [StudentId, setStudentId] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [quizTitle, setQuizTitle] = useState();
  const [quizTitleError, setQuizTitleError] = useState("#fff");
  const [doingExam, setDoingExam] = useState(false);
  const [currentExamData, setCurrentExamData] = useState(null);

  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState(null);
  const [currentExams, setCurrentExams] = useState(null);
  const [timeLimit, setTimeLimit] = useState('');

  const [coursesData, setCoursesData] = useState('');

  const handleAddQuestion = () => {
    const newQuestion = { text: '', options: [] };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionTextChange = (text, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].options.length < 4) {
      updatedQuestions[index].options.push('');
      setQuestions(updatedQuestions);
    } else {
      Alert.alert("You can add maxiumum 4 options !!!")
    }
  };

  const handleOptionTextChange = (text, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  console.log(questions)
  const handleCorrectOptionChange = (text, index) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOption = text;
    setQuestions(newQuestions);
  };


  const handleQuestionSubmit = async () => {

    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questions: questions,
        title: quizTitle,
        course: selectedCourse,
        department: selectedDepartment,
        semester: selectedSemester,
        instituteId: instituteId,
        startTime: startTime,
        endTime: endTime,
        examDate: examDate,
      })
    };
    try {
      const response = await fetch(`${Links.Domain}/api/User/Generate_quiz`, requestOptions);
      const data = await response.json();
      console.log('Server response:', data);
      Alert.alert("Test  is Successfully Generated");
      setLoading(false);
    } catch (error) {
      Alert.alert("Error generating test, please try later . . .");
      console.error('Error adding question to server:', error);
      setLoading(false);
    }
  };

  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(''));

  const handleOptionSelect = (option, optionIndex, questionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    console.log(option)
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };



  const handleEndExam = async (question, examData) => {
    setLoading(true);

    let score = 0;
    let questionLength = 0;
    // console.log(question)
    // console.log("question")
    // console.log(question)
    // console.log("question")
    question.forEach((question, index) => {
      // console.log(selectedOptions[index])
      // console.log(selectedOptions[index])
      questionLength++;
      if (selectedOptions[index] === question.correctOption) {
        score++;
      }
    });
    const marks = Math.round(score * 100 / questionLength);

    try {

      const examSubmit = await fetch(`${Links.Domain}/api/User/submit_exam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: StudentId, exam_id: examData._id, marks: marks })
      });
      const examSubmitJson = await examSubmit.json();

      console.log("examSubmitJson")
      console.log(examSubmitJson)
      console.log("examSubmitJson")
      if (examSubmitJson.id === 1) {
        Alert.alert("Note : You have successfully given test your score is : " + marks);
        setDoingExam(false);
      } else {
        setDoingExam(false);
        Alert.alert("if you have already given test ignore this Error : You have not completed this test, try again later . . .");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error :" + error);
      Alert.alert("if you have already given test ignore this Error : You have not completed this test, try again later . . .");
      setLoading(false);
    }
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

          const Question = await fetch(`${Links.Domain}/api/User/fetch_all_quiz_by_users_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Student_id: StudentIdJson._id })
          });
          const QuestionJson = await Question.json();
          // handle the Books data here
          // console.log(BooksJson)
          if (QuestionJson[0].id === 0) {
            setQuestionData(null);
          } else {
            console.log("getting")
            if (QuestionJson[0].data.length > 0) {

              setQuestionData(QuestionJson[0].data);
            } else {
              setQuestionData(null);

            }
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
          //           const filterCondition = (question) => {
          //   // Return true if the question's examDate is within the valid time range
          //   const examDate = new Date(question.examDate);
          //   const startTime = new Date(question.examStartTime);
          //   const endTime = new Date(question.examEndTime);
          //   const now = new Date();
          //   return now >= examDate && now >= startTime && now <= endTime;
          // }

          // // Filter the questions data based on the condition
          // setCurrentExams(instituteCoursesJson.filter(filterCondition));
          // setEnrollments(instituteCoursesJson);

        }
        if (Type === "Faculty") {

          const facultyId = await fetch(`${Links.Domain}/api/User/Faculty_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });
          const facultyIdJson = await facultyId.json();
          // handle the FacultyId data here
          setInstituteId(facultyIdJson.institute_id);
          const instituteCourses = await fetch(`${Links.Domain}/api/User/course_data_by_institute_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ InstituteId: facultyIdJson.institute_id })
          });
          const instituteCoursesJson = await instituteCourses.json();
          // handle the instituteCourses data here
          console.log(instituteCoursesJson);
          setCoursesData(instituteCoursesJson);
          // setEnrollments(instituteCoursesJson);
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

  const QuizTitleError = (value) => {
    setQuizTitle(value);
    const Valid = /^[a-zA-Z0-9\s,'-]*$/;
    if (Valid.test(value)) {
      setQuizTitleError("#fff");
    } else {
      setQuizTitleError("red");
    }
  }

  const renderExamItem = ({ item }) => {

    console.log("time");
    const currentDate = new Date();
    const ExamDate = new Date(item.examDate);
    // const  = new Date();


    // Assuming item.startTime is a valid Date object or a string representing a date
    const startTime = new Date(item.startTime);


    const endTime = new Date(item.endTime);

    // console.log(startTime.getHours())
    // console.log(endTime.getHours())
    // console.log(currentDate.getHours())
    // console.log(startTime.getTime() <= currentDate.getTime())
    // console.log(endTime.getTime() >= currentDate.getTime())
    // Compare the two dates

    if (startTime.getTime() <= currentDate.getTime()  && endTime.getTime() >= currentDate.getTime() && ExamDate.getFullYear() === endTime.getFullYear() && ExamDate.getMonth() === endTime.getMonth()) {
    return (
      <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
        <View style={{ width: "70%" }}>
          <Text>Title: {item.title}</Text>
          <Text>Course Name: {item.course}</Text>
        </View>
        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
          setDoingExam(true);
          setCurrentExamData(item)
        }}>
          <Text style={{ color: 'white' }}>Give Exam</Text>
        </TouchableOpacity>
      </View>
    );
      }else{
      return null;
    }
  };

  //  console.log(currentExamData)


  // if(questionData !== null){

  //   const filterCondition = (question) => {
  //     // Return true if the question's examDate is within the valid time range
  //     const examDate = new Date(question.examDate);
  //     const startTime = new Date(question.examStartTime);
  //     const endTime = new Date(question.examEndTime);
  //     const now = new Date();
  //     return now >= examDate && now >= startTime && now <= endTime;
  //   }

  //   // Filter the questions data based on the condition
  //   setCurrentExams(questionData.filter(filterCondition));

  // }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
 getValue();
    }
  }, [isFocused]);


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


  return (
    <>
      {loading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "60%" }}
        />
      ) :
        acountType === "Student" ?

          (
            <View style={{ width: "100%", height: "100%"}}>
              {doingExam &&
                <View style={{ position: "absolute", backgroundColor: "#fff", zIndex: 1,width: "100%", height: "100%",paddingHorizontal:"10%",paddingVertical:20 }}>
                  <ScrollView>
                    <View>
                      {currentExamData.question.map((question, questionIndex) => {
                        return (
                          <View key={questionIndex}>
                            <Text style={{fontSize:20,fontWeight:"800",color:"#000",marginVertical:10}}>{questionIndex + 1}. {question.text}</Text>

                            {question.options.map((option, optionIndex) => {
                              let optionLabel = String.fromCharCode(97 + optionIndex); // calculate option label using ASCII code
                              // console.log("datatataat")
                              console.log(selectedOptions[questionIndex] === `${optionIndex + 1}`)
                              // console.log(optionIndex+1)
                              return (
                                <TouchableOpacity key={optionIndex} style={{marginLeft:15}} onPress={() => handleOptionSelect(option, optionIndex, questionIndex)}>
                                  <Text style={{ backgroundColor: selectedOptions[questionIndex] === `${optionIndex + 1}` ? Color.Color.bottomtabBackground : '#fff', color: selectedOptions[questionIndex] === `${optionIndex + 1}` ? "#fff" : '#000', padding:5,paddingHorizontal:10,margin:3,borderWidth:0.5,borderRadius:20 }}>{optionLabel}. {option}</Text>
                                </TouchableOpacity>
                              )
                            })}
                          </View>
                        )
                      })}
                      <TouchableOpacity style={{width:"60%",backgroundColor:Color.Color.bottomtabBackground,padding:10,borderRadius:5,marginVertical:10,marginHorizontal:"20%"}} onPress={() => { handleEndExam(currentExamData.question, currentExamData) }}>
                        <Text style={{color:"#fff",alignSelf:"center"}}>End Exam</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              }

              {questionData ? (
                <FlatList
                  data={questionData}
                  renderItem={renderExamItem}
                  keyExtractor={item => item._id}
                  style={{ borderBottomWidth: 0.5 }}
                />
              ) : (
                <View style={{ flexDirection: "column", alignSelf: "center", marginTop: "50%", alignItems: "center" }}>

                  <Text style={{ color: "red" }}  ></Text>
                </View>
              )
              }
            </View>
            //      <ScrollView>
            //   <View>
            //     {questionData.map((question, questionIndex) => (
            //       <View key={questionIndex}>
            //         <Text>{question.text}</Text>
            //         {question.options.map((option, optionIndex) => (
            //           <TouchableOpacity key={optionIndex} onPress={() => handleOptionSelect(optionIndex, questionIndex)}>
            //             <Text>{option}</Text>
            //           </TouchableOpacity>
            //         ))}
            //       </View>
            //     ))}
            //     <TouchableOpacity onPress={handleEndExam}>
            //       <Text>End Exam</Text>
            //     </TouchableOpacity>
            //   </View>
            // </ScrollView>
          ) : (

            <ScrollView contentContainerStyle={{ width: "100%" }}>

              <View style={{ paddingHorizontal: "10%" }}>
                <View>
                  <View style={{ alignSelf: 'center', justifyContent: "center" }}>
                    <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center", marginTop: 20 }}>
                      <Image source={require('../../assets/Institute.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                    </View>
                    <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700" }}>Institute</Text>
                  </View>
                  <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22, marginBottom: 20, color: Color.Color.topHeaderBackground }}>Generate Test</Text>

                  <View style={{ marginVertical: 10 }}>
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

                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>Course :</Text>
                    <View style={{ borderWidth: 1, borderRadius: 5 }} >
                      <Picker
                        selectedValue={selectedCourse}
                        onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
                        mode={'dropdown'}
                      >
                        <Picker.Item label='Select a course' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                        {coursesData.map((course) => (

                          <Picker.Item key={course._id} label={course.courseName} value={course.courseName} />
                        ))}
                      </Picker>
                    </View>
                  </View>


                  <View style={{ marginVertical: 10 }}>
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

                  {/* Start Time Button */}
                  <Text style={{ fontSize: 16, marginBottom: 10 }} >Start Time: </Text>
                  <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={{ padding: 12, paddingVertical: 15, marginVertical: 5, marginBottom: 20, borderWidth: 1, borderRadius: 5 }}>
                    <Text> {startTime.toLocaleTimeString()}</Text>
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
                  <Text style={{ fontSize: 16, marginBottom: 10 }}>End Time: </Text>
                  <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={{ padding: 12, paddingVertical: 15, marginVertical: 5, marginBottom: 20, borderWidth: 1, borderRadius: 5 }}>
                    <Text>  {endTime.toLocaleTimeString()}</Text>
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
                  <Text style={{ fontSize: 16, marginBottom: 10 }} >Exam Date: </Text>
                  <TouchableOpacity onPress={() => setShowExamDatePicker(true)} style={{ padding: 12, paddingVertical: 15, marginVertical: 5, marginBottom: 20, borderWidth: 1, borderRadius: 5 }}>
                    <Text>{examDate.toDateString()}</Text>
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

                  <View style={{ marginVertical: 10, marginBottom: 0 }}>
                    <Text style={{ fontSize: 16, marginBottom: 0 }}>Quiz Title :</Text>
                    <Input
                      placeholder='Enter the Quiz title'
                      value={quizTitle}
                      onChangeText={(Value) => { QuizTitleError(Value) }}
                      errorStyle={{ color: quizTitleError }}
                      errorMessage={
                        quizTitleError === 'red'
                          ? 'Quiz title should contain only alphabets and spaces.'
                          : null
                      }
                    />
                  </View>
                  <View style={{ marginVertical: 10, marginBottom: 0 }}>
                    <Text style={{ fontSize: 16, marginBottom: 0 }}> Time Limit in munites:</Text>
                    <Input
                      placeholder="Time Limit (in minutes)"
                      value={timeLimit}
                      onChangeText={setTimeLimit}
                    />
                  </View>

                  {questions.map((question, index) => (
                    <View key={index}>
                      <Input
                        placeholder="Question"
                        value={question.text}
                        onChangeText={(text) => handleQuestionTextChange(text, index)}
                      />
                      {question.options.map((option, optionIndex) => (
                        <View key={optionIndex}>
                          <Input
                            placeholder="Option"
                            value={option}
                            onChangeText={(text) =>
                              handleOptionTextChange(text, index, optionIndex)
                            }
                          />
                        </View>
                      ))}
                      <Input
                        placeholder="Correct Option"
                        value={question.correctOption}
                        onChangeText={(text) => handleCorrectOptionChange(text, index)}
                      />
                      <TouchableOpacity onPress={() => handleAddOption(index)} style={{ backgroundColor: Color.Color.topHeaderBackground, borderRadius: 5, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10, padding: 15, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#fff" }}>Add Option</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity onPress={handleAddQuestion} style={{ backgroundColor: Color.Color.topHeaderBackground, borderRadius: 5, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 20, padding: 15, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#fff" }}>Add Question</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleQuestionSubmit} style={{ backgroundColor: Color.Color.topHeaderBackground, borderRadius: 5, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 20, padding: 15, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#fff" }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
    </>
  )
}

export default Quiz

const styles = StyleSheet.create({
  quizContainer: {
    height: 80,
    marginVertical: 5,
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#00b999",
    flex: 1,
    flexDirection: "row",
  },
  quizTextContainer: {
    height: 121,
    width: "80%",
    paddingHorizontal: 10,

    // backgroundColor:"#00b894
  },
  QuizTitle: {
    fontSize: 18,
    marginBottom: 10,
    // color:"#fff"
  },
  quizDescription: {
    fontSize: 10,
    // color:"#fff"
  },

  quizContainerButton: {
    alignSelf: "stretch",
    marginLeft: "auto"

  }
})
