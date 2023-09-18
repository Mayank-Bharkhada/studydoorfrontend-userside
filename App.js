import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Videos from './srs/screens/Videos'
import Home from './srs/screens/Home';
import Books from './srs/screens/Books';
import Quiz from './srs/screens/Quiz';
import Messages from './srs/screens/Messages';
import 'react-native-gesture-handler';
import Color from './srs/constant/Color';
import Calender from './srs/screens/Calender';
import Chats from './srs/screens/Chats';
// import QandA from './srs/screens/QandA';
import Login from './srs/screens/Login';
import InstituteLogin from './srs/screens/InstituteLogin';
import CreateAccountForStudent from './srs/screens/CreateAccountForStudent';
import CreateAccountForInstitute from './srs/screens/CreateAccountForInstitute';
import ForgotPassword from './srs/screens/ForgotPassword';
import Otp from './srs/screens/Otp';
import ForgotSetPassword from './srs/screens/ForgotSetPassword';
import ChoiseForCreateAccount from './srs/screens/ChoiseForCreateAccount';
import StudentLogin from './srs/screens/StudentLogin';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './srs/navigator/DrawerContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VarifyIdentity from './srs/screens/VarifyIdentity';
import SubmitDocuments from './srs/screens/SubmitDocuments';
import Links from './srs/constant/Links';
import { useIsFocused } from '@react-navigation/native';
import GenerateCourse from './srs/screens/GenerateCourse';
import Enrollment from './srs/screens/Enrollment';
import EnrollmentDetails from './srs/screens/EnrollmentDetails';
import EnrollDetails from './srs/screens/EnrollDetails';
import EnrollConfirm from './srs/screens/EnrollConfirm';
import JoinLecture from './srs/screens/JoinLecture';
import FacultyAccounts from './srs/screens/FacultyAccounts';
import FacultyLogin from './srs/screens/FacultyLogin';
import VideoPlay from './srs/screens/VideoPlay';
import Certificates from './srs/screens/Certificates';
import CertificateApprovement from './srs/screens/CertificateApprovement';
import SplashScreen from 'react-native-splash-screen';



const HomeStack = createStackNavigator();
function HomeStackScreen({ navigation }) {

  return (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Color.Color.topHeaderBackground,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <HomeStack.Screen name="Home" options={{
        title: "Studydoor",
        headerRight: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 20,
          }}>

            <TouchableOpacity onPress={() => { navigation.navigate("Calender"); }}>

              <MaterialCommunityIcons style={{
                marginHorizontal: 15,
              }} name="calendar-multiple" size={30} color="#fff" />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { navigation.navigate("Messages"); }}>
              <MaterialCommunityIcons style={{
                marginLeft: 15,
              }} name="message-text-outline" size={30} color="#fff" onPress={() => { navigation.navigate("Messages"); }} />
            </TouchableOpacity>

          </View>
        ),
        headerLeft: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 10,
          }} >


            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} >
              <MaterialCommunityIcons style={{
                marginHorizontal: -5,
              }} name="format-align-left" size={30} color="#fff" onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
            </TouchableOpacity>
          </View>
        )

      }}
        children={() => <Home Value={true} />}
      />
    </HomeStack.Navigator>
  );
}
const VideosStack = createStackNavigator();
function VideosStackScreen({ navigation }) {

  return (
    <VideosStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Color.Color.topHeaderBackground,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <VideosStack.Screen name="Videos" options={{
        title: "Studydoor",
        headerRight: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 20,
          }}>

            <TouchableOpacity onPress={() => { navigation.navigate("Calender"); }}>

              <MaterialCommunityIcons style={{
                marginHorizontal: 15,
              }} name="calendar-multiple" size={30} color="#fff" />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { navigation.navigate("Messages"); }}>
              <MaterialCommunityIcons style={{
                marginLeft: 15,
              }} name="message-text-outline" size={30} color="#fff" onPress={() => { navigation.navigate("Messages"); }} />
            </TouchableOpacity>

          </View>
        ),
        headerLeft: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 10,
          }} >


            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} >
              <MaterialCommunityIcons style={{
                marginHorizontal: -5,
              }} name="format-align-left" size={30} color="#fff" onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
            </TouchableOpacity>
          </View>
        )


      }}
        children={() => <Videos Value={true} />}
      />
    </VideosStack.Navigator>
  );
}
const QuizStack = createStackNavigator();
function QuizStackScreen({ navigation }) {

  return (
    <QuizStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Color.Color.topHeaderBackground,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <QuizStack.Screen name="Quiz" options={{
        title: "Studydoor",
        headerRight: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 20,
          }}>

            <TouchableOpacity onPress={() => { navigation.navigate("Calender"); }}>

              <MaterialCommunityIcons style={{
                marginHorizontal: 15,
              }} name="calendar-multiple" size={30} color="#fff" />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { navigation.navigate("Messages"); }}>
              <MaterialCommunityIcons style={{
                marginLeft: 15,
              }} name="message-text-outline" size={30} color="#fff" onPress={() => { navigation.navigate("Messages"); }} />
            </TouchableOpacity>

          </View>
        ),
        headerLeft: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 10,
          }} >


            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} >
              <MaterialCommunityIcons style={{
                marginHorizontal: -5,
              }} name="format-align-left" size={30} color="#fff" onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
            </TouchableOpacity>
          </View>
        )


      }}
        children={() => <Quiz Value={true} />}
      />
    </QuizStack.Navigator>
  );
}

