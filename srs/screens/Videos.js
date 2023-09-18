import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Linking, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Dimensions  } from 'react-native';
import { BackHandler } from 'react-native';
import Color from '../constant/Color';
import { Input } from "@rneui/themed";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Links from '../constant/Links';
import { SearchBar } from '@rneui/themed';

import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Videos = () => {
    const [loading, setLoading] = useState(true);
    const [acountType, setAccountType] = useState("");
    const [coursesData, setCoursesData] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [instituteId, setInstituteId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [videosData, setVideosData] = useState();
    const [bookUri, setBookUri] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoUri, setVideoUri] = useState(null);
    const [videoTitleErrorText, setVideoTitleErrorText] = useState('#000');

    const [bookTitle, setBookTitle] = useState();
    const [bookTitleErrorText, setBookTitleErrorText] = useState("#fff");
    const [filteredbooks, setFilteredbooks] = useState("");
    const [showVideoUrl, setShowVideoUrl] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const [readBookUri, setReadBookUri] = useState("");
    const [imageUri, setImageUri] = useState(null);
   

    const navigation = useNavigation();


    const renderItem = ({ item }) => {
        console.log(item.thumbnailUrl)
        return (
            <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
                <Image source={{ uri: `https://studydoor.s3.amazonaws.com/${item.thumbnailUrl}` }} style={{ width: 50, height: 50, marginRight: 10 }} />
                <View style={{ width: "70%" }}>
                    <Text>Title: {item.title}</Text>
                    <Text>Description: {item.description}</Text>
                </View>
                <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
                    // navigation.navigate('VideoPlay', { videoUrl: item.videoUrl })
                    // setShowVideo(true);
                    // setShowVideoUrl(item.videoUrl);
                    
                    navigation.navigate("VideoPlay", {videoId: item._id, videoUrl: item.videoUrl , thumbnailUrl: item.thumbnailUrl,studentId: studentId})
                    
                    // videoRef.current.presentFullscreenPlayer();
                }}>
                    <Text style={{ color: 'white' }}>Play</Text>
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

                    console.log("////////////StudentIdJson///////////////////")
                    console.log(StudentIdJson._id)

                    const Videos = await fetch(`${Links.Domain}/api/User/fetch_all_Videos_by_users_id`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ Student_id: StudentIdJson._id })
                    });
                    const VideosJson = await Videos.json();

                    console.log("////////////VideosJson///////////////////")
                    console.log(VideosJson[0].data)
                    // handle the Videos data here
                    // console.log(VideosJson)

                    if (VideosJson[0].id === 0) {
                        setVideosData(null);
                    } else {
                        setVideosData(VideosJson[0].data);
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
    const videoTitleError = (text) => {
        if (text.match(/^[a-zA-Z ]*$/)) {
            setVideoTitle(text);
            setVideoTitleErrorText('#000');
        } else {
            setVideoTitleErrorText('red');
        }
    };

    const pickVideoUriDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.video],
            });
            console.log("result")
            console.log(result)
            console.log("result")
            if (result) {
                setVideoUri(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const pickImageUriDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            console.log("result")
            console.log(result)
            console.log("result")
            if (result) {
                setImageUri(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // console.log("videoUri")
    // console.log(videoUri)
    // console.log("videoUri")

    const uploadVideoHandler = async () => {
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
        if (!videoTitle) {
            Alert.alert('Please enter a title for the video.');
            return;
        }
        if (!videoUri) {
            Alert.alert('Please pick a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('department', selectedDepartment);
        formData.append('course', selectedCourse);
        formData.append('semester', selectedSemester);
        formData.append('InstituteId', instituteId);
        formData.append('title', videoTitle);
        formData.append('description', videoDescription);
        formData.append('Video', {
            uri: videoUri[0].uri,
            type: videoUri[0].type,
            name: `${Date.now()}${videoUri[0].name}`,
        });
        formData.append('Thumbnail', {
            uri: imageUri[0].uri,
            type: imageUri[0].type,
            name: `${Date.now()}${imageUri[0].name}`,
        });

        try {


            const response = await fetch(`${Links.Domain}/api/User/Upload_videos`, {
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
                setSelectedCourse(null)
                setSelectedDepartment(null)
                setSelectedSemester(null)
                setVideoTitle(null);
                setLoading(false);
                Alert.alert(responseData[0].text)
            } else {
                setLoading(false);
                Alert.alert('Error Video uploading.');
            }
            console.log(responseData);

            // const response = await uploadVideo(formData);
            // if (response.status === 200) {
            //     alert('Video uploaded successfully.');
            //     setSelectedDepartment(null);
            //     setSelectedCourse(null);
            //     setSelectedSemester(null);
            //     setVideoTitle('');
            //     setVideoUri(null);
            // } else {
            //     alert('Error Video uploading.');
            // }

        } catch (error) {

            setLoading(false);
            console.log(error);
            Alert.alert('Error uploading video. Please try again.');
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
    
        // getValue();
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        
        return () => backHandler.remove();
        }
      }, [isFocused]);
    

    console.log("readBookUri")
    console.log(acountType)
    // console.log(readBookUri)
    console.log("readBookUri")
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



                                    {videosData ? (<FlatList
                                        data={videosData}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item._id} />
                                        ):(
                                            <View style={{  alignSelf: "center", marginTop: "50%",alignItems:"center" }}>
                                            <Text style={{ color: "red" }}  >There are no videos uploaded by intitute</Text>
                                          </View>
                                        )
                                        }


                                </SafeAreaView>
                            </View>
                        </View>                   
                    ) : (
                        <ScrollView style={{ flexGrow: 1, height: "100%", padding: 50, marginBottom: 100, backgroundColor: "#fff" }}>
                            <View style={{ alignSelf: 'center', justifyContent: "center" }}>
                                <View style={{ backgroundColor: Color.Color.bottomtabBackground, width: 80, height: 80, borderRadius: 100, elevation: 20, alignSelf: 'center', justifyContent: "center" }}>
                                    <Image source={require('../../assets/Institute.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                </View>
                                <Text style={{ fontSize: 22, color: Color.Color.bottomtabBackground, fontWeight: "700" }}>Institute</Text>
                            </View>
                            <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22, marginBottom: 20, color: Color.Color.topHeaderBackground }}>Upload Videos</Text>

                            <View style={{ marginVertical: 20 }}>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>Department :</Text>
                                <View style={{ borderWidth: 1, borderRadius: 5 }} >
                                    {coursesData && <Picker
                                        selectedValue={selectedDepartment}
                                        onValueChange={(itemValue, itemIndex) => setSelectedDepartment(itemValue)}
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
                                        selectedValue={selectedCourse}
                                        onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
                                        mode={'dropdown'}
                                    >
                                        <Picker.Item label='Select a course' value={null} style={{ alignSelf: 'center', color: '#666', opacity: 0.5 }} enabled={false} />
                                        {coursesData.map((course) => (

                                            <Picker.Item key={course._id} label={course.courseName} value={course.courseName} />
                                        ))}
                                    </Picker>}
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
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>Video Title :</Text>
                                <Input
                                    placeholder='Enter the video title'
                                    value={videoTitle}
                                    onChangeText={(text) => videoTitleError(text)}
                                    errorStyle={{ color: videoTitleErrorText }}
                                    errorMessage={
                                        videoTitleErrorText === 'red'
                                            ? 'Video title should contain only alphabets and spaces.'
                                            : null
                                    }
                                />
                            </View>

                            <View style={{ marginVertical: 20, marginBottom: 0 }}>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>Video Description :</Text>
                                <Input
                                    placeholder='Enter the video description'
                                    value={videoDescription}
                                    onChangeText={(text) => setVideoDescription(text)}
                                />
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>Choose a Video to Upload : </Text>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Color.primary,
                                        borderRadius: 5,
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                    onPress={pickVideoUriDocument}
                                >
                                    <MaterialCommunityIcons name='video' size={30} color={Color.primary} />

                                    {videoUri && <Text style={{ marginLeft: 10 }}>{videoUri[0].name}</Text>}
                                    {!videoUri && <Text style={{ marginLeft: 10 }}>Pick a Video</Text>}
                                </TouchableOpacity>
                            </View>


                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 16, marginBottom: 10 }}>Choose a Thumbnail for the Video : </Text>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Color.primary,
                                        borderRadius: 5,
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                    onPress={pickImageUriDocument}
                                >
                                    
                                    <MaterialCommunityIcons name='image' size={30} color={Color.primary} />
                                    {imageUri && <Text style={{ marginLeft: 10 }}>{imageUri[0].name}</Text>}
                                    {!imageUri && <Text style={{ marginLeft: 10 }}>Pick an Image</Text>}
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.button}
                                onPress={() => { uploadVideoHandler() }}
                                disabled={!selectedCourse || !selectedDepartment || !selectedDepartment || !videoUri || !imageUri}
                            >
                                <Text style={styles.buttonText}>Upload</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    )
            }
        </SafeAreaView >
    )
}

export default Videos

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
    },
  })
