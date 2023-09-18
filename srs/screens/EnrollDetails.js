

import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../constant/Color'
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import Links from '../constant/Links';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useIsFocused } from '@react-navigation/native';



const EnrollDetails = ({ navigation }) => {

  const [filteredenrollments, setFilteredEnrollments] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateSearch = (search) => {
    const filteredenrollments = enrollments.filter((item) =>
      item.courseName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEnrollments(filteredenrollments);
    console.log(search);
  };

  const searchItems = (search) => {
    const filteredenrollments = enrollments.filter((item) =>
      item.courseName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEnrollments(filteredenrollments);
    console.log(search);
  };

  const searchClear = () => {
    setFilteredEnrollments(null);
  };

  const getValue = async () => {
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
        if (Type === "Institute") {
          console.log("start");
          const data = {
            Email: Email,
          };
          const response = await fetch(`${Links.Domain}/api/User/getAllEnrollments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const responseJson = await response.json();
          // handle the response data here
          if (responseJson[0].id === 0) {
            setEnrollments(null);
          } else {
            if (responseJson[0].data.length > 0) {
              setEnrollments(responseJson[0].data);
            } else {
              setEnrollments(null);
            }
          }
          
        }else{

          const instituteId = await fetch(`${Links.Domain}/api/User/Faculty_data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: Email })
          });
          const instituteIdJson = await instituteId.json();


          const instituteData = await fetch(`${Links.Domain}/api/User/institute_data_by_id`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Institute_id: instituteIdJson.institute_id })
          });

          const instituteDataJson = await instituteData.json();

          const data = {
            Email: instituteDataJson[0].data.email,
          };

          const response = await fetch(`${Links.Domain}/api/User/getAllEnrollments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const responseJson = await response.json();
          // handle the response data here
          if (responseJson[0].id === 0) {
            setEnrollments(null);
          } else {
            if (responseJson[0].data.length > 0) {
              setEnrollments(responseJson);
            } else {
              setEnrollments(null);
            }
          }
        }

        // setEnrollments(responseJson[0].data);
        console.log('Value retrieved successfully');
        // setLoading(false);

      }
    } catch (error) {
      console.log('Error retrieving value:', error);
    }
  }



  const renderItem = ({ item }) => {
console.log("item")
if(item.data[0].confirm ===1){
  return null
}


    return (
      <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>

<Image  source={{ uri: `${item.studentProfilePic}` }} style={{  width: 60, height: 60, margin: 10}} />
        <View style={{ width: "60%" }}>
          <Text>studentName: {item.studentName}</Text>
          <Text>Course: {item.courseName}</Text>
          <Text>Department: {item.courseDepartment}</Text>
        </View>
        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
          console.log("navigate")
          navigation.navigate('EnrollConfirm', {
            Enroll_id: item._id,
            Student_id: item.student_id,
            Institute_id: item.institute_id,
            Name: item.studentName,
            studentProfilePic: item.studentProfilePic,
            Course: item.courseName,
            courseDepartment: item.courseDepartment,
          });
        }}>
          <Text style={{ color: 'white' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
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


  console.log("data")
  console.log(enrollments)
  console.log(filteredenrollments)
  return (
    // const { spinnerVisibility } = this.state;
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Studydoor</Text>
        </View>
      </View>

      {(filteredenrollments !== null || enrollments !== null) ? (
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
          value={filteredenrollments}
          autoCorrect={false}
          clearIcon={() => <Icon name="clear" size={27} color="#000" onPress={() => searchClear()} />}
          />

      </View>
      <View style={{marginTop:75}}>
        <SafeAreaView>

          {filteredenrollments ? (<FlatList
            data={filteredenrollments}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            />) :
            enrollments && (<FlatList
              data={enrollments}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />)
          }


        </SafeAreaView>
      </View>
      </>
      ) :(
        <View style={{ flexDirection: "column", alignSelf: "center",}}>
                          <Text style={{ color: "red" }}  >There are no enrollments done yet, Wait for enrolments
                          </Text>
          </View>
      )
}
      </View>
      )
}


const styles = StyleSheet.create({
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
    // width:"100%"
  },
  headerText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchHeading: {
    // flex:"flase",
    position: 'absolute',
    top: 80,
    left: 0,
    width: "100%",
    // backgroundColor: Color.Color.topHeaderBackground,
    // paddingTop: 5,
  },
})

export default EnrollDetails