const BooksStack = createStackNavigator();
function BooksStackScreen({ navigation }) {

  return (
    <BooksStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Color.Color.topHeaderBackground,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <BooksStack.Screen name="Books" options={{
        title: "Studydoor",
        headerRight: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 20,
          }}>

            <TouchableOpacity onPress={() => { navigation.navigate("Calender"); }}>

              <MaterialCommunityIcons style={{
                marginHorizontal: 15,
              }} name="calendar-multiple" size={30} color="#fff" />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { navigation.navigate("Messages"); }}>
              <MaterialCommunityIcons style={{
                marginLeft: 15,
              }} name="message-text-outline" size={30} color="#fff" onPress={() => { navigation.navigate("Messages"); }} />
            </TouchableOpacity>

          </View>
        ),
        headerLeft: () => (
          <View style={{
            flexDirection: 'row',
            width: "auto",
            justifyContent: 'space-between',
            marginRight: 10,
          }} >


            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} >
              <MaterialCommunityIcons style={{
                marginHorizontal: -5,
              }} name="format-align-left" size={30} color="#fff" onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
            </TouchableOpacity>
          </View>
        )

      }}
        children={() => <Books Value={true} />}
      />
    </BooksStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
function HomeScreen() {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff" inactiveColor="#000" barStyle={{ backgroundColor: Color.Color.bottomtabBackground }} >
      <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{
        // tabBarBadge: 0,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home-analytics" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="VideosStackScreen" component={VideosStackScreen} options={{
        tabBarBadge: false,
        tabBarLabel: 'Videos',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="youtube" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="QuizStackScreen" component={QuizStackScreen} options={{
        tabBarBadge: false,
        tabBarLabel: 'Quiz',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="head-question-outline" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="BooksStackScreen" component={BooksStackScreen} options={{
        // tabBarBadge: 0,
        tabBarLabel: 'Books',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="book-open-page-variant" color={color} size={26} />
        ),
      }} />
    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();
function Studydoor() {

  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
      headerStyle: {
        backgroundColor: Color.Color.topHeaderBackground,
        shadowOpacity: 0,
        elevation: 0,
        height: 80
      },
      headerTintColor: "#fff",
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Messages" component={Messages}
        options={{
          // headerShown:false,
          title: "Message",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="Chats" component={Chats}
        options={{
          headerShown: false
        }}
      />
      {/* <Stack.Screen name="QandA" component={QandA}
        options={{
          title: "Multiple Choise Question",
          headerTitleAlign: "center",
        }}
      /> */}
      <Stack.Screen name="Calender" component={Calender} />
      <StackMain.Screen name="Enrollment" component={Enrollment} options={{
        // headerLeft:false,
        // title: "Studydoor",
        // headerTitleAlign:"left",  
        headerShown: false,
        // headerLeft:false
      }} />
      <StackMain.Screen name="EnrollmentDetails" component={EnrollmentDetails} options={{
        // headerLeft:false,
        title: "Studydoor",
        headerTitleAlign: "left",
        // headerShown:false,
        // headerLeft:false
      }} />
      <StackMain.Screen name="EnrollConfirm" component={EnrollConfirm} options={{
        // headerLeft:false,
        title: "Studydoor",
        headerTitleAlign: "left",
        // headerShown:false,
        // headerLeft:false
      }} />
      <StackMain.Screen name="JoinLecture" component={JoinLecture} options={{
        // headerLeft:false,
        // title: "Studydoor",
        // headerTitleAlign:"left",  
        headerShown: false,
        // headerLeft:false
      }} />
      <StackMain.Screen name="VideoPlay" component={VideoPlay} options={{
        // headerLeft:false,
        // title: "Studydoor",
        // headerTitleAlign:"left",  
        headerShown: false,
        // headerLeft:false
      }} />
      <StackMain.Screen name="CertificateApprovement" component={CertificateApprovement} options={{
        title: "Studydoor",
        headerTitleAlign: "left",
        // headerLeft:false
      }} />

    </Stack.Navigator>
  );
}


const Drawer = createDrawerNavigator();

function StudydoorMain({ navigation }) {

  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [dataShow, setDataShow] = useState(false);

  async function getValue() {
    try {
      const Type = await AsyncStorage.getItem("Type");
      console.log("Type");
      console.log(Type);
      console.log("Type");
      const Login = await AsyncStorage.getItem("Login");
      console.log(Login);
      const Email = await AsyncStorage.getItem("Email");
      console.log(Email);
      const Password = await AsyncStorage.getItem("Password");
      console.log("Password");
      console.log(Password);
      console.log("Password");
      if (Type !== null && Login !== null && Email !== null && Password !== null) {
        setAccountType(Type);
        setEmail(Email);

        // setPassword(Password);
        const settings = {
          method: 'Post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: Email,
          }),
        };
        let result;
        if (Type === "Student") {
          const fetchResponse = await fetch(`${Links.Domain}/api/User/Student_data`, settings);
          result = await fetchResponse.json();
          setData(result);
        } else if (Type === "Institute") {
          const fetchResponse = await fetch(`${Links.Domain}/api/User/Institute_data`, settings);
          result = await fetchResponse.json();
          setData(result);
        } else {
          setDataShow(true);
        }
        if (result.verified === 0) {
          // setDataShow(true);
          // navigation.navigate("Studydoor");
          navigation.navigate("VarifyIdentity");
        } else {
          setDataShow(true);
        }
      }
      setLoading(false);
      SplashScreen.hide();
    } catch (error) {
      setLoading(false);
      console.log('Error retrieving value:', error);
    }
  }

  useEffect(() => {
    setLoading(true)
    if (isFocused) {
      getValue();
    }
  }, [isFocused])

  return (<>
    {
      loading ? (
        <View style={{ backgroundColor: Color.Color.bottomtabBackground, height: "100%", alignItems: "center" }}>

          <ActivityIndicator
            size={50}
            color="#fff"
            style={{ marginTop: "80%" }}
          />
          <Text style={{ color: "#fff", marginTop: 20, fontSize: 20 }}>You are almost there</Text>
        </View>
      ) :
        acountType === "Student" && dataShow ?
          (
            <Drawer.Navigator initialRouteName='Studydoor'
              screenOptions={{
                headerShown: false,
                drawerActiveTintColor: Color.Color.bottomtabBackground,
              }
              }
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="Studydoor" component={Studydoor}
              />

              <Drawer.Screen name="Enrollment" component={Enrollment} />
              <Drawer.Screen name="Certificates" component={Certificates} />
            </Drawer.Navigator>
          ) :
          dataShow &&  acountType === "Institute" ?
          (
            <Drawer.Navigator initialRouteName='Studydoor'
              screenOptions={{
                headerShown: false,
                drawerActiveTintColor: Color.Color.bottomtabBackground,
              }
              }
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="Studydoor" component={Studydoor}
              />
              <Drawer.Screen name="GenerateCourse" component={GenerateCourse} />
              <Drawer.Screen name="EnrollDetails" component={EnrollDetails} />
              <Drawer.Screen name="FacultyAccounts" component={FacultyAccounts} />
              <Drawer.Screen name="Certificates" component={Certificates} />
            </Drawer.Navigator>
          ) :
          (dataShow &&  acountType === "Faculty" ) &&
          (
            <Drawer.Navigator initialRouteName='Studydoor'
              screenOptions={{
                headerShown: false,
                drawerActiveTintColor: Color.Color.bottomtabBackground,
              }
              }
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="Studydoor" component={Studydoor}
              />
              <Drawer.Screen name="EnrollDetails" component={EnrollDetails} />
              <Drawer.Screen name="Certificates" component={Certificates} />
            </Drawer.Navigator>
          )
    }
  </>
  );
}

const StackMain = createStackNavigator();


function App() {

  useEffect(() => {
    // SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <StackMain.Navigator initialRouteName='Login' screenOptions={{
        headerStyle: {
          backgroundColor: Color.Color.topHeaderBackground,
          shadowOpacity: 0,
          elevation: 0,
          height: 80
        },
        headerTintColor: "#fff",
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
        <StackMain.Screen name="Login" component={Login} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="StudentLogin" component={StudentLogin} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="InstituteLogin" component={InstituteLogin} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="FacultyLogin" component={FacultyLogin} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="ChoiseForCreateAccount" component={ChoiseForCreateAccount} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="CreateAccountForStudent" component={CreateAccountForStudent} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="CreateAccountForInstitute" component={CreateAccountForInstitute} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="ForgotPassword" component={ForgotPassword} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="ForgotSetPassword" component={ForgotSetPassword} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="Otp" component={Otp} options={{
          // headerLeft:false,
          // title: "Login",
          // headerTitleAlign:"center",  
          headerShown: false,
        }} />
        <StackMain.Screen name="VarifyIdentity" component={VarifyIdentity} options={{
          // headerLeft:false,
          title: "Studydoor",
          headerTitleAlign: "center",
          // headerShown:false,
          headerLeft: false
        }} />
        <StackMain.Screen name="SubmitDocuments" component={SubmitDocuments} options={{
          // headerLeft:false,
          title: "Studydoor",
          headerTitleAlign: "center",
          // headerShown:false,
          // headerLeft:false
        }} />
        <StackMain.Screen name="StudydoorMain" component={StudydoorMain} options={{
          headerShown: false,
        }} />
      </StackMain.Navigator>
    </NavigationContainer>
  );
}

export default App
