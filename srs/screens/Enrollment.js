

import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert, StatusBar } from 'react-native'
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


const Enrollment = () => {
const navigation = useNavigation();
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userUuid, setUserUuid] = useState(null);
  const [courses, setCourses] = useState([]);
  const updateSearch = (search) => {
    const filteredCourses = courses.filter((item) =>
      item.courseName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
    console.log(search);
  };

  const searchItems = (search) => {
    const filteredCourses = courses.filter((item) =>
      item.courseName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
    console.log(search);
  };

  const searchClear = () => {
    setFilteredCourses(null);
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
        console.log("start");
        const response = await fetch(`${Links.Domain}/api/User/getAllcourses`);
        const data = await response.json();
        // handle the response data here
        console.log(data);
        if (data[0].id  === 1) {
          if(data[0].data.length > 0){
          setCourses(data[0].data);
        }else{

          setCourses(null);
        }

        } else {
          setCourses(null);
        }

        const StudentId = await fetch(`${Links.Domain}/api/User/Student_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Email: Email })
        });
        const StudentIdJson = await StudentId.json();

        setUserName(StudentIdJson.UserName);
        setUserUuid(StudentIdJson.UserUuid);

      } else {
        Alert.alert("Error Retriving value.")
      }


    } catch (error) {
      console.error(error);
    }
  }

  
  const renderItem = ({ item }) => {
  console.log("item")
  console.log(item)
  
  return(
    <View style={{ flexDirection: "row", alignItems: 'center', padding: 10, width: "100%" }}>
        <Image  source={{ uri: `${item.profilePhoto}` }} style={{ width: 50, height: 50, marginRight: 10, borderRadius:100 }} />
      <View style={{ width: "70%" }}>
        <Text>Name: {item.name}</Text>
        <Text>Course: {item.courseName}</Text>
        <Text>Department: {item.department}</Text>
      </View>
      <TouchableOpacity style={{ padding: 10, backgroundColor: Color.Color.topHeaderBackground }} onPress={() => {
        console.log("navigate")
        navigation.navigate('EnrollmentDetails', {
          _id: item._id,
          Institute_id: item.institute_id,
          CourseName: item.courseName,
          UserName: userName,
          UserUuid: userUuid,
          Department: item.department,
        });
        console.log(item)
      }}>
        <Text style={{ color: 'white' }}>Enroll</Text>
      </TouchableOpacity>
    </View>
  );}


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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}> 
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Studydoor</Text>
        </View>
      </View>
      <View style={styles.searchHeading}>
        <SearchBar
          placeholder="Search Here..."
          round
          containerStyle={{ marginTop: 0, backgroundColor: Color.Color.topHeaderBackground, borderTopColor: Color.Color.bottomtabBackground, borderBottomColor: Color.Color.bottomtabBackground }}
          inputContainerStyle={{ marginHorizontal: "5%", height: 25, marginBottom: 20, paddingVertical: 20, paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 25 }}
          // value={this.state.searchValue}
          searchIcon={() => <Icon name="search" size={27} onPress={() => searchItems(search)} color="#000" />}
          onChangeText={updateSearch}
          value={filteredCourses}
          autoCorrect={false}
          clearIcon={() => <Icon name="clear" size={27} color="#000" onPress={() => searchClear()} />}
        />

      </View>
      <View style={{marginTop:75}}>
        <SafeAreaView>

          {
            courses === null ? (
              <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                         <Text style={{color:"red"}}>There is no course have provided by any institute</Text>
               </View>

                ) : filteredCourses !==null ?
                (
                <FlatList
                  data={filteredCourses}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                />
                ):
                courses  &&
                (
                <FlatList
                  data={courses}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                />
                )
            }

  


        </SafeAreaView>
      </View>
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
    // flexDirection:"row",
    width: "100%",
    position: 'absolute',
    top: 80,
    left: 0,
    // paddingTop: 5,
  },
})

export default Enrollment

