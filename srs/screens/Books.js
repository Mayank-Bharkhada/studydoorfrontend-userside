import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Linking, PermissionsAndroid, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native';
import { BackHandler } from 'react-native';
import Color from '../constant/Color';
import { Input } from "@rneui/themed";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';
import * as Progress from 'react-native-progress';
import RNFS from 'react-native-fs';
import { Permissions, request, check } from 'react-native-permissions';
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

import { SearchBar } from '@rneui/themed';
import { FlatList } from 'react-native';

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [coursesData, setCoursesData] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [instituteId, setInstituteId] = useState('');
  const [StudentId, setStudentId] = useState('');
  const [booksData, setBooksData] = useState();
  const [bookUri, setBookUri] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [bookTitle, setBookTitle] = useState();
  const [bookTitleErrorText, setBookTitleErrorText] = useState("#fff");
  const [filteredbooks, setFilteredbooks] = useState("");
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [readBookUri, setReadBookUri] = useState("");
  const navigation = useNavigation();


  const downloadBook = async (bookUri) => {
    try {
      setShowProgress(true);

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
        return;
      }

      const url = 'https://studydoor.s3.amazonaws.com/' + bookUri;
      const fileName = new Date().getTime() + '.pdf';
      const fileUri = RNFS.ExternalStorageDirectoryPath + "/Download/" + fileName;

      const downloadResult = RNFS.downloadFile({
        fromUrl: url,
        toFile: fileUri,
        progressDivider: 1,
        begin: (res) => {
          const totalBytes = parseInt(res.headers['Content-Length']);
          console.log(`Content-Length: ${totalBytes}`);
        },
        progress: (res) => {
          const progress = res.bytesWritten / res.contentLength;
          console.log(`Download progress: ${progress}`);
          setProgress(progress);
        },
      });


      console.log('Downloaded file:', downloadResult);
      setReadBookUri(fileUri);
      console.log('File saved to device storage!');




    } catch (error) {
      console.error(error);
    }
  };



  const updateSearch = (search) => {
    if (search != "") {
      const lowerSearch = search.toLowerCase();
      const filteredbooks = booksData.filter((item) =>
        item.bookName.toLowerCase().includes(lowerSearch)

      );
      setFilteredbooks(filteredbooks);
      console.log(search);
    }
  };

  const searchItems = (search) => {
    const lowerSearch = search.toLowerCase();
    const filteredbooks = booksData.filter((item) =>

      item.bookName.toLowerCase().includes(lowerSearch)
    );
    setFilteredbooks(filteredbooks);
    console.log(search);
  };

  const searchClear = () => {
    setFilteredbooks(null);
  };


  const setButtonEnabled = () => {
    setIsEnabled(true);
  }



  const pickBookUriDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setBookUri(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
        <Image source={require('../../assets/book.png')} style={{ width: 50, height: 50, marginRight: 10 }} />
        <View style={{ width: "60%" }}>
          <Text>Title: {item.bookName}</Text>
          {/* <Text>Department: {item.department}</Text> */}
        </View>
        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
          downloadBook(item.BookUri);
        }}>
          <Text style={{ color: 'white' }}>Download</Text>
        </TouchableOpacity>
      </View>
    );
  }
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

          const Books = await fetch(`${Links.Domain}/api/User/fetch_all_books_by_users_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Student_id: StudentIdJson._id })
          });
          const BooksJson = await Books.json();
          // handle the Books data here
          // console.log(BooksJson)
          if (BooksJson[0].id === 0) {
            setBooksData(null);
          } else {
            setBooksData(BooksJson[0].data);
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
          console.log("facultyIdJson.institute_id")
          console.log(facultyIdJson.institute_id)
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

  const bookTitleError = (value) => {
    setBookTitle(value);
    const Valid = /^[a-zA-Z0-9\s,'-]*$/;
    if (Valid.test(value)) {
      setBookTitleErrorText("#fff");
    } else {
      setBookTitleErrorText("red");
    }
  }

  const uploadBooks = async () => {
    setLoading(true);  
    // if (!accreditationCertificateUri ) {
    //   setLoading(false);
    //   return;
    // }

    console.log("getting")
    const formData = new FormData();
    formData.append('Book', {
      uri: bookUri[0].uri,
      type: bookUri[0].type,
      name: `${Date.now()}${bookUri[0].name}`,
    });
    formData.append('CourseName', selectedCourse);
    formData.append('Department', selectedDepartment);
    formData.append('Semester', selectedSemester);
    formData.append('Email', email);
    formData.append('InstituteId', instituteId);
    formData.append('BookName', bookTitle);
    console.log(formData);

    try {
      const response = await fetch(`${Links.Domain}/api/User/Upload_books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const responseData = await response.json();
      if (responseData[0].id === 1) {
        // navigation.navigate("VarifyIdentity");
        setBookTitle(null)
        setSelectedCourse(null)
        setSelectedDepartment(null)
        setSelectedSemester(null)
        setBookUri(null)
        setLoading(false);
        Alert.alert(responseData[0].text)
        // navigation.navigate("")
      } else {
        setLoading(false);
        Alert.alert("there are some problem please try after some time")
      }
      console.log(responseData);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };


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
            <View style={{ height: "100%" }}>


              {filteredbooks || booksData ? (
                <>
                  <View style={styles.searchHeading}>
                    <SearchBar
                      placeholder="Search Here..."
                      round
                      containerStyle={{ marginTop: 0, backgroundColor: Color.Color.topHeaderBackground, borderTopColor: Color.Color.bottomtabBackground, borderBottomColor: Color.Color.bottomtabBackground }}
                      inputContainerStyle={{ marginHorizontal: "5%", height: 35, marginBottom: 20, paddingVertical: 20, paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 25 }}
                      // value={this.state.searchValue}
                      searchIcon={() => <Icon name="search" size={27} onPress={() => searchItems(search)} color="#000" />}
                      onChangeText={updateSearch}
                      value={filteredbooks}
                      autoCorrect={false}
                      clearIcon={() => <Icon name="clear" size={27} color="#000" onPress={() => searchClear()} />} />

                  </View>
                  <View>
                    <SafeAreaView>
                      {
                        filteredbooks ? (<FlatList
                          data={filteredbooks}
                          renderItem={renderItem}
                          keyExtractor={(item) => item._id} />) :
                          booksData && (<FlatList
                            data={booksData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id} />)}
                    </SafeAreaView>
                  </View>
                </>
              ) : (
                <View style={{ flexDirection: "column", alignSelf: "center", marginTop: "50%", alignItems: "center" }}>
                  <Text style={{ color: "red" }}  >There are no Book uploaded by intitute</Text>
                </View>
              )

              }



              {showProgress &&
                <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", alignItems: "center", justifyContent: "center" }}>
                  <Progress.Circle progress={progress} size={100} color={'#fff'} thickness={2} showsText={true}
                    formatText={(progressVal) => {
                      const progressValue = Math.round(progressVal * 100);
                      if (progressValue === 100) {
                        setShowProgress(true)
                      } else {
                        setShowProgress(true)
                      }
                      return `${progressValue}%`;
                    }}
                  />
                  {
                    progress < 1 ?
                      (
                        <Text style={{ color: "#fff", marginTop: 20 }}>Your Book is downloading</Text>
                      )
                      : (
                        <>
                          <Text style={{ color: "#fff", marginTop: 20 }}>Your Book is Download, Don't need to download again</Text>
                          <Text style={{ color: "#fff" }}>Go to Download and Open {readBookUri} </Text>
                        </>
                      )
                  }
{/* 
                  <TouchableOpacity style={{ alignItems: "center", marginTop: 20, justifyContent: "center", borderRadius: 10, width: "50%", height: 60, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
                    Linking.openURL('file:/' + readBookUri);
                    // setShowProgress(false)
                  }}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>Read Book</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity style={{ alignItems: "center", marginTop: 20, position: "absolute", top: 20, right: 0, justifyContent: "center", borderRadius: 10, width: "50%", height: 60 }} onPress={() => {
                    // Linking.openURL('file:///' + readBookUri);
                    setShowProgress(false)
                  }}>
                    <Text style={{ color: "#fff", fontSize: 30 }}>x</Text>
                  </TouchableOpacity>

                </View>
              }
            </View>
          ) : (
            <ScrollView style={{ flexGrow: 1, height: "100%", padding: 50, marginBottom: 100, backgroundColor: "#fff" }}>
              <View style={{ alignSelf: 'center', justifyContent: "center" }}>
                <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center" }}>
                  <Image source={require('../../assets/Institute.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                </View>
                <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700" }}>Institute</Text>
              </View>
              <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22, marginBottom: 20, color: Color.Color.topHeaderBackground }}>Upload Books</Text>


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
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Book Title :</Text>
                <Input
                  placeholder='Enter the book title'
                  value={bookTitle}
                  onChangeText={(Value) => { bookTitleError(Value) }}
                  errorStyle={{ color: bookTitleErrorText }}
                  errorMessage={
                    bookTitleErrorText === 'red'
                      ? 'Book title should contain only alphabets and spaces.'
                      : null
                  }
                />
              </View>




              <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Choose a Book to Upload :</Text>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: Color.primary,
                    borderRadius: 5,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={pickBookUriDocument}
                >
                  <MaterialCommunityIcons name='book' size={30} color={Color.primary} />

                  {bookUri && <Text style={{ marginLeft: 10 }}>{bookUri[0].name}</Text>}
                  {!bookUri && <Text style={{ marginLeft: 10 }}>Pick a Book</Text>}
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button}
                onPress={uploadBooks}
                disabled={!selectedCourse || !selectedDepartment || !selectedDepartment || !bookUri}
              >
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>


            </ScrollView>

          )}
    </SafeAreaView>
  )
}

export default Books

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
  button: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 80, marginTop: 20 },
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
  }
})

