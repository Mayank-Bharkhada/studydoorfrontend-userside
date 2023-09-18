import { BackHandler, FlatList, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator, StatusBar,Image,Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constant/Color';
import { useNavigation } from '@react-navigation/native';
import Links from '../constant/Links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Certificates = () => {

  const navigation = useNavigation();

  const [accType, setAccType] = useState(null)
  const [enrollmentData, setEnrollmentData] = useState(null)
  const [instituteData, setInstituteData] = useState(null)
  const [myCertificateData, setMyCertificateData] = useState(null)
  const [certificateDataFornstitute, setCertificateDataFornstitute] = useState(null)

  const [isLoading, setIsLoading] = useState(true);


  const downloadCertificateHandler = async(CertificateId,InstituteId,date) =>  {
    setIsLoading(true);
    try {
    const instituteData = await fetch(`${Links.Domain}/api/User/institute_data_by_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Institute_id: InstituteId })
    });

    const instituteDataJson = await instituteData.json();

    console.log("instoitute")
    console.log(instituteDataJson[0].data)
    const enrollmentData = await fetch(`${Links.Domain}/api/User/enrollment_data_by_certificate_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ certificateId: CertificateId })
    });
    
    const enrollmentDataJson = await enrollmentData.json();

    

    let options = {
      html: `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; margin: 0; padding: 0;"> <div style="width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #ccc; border-radius: 10px;"><div style="text-align: center; margin-bottom: 30px;"><h1 style="font-size: 32px; font-weight: bold; margin: 0;">${instituteDataJson[0].data.name}</h1><h2 style="margin: 0;">Degree Certificate</h2></div><div style="margin-bottom: 40px;"><p style="margin: 5; padding: 0; line-height: 1.5;">This is to certify that</p><h3 style="margin: 5;">${enrollmentDataJson.data.enrollment.studentName}</h3><p style="margin: 5; padding: 0; line-height: 1.5;">has successfully completed the requirements for the degree of</p><h4 style="margin: 5;">${enrollmentDataJson.data.enrollment.courseName}</h4><p style="margin: 5; padding: 0; line-height: 1.5;">in the field of</p><h4 style="margin: 5;">${enrollmentDataJson.data.enrollment.courseDepartment}</h4><p style="margin: 5; padding: 0; line-height: 1.5;">at the ${instituteDataJson[0].data.name}</p><p style="margin: 5; padding: 0; line-height: 1.5;">on the date of</p><h4 style="margin: 5;">${date}</h4></div><div style="float: right; margin-top: 30px; text-align: center; width: 200px;"><p style="font-weight: bold; margin: 5; margin-bottom: 10px;">J${instituteDataJson[0].data.name}</p><p style="margin: 5;"> and Dean of the Faculty of ${instituteDataJson[0].data.courseDepartment}</p></div></div></div>`,
      fileName: `Certificate${Date.now()}`,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log("file.filePath");
    console.log(file.filePath);
    Alert.alert("Your file is saved to the path : " + file.filePath);
    // Linking.Open("file://" + file.filePath)
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
      console.log(error);
  }
  }
  const getValue = async () => {
    try {

      setIsLoading(true);

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


          const enrollmentData = await fetch(`${Links.Domain}/api/User/fetch_enrollment_data_by_student_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Student_id: StudentIdJson._id })
          });

          const enrollmentDataJson = await enrollmentData.json();

         
          // Institute_id: enrollmentDataJson[0].data.institute_id 

          console.log("enrollmentDataJson[0].data");
          if (enrollmentDataJson[0].id === 0) {

            setEnrollmentData(null);
          } else {

            setEnrollmentData(enrollmentDataJson[0].data);
          }

          // console.log("enrollmentDataJson[0].data");
          // console.log(enrollmentDataJson[0].data.student_id);
          // console.log("enrollmentDataJson[0].data");

          const certificateData = await fetch(`${Links.Domain}/api/User/certificate_data_by_student_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentId: enrollmentDataJson[0].data.student_id })
          });

          const certificateDataJson = await certificateData.json();
          // handle the certificateData data here
          console.log("certificateData")
          console.log(certificateDataJson.id)
          console.log("certificateData")

          if (certificateDataJson.id == 1) {
            if(certificateDataJson.data.length > 0){

              setMyCertificateData(certificateDataJson.data);
            }else{

              setMyCertificateData(null);
            }
          }else{
            setMyCertificateData(null);
          }


          console.log('Value retrieved successfully');
        }

        if (Type === "Institute") {

          const Institute_data = await fetch(`${Links.Domain}/api/User/Institute_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });

          const Institute_dataJson = await Institute_data.json();
          // handle the Institute_data data here
          setInstituteData(Institute_dataJson);

          const certificateData = await fetch(`${Links.Domain}/api/User/certificate_data_by_institute_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ InstituteId: Institute_dataJson._id })
          });

          const certificateDataJson = await certificateData.json();
          // handle the certificateData data here
          console.log("certificateDataJson");

          console.log(certificateDataJson);
          if (certificateDataJson.id === 1) {
            if (certificateDataJson.data.length > 0){
              setCertificateDataFornstitute(certificateDataJson.data);
            }else{

              setCertificateDataFornstitute(null);
            }
            
          }else{
            setCertificateDataFornstitute(null);

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


          const certificateData = await fetch(`${Links.Domain}/api/User/certificate_data_by_institute_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ InstituteId: instituteIdJson.institute_id  })
          });

          const certificateDataJson = await certificateData.json();
          // handle the certificateData data here
          console.log("certificateDataJson");
          console.log(certificateDataJson);
          if (certificateDataJson.id === 1) {
            if (certificateDataJson.data.length > 0){

              setCertificateDataFornstitute(certificateDataJson.data);
            }else{

              setCertificateDataFornstitute(null);
            }
            
          }else{
            setCertificateDataFornstitute(null);

          }

        }


      } else {
        Alert.alert("Error retriveing value");
        console.log('Error retriveing value');
      }
      setIsLoading(false);
    } catch (error) {

      setIsLoading(false);
      Alert.alert("Error retriveing value");
      console.error(error);
    }
  }


  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
 getValue();
    }
  }, [isFocused]);


  useEffect(() => {
    // getAllCourse();
    const backAction = () => {
      // Do something else instead of exiting the app

      navigation.goBack(); // navigate back to previous screen
      // closeModal(); // close a modal
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const renderItem = ({ item }) => {

    console.log("item")
    console.log(item)
    console.log("item")
    return (

      <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
        
         <Image  source={{ uri: `${item.profilePhoto}` }} style={{  width: 60, height: 60, margin: 10,borderRadius:100}} />
       
        <View style={{ width: "60%", marginLeft: 10 }}>
          <Text>Name: {item.studentName}</Text>
          <Text>Course: {item.course}</Text>
          <Text>department: {item.department}</Text>
        </View>
        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {

          navigation.navigate("CertificateApprovement", { certificateId: item._id, semester: item.semester })

          // videoRef.current.presentFullscreenPlayer();
        }}>
          <Text style={{ color: 'white' }}>View</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItemForDownloadCertificate = ({ item }) => {
    return (

      <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
        {/* <Image source={{ uri: `https://studydoor.s3.amazonaws.com/${item.thumbnailUrl}` }} style={{ width: 50, height: 50, marginRight: 10 }} />
             */}
        {/* <View style={[styles.certificateImageContainer, { alignItems: "center", justifyContent: "center", backgroundColor: Color.Color.topHeaderBackground }]} >
          <Text style={{ color: "#fff", fontSize: 25 }}>S</Text>
        </View> */}
        <View style={{ width: "70%", marginLeft: 10 }}>
          <Text>Name: {item.studentName}</Text>
          <Text>Course: {item.course}</Text>
          <Text>department: {item.department}</Text>
          <Text>semester: {item.semester}</Text>
        </View>
        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
          downloadCertificateHandler(item._id,item.instituteId,item.createdAt)
          // navigation.navigate("CertificateApprovement", { certificateId: item._id, semester: item.semester })
          // console.log("DOWNLOAD")
          // videoRef.current.presentFullscreenPlayer();
        }}>
          <Text style={{ color: 'white' }}>Download</Text>
        </TouchableOpacity>
      </View>
    );
  };


  console.log("myCertificateData")
  console.log(myCertificateData)


  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Studydoor</Text>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size={50}
          color={Color.Color.bottomtabBackground}
          style={{ marginTop: "70%" }}
        />
      ) : (
        accType === "Student" ? (
          
          <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 80, width: "100%", height: "100%" }}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Studydoor</Text>
              </View>
            </View>
            {myCertificateData !== null ? (
            <FlatList
              data={myCertificateData}
              renderItem={renderItemForDownloadCertificate}
              keyExtractor={(item) => item._id} />
            ):(
              <View style={{ flexDirection: "row", alignSelf: "center"}}>
              <Text style={{ color: "red" }}  > No certificates available for you </Text>
            </View>
            )
            }

            {enrollmentData && <>
              <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", padding: 10, borderRadius: 5, margin: 20, backgroundColor: Color.Color.topHeaderBackground }}
                onPress={async () => {
                  const enrollmentDataRequest = await fetch(`${Links.Domain}/api/User/request_for_certificate`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      studentId: enrollmentData.student_id, instituteId: enrollmentData.institute_id, enrollmentId: enrollmentData._id, studentName: enrollmentData.studentName,
                      course: enrollmentData.courseName,
                      department: enrollmentData.courseDepartment,
                      number: enrollmentData.number,
                      semester: enrollmentData.semester,
                      profilePhoto: enrollmentData.studentProfilePic

                    })
                  }
                  );

                  const enrollmentDataJson = await enrollmentDataRequest.json();

                  if (enrollmentDataJson.id === 1) {
                    Alert.alert("Request submited is successfully");
                    navigation.goBack();
                  } else {
                    Alert.alert("Error submiting request, please try again later . . .");
                    navigation.goBack();
                  }

                }}
              >
                <Text style={{ color: "#fff" }}>
                  Request certificate for current samester
                </Text>

              </TouchableOpacity>
            </>
            }
          </View>) :
          accType === "Institute" ? 
          (
            <View style={{ height: "100%", width: "100%", paddingTop: 80 }}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>Studydoor</Text>
                </View>
              </View>
              <View>
                <SafeAreaView>


                  {certificateDataFornstitute !== null ? ( <FlatList
                    data={certificateDataFornstitute}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id} />
                  ):(
                    <View style={{ flexDirection: "column", alignSelf: "center", marginTop: "50%" }}>
                    <Text style={{ color: "red" }}  >There are no request for Certificate
                    </Text>
                  </View>
                  )
                  }
                </SafeAreaView>
              </View>
            </View>

          )
        :
        (
          <View style={{ height: "100%", width: "100%", paddingTop: 80 }}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Studydoor</Text>
            </View>
          </View>
          <View>
            <SafeAreaView>


              {certificateDataFornstitute !== null ? ( <FlatList
                data={certificateDataFornstitute}
                renderItem={renderItem}
                keyExtractor={(item) => item._id} />
              ):(
                <View style={{ flexDirection: "column", alignSelf: "center", marginTop: "50%" }}>
                <Text style={{ color: "red" }}  >There are no request for Certificate
                </Text>
              </View>
              )
              }
            </SafeAreaView>
          </View>
        </View>
        )
      )
      }
    </>
  )
}

export default Certificates

const styles = StyleSheet.create({
  certificateImageContainer: {
    height: 60,
    width: 60,
    borderRadius: 100,
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
    zIndex: 1
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // width:"100%"
  },
  headerText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
})