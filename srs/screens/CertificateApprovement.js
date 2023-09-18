import { Alert, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator,StatusBar,BackHandler,Image  } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import Links from '../constant/Links';
import Color from '../constant/Color';

import { useIsFocused } from '@react-navigation/native';

const CertificateApprovement = ({ route }) => {

  const { certificateId, semester } = route.params;
  const [enrollData, setEnrollData] = useState(null)
  const [avgTestMarks, setAvgTestMarks] = useState(null)
  const [watchedVideoAverage, setWatchedVideoAverage] = useState(null)
  const navigation = useNavigation();


  const [isLoading, setIsLoading] = useState(true);


  const handleCancel = async () => {
    setIsLoading(true);
    // console.log(certificateId)
    try {


      const deleteCertificateData = await fetch(`${Links.Domain}/api/User/delete_certificate_by_id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ certificateId: certificateId })
      });

      const deleteCertificateDataJson = await deleteCertificateData.json();

      if (deleteCertificateDataJson.id === 1) {
        Alert.alert("Request is cancled successfully");
      } else {
        Alert.alert("not able to cancle request");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("not able to cancle request");
    }

  }

  const handleApprove = async () => {
    try {

      setIsLoading(true);
      console.log(certificateId)
      const approveCertificateData = await fetch(`${Links.Domain}/api/User/approve_certificate_by_id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ certificateId: certificateId,semester: semester })
      });

      const approveCertificateDataJson = await approveCertificateData.json();

      if (approveCertificateDataJson.success === true) {
        Alert.alert("Approve successfully");
        navigation.goBack()
      } else {
        Alert.alert("not able to Approve  request");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("not able to Approve request");
    }
  }

  const getData = async () => {
    setIsLoading(true);
    try {
      const enrollmentData = await fetch(`${Links.Domain}/api/User/enrollment_data_by_certificate_id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ certificateId: certificateId })
      });

      const enrollmentDataJson = await enrollmentData.json();

      if (enrollmentDataJson.id === 1) {

        const totalVideos = await fetch(`${Links.Domain}/api/User/total_videos_by_institute_id_and_student_semester`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ instituteId: enrollmentDataJson.data.enrollment.institute_id, semester: semester })
        });

        const totalVideosJson = await totalVideos.json();

        const totalWatchedVideos = enrollmentDataJson.data.enrollment.watchedVideos.length;
        console.log("totalWatchedVideos")
        console.log(totalWatchedVideos)
        console.log("totalWatchedVideos")
        if (totalVideosJson.id === 1) {


          const totalVideosNew = totalVideosJson.totalVideos;
          console.log("totalVideosNew")
          console.log(totalVideosNew)
          console.log("totalVideosNew")

          const examResults = enrollmentDataJson.data.enrollment.givenExam;
          let totalMarks = 0;
          examResults.forEach((result) => {
            totalMarks += result.marks;
          });
          const averageMark = totalMarks / examResults.length;
          setAvgTestMarks(averageMark);
          setEnrollData(enrollmentDataJson.data)
          if (totalVideosNew) {
            setWatchedVideoAverage(totalWatchedVideos * 100 / totalVideosNew)
          } else {
            setWatchedVideoAverage(100)
          }
        }

      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      Alert.alert("Error : server Error");
    }
  }
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
 getData();
    }
  }, [isFocused]);


  useEffect(() => {
    const backAction = () => {
      // Do something else instead of exiting the app
      navigation.goBack();
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

  return (<>
    {isLoading ? (
      <ActivityIndicator
        size={50}
        color={Color.Color.bottomtabBackground}
        style={{ marginTop: "70%" }}
      />
    ) : (
      enrollData &&
      <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <Image  source={{ uri: `${enrollData.enrollment.studentProfilePic}` }} style={{alignSelf:"center",  width: 150, height: 150, margin: 10}} />
        <View style={{ width: '60%', borderWidth: 1, borderColor: 'gray', borderRadius: 10, overflow: 'hidden' }}>
          
          <View style={[styles.tableRow, { backgroundColor: Color.Color.topHeaderBackground }]}>
            <View style={[styles.cell, { borderRightWidth: 1, borderColor: '#fff', paddingLeft: 10 }]}>
              <Text style={{ color: "#fff", fontSize: 20 }}>Title</Text>
            </View>
            <View style={[styles.cell, { paddingLeft: 10 }]}>
              <Text style={{ color: "#fff", fontSize: 20 }}>Details</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
              <Text>ID:</Text>
            </View>
            <View style={[styles.cell, { paddingLeft: 10 }]}>
              <Text>{enrollData.enrollment._id}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
              <Text>Name:</Text>
            </View>
            <View style={[styles.cell, { paddingLeft: 10 }]}>
              <Text>{enrollData.enrollment.studentName}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
              <Text>Semester:</Text>
            </View>
            <View style={[styles.cell, { paddingLeft: 10 }]}>
              <Text>{semester}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
              <Text>Test Average:</Text>
            </View>
            <View style={[styles.cell, { paddingLeft: 10 }]}>
              <Text>{avgTestMarks}%</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.cell, { borderRightWidth: 1, borderColor: 'gray', paddingLeft: 10 }]}>
              <Text>Video Average:</Text>
            </View>
            <View style={[styles.cell, { paddingLeft: 10 }]}>
              <Text>{watchedVideoAverage}%</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: "darkred", marginRight: 10, padding: 10 }}
            onPress={() => handleCancel()}
          >
            <Text style={{ color: 'white' }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: Color.Color.topHeaderBackground, padding: 10 }}
            onPress={() => handleApprove()}
          >
            <Text style={{ color: 'white' }}>Approve</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
    }
  </>
  )
}

export default CertificateApprovement

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
  },
})