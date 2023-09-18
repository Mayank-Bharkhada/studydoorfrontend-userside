// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { BackHandler } from 'react-native';
// import { ActivityIndicator } from 'react-native';
// import Color from '../constant/Color';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Input } from "@rneui/themed";

// import Icon from 'react-native-vector-icons/MaterialIcons';

// const SubmitDocuments = () => {
//   const [loading, setLoading] = useState(true);
//   const [acountType, setAccountType] = useState("");
//   const [accreditationCert, setAccreditationCert] = useState(null);
//   const [businessRegCert, setBusinessRegCert] = useState(null);


//   async function getValue() {
//     try {
//       const Type = await AsyncStorage.getItem("Type");
//       console.log(Type);
//       const Login = await AsyncStorage.getItem("Login");
//       console.log(Login);
//       const Email = await AsyncStorage.getItem("Email");
//       console.log(Email);
//       const Password = await AsyncStorage.getItem("Password");
//       console.log(Password);
//       if (Type !== null && Login !== null && Email !== null && Password !== null ) {
//         setAccountType(Type);
//         console.log('Value retrieved successfully');
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log('Error retrieving value:', error);
//     }
//   }

//   const handleSubmit = () => {
//     // Handle form submission here, for example by sending the files to a server
//     console.log(accreditationCert, businessRegCert);
//   };


//   useEffect(() => {
//     getValue();
//     // const backAction = () => {
//     //   BackHandler.exitApp();
//     //   // showMessageForTwoSeconds()
//     //   return true;
//     // };

//     // const backHandler = BackHandler.addEventListener(
//     //   'hardwareBackPress',
//     //   backAction
//     // );


//     // return () => backHandler.remove();

//     }, [])

//   return (
//     <>
//     {loading ? (
//       <ActivityIndicator
//       size={50}
//       color={Color.Color.bottomtabBackground}
//       style={{ marginTop: "60%" }}
//     />
//   ) : acountType === "Student" ? (
//     <View>
//       <Text>SubmitDocuments</Text>
//     </View>
//     ) :
//     (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Upload your accreditation and business registration certificates:</Text>

//       {/* <Input
//       acce
//             inputContainerStyle={{ borderBottomColor: "#000" }}
//             inputStyle={{ color: "#000", marginLeft: 20, }}
//             placeholder="Accreditation certificate"
//             // placeholderTextColor={"#000"}
//             leftIcon={
//               <Icon
//                 name='lock-open'
//                 size={24}
//                 color='#000'
//               />
//             }
//             // secureTextEntry={true}
//             defaultValue={accreditationCert}
//             // value={accreditationCert}
//             style={styles.inputBox}
//             onChangeText={(Value) => { setAccreditationCert(Value) }}
//             // autoCapitalize="none"
//             // errorStyle={{ color: passwordErrorText, fontSize: fontSizeShow }}
//             // errorMessage="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//           />

//       <Input
//             inputContainerStyle={{ borderBottomColor: "#000" }}
//             inputStyle={{ color: "#000", marginLeft: 20, }}
//             placeholder="Business registration certificate"
//             // placeholderTextColor={"#000"}
//             leftIcon={
//               <Icon
//                 name='lock-open'
//                 size={24}
//                 color='#000'
//               />
//             }
//             // secureTextEntry={true}
//             defaultValue={businessRegCert}
//             // value={accreditationCert}
//             style={styles.inputBox}
//             onChangeText={(Value) => { setBusinessRegCert(Value) }}
//             // autoCapitalize="none"
//             // errorStyle={{ color: passwordErrorText, fontSize: fontSizeShow }}
//             // errorMessage="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//           />
//           <TouchableOpacity style={styles.loginButton} onPress={() => { handleSubmit();}}  >
//             <Text style={styles.loginButtonText}> Confirm </Text>
//           </TouchableOpacity> */}
//     </View>
//     )
// }
// </>
//   )
// }

// export default SubmitDocuments

// const styles = StyleSheet.create({
//   inputContainer: {
//     // backgroundColor:"#fff",
//     margin: "10%",
//     marginBottom: 30,
//     padding: 0,
//   },
//   loginButton: { backgroundColor: Color.Color.topHeaderBackground, borderRadius: 100, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10,marginTop:10 },
//   loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 15 },
//   forgotButton: { backgroundColor: "#fff", borderRadius: 100, borderColor: "#000", borderWidth: 0.5 },
//   forgotButtonText: { color: "#000", height: 50, alignSelf: "center", padding: 11, fontSize: 15 }})
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Links from '../constant/Links';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../constant/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Icon } from 'react-native-vector-icons/Icon';

const SubmitDocuments = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [acountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [accreditationCertificateUri, setAccreditationCertificateUri] = useState(null);
  const [businessRegistrationCertificateUri, setBusinessRegistrationCertificateUri] = useState(null);
  const [officialTranscriptUri, setOfficialTranscriptUri] = useState(null);
  const [leavigCertificateUri, setLeavigCertificateUri] = useState(null);
  const [governmentIssuedIdentificationUri, setGovernmentIssuedIdentificationUri] = useState(null);


  const pickAccreditationCertificateUriDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setAccreditationCertificateUri(result);
      console.log(result.uri);
    } catch (err) {
      console.log(err);
    }
  };

  const pickBusinessRegistrationCertificateUriDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setBusinessRegistrationCertificateUri(result);
      console.log(result.uri);
    } catch (err) {
      console.log(err);
    }
  };

  const pickOfficialTranscriptUriDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setOfficialTranscriptUri(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const pickgovernmentIssuedIdentificationUriDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setGovernmentIssuedIdentificationUri(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const pickLeavigCertificateDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setLeavigCertificateUri(result);
      console.log(result.uri);
    } catch (err) {
      console.log(err);
    }
  };


  const uploadFileForInstitute = async () => {
    setLoading(true);
    if (!accreditationCertificateUri || !businessRegistrationCertificateUri) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('accreditationCertificate', {
      uri: accreditationCertificateUri[0].uri,
      type: accreditationCertificateUri[0].type,
      name: `${Date.now()}${accreditationCertificateUri[0].name}`,
    });
    formData.append('businessRegistrationCertificate', {
      uri: businessRegistrationCertificateUri[0].uri,
      type: businessRegistrationCertificateUri[0].type,
      name: `${Date.now()}${businessRegistrationCertificateUri[0].name}`,
    });
    formData.append('Email', email);
    console.log(formData);

    try {
      const response = await fetch(`${Links.Domain}/api/User/institute/Varification_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const responseData = await response.json();
      if (responseData[0].id === 1) {
        navigation.navigate("VarifyIdentity");
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("there are some problem please try after some time")
      }
      console.log(responseData);
      console.log(responseData);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const uploadFileForStudent = async () => {
    setLoading(true);
    if (!officialTranscriptUri || !leavigCertificateUri || !governmentIssuedIdentificationUri) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('officialTranscript', {
      uri: officialTranscriptUri[0].uri,
      type: officialTranscriptUri[0].type,
      name: `${Date.now()}${officialTranscriptUri[0].name}`,
    });
    formData.append('leavigCertificate', {
      uri: leavigCertificateUri[0].uri,
      type: leavigCertificateUri[0].type,
      name: `${Date.now()}${leavigCertificateUri[0].name}`,
    });
    formData.append('governmentIssuedIdentification', {
      uri: governmentIssuedIdentificationUri[0].uri,
      type: governmentIssuedIdentificationUri[0].type,
      name: `${Date.now()}${governmentIssuedIdentificationUri[0].name}`,
    });
    formData.append('Email', email);

    console.log(formData);

    try {
      const response = await fetch(`${Links.Domain}/api/User/student/Varification_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const responseData = await response.json();

      if (responseData[0].id === 1) {
        navigation.navigate("VarifyIdentity");
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("there are some problem please try after some time")
      }
      console.log(responseData);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert("there are some problem please try after some time");
    }
  };




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
      console.log(Password);
      if (Type !== null && Login !== null && Email !== null && Password !== null) {
        setAccountType(Type);
        setEmail(Email);
        // setPassword(Password);
        // const settings = {
        //   method: 'Post',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     Email: Email,
        //   }),
        // };
        // let result;
        // if(Type === "Student"){
        //   const fetchResponse = await fetch(`${Links.Domain}api/User/Student_data`, settings);
        //   result = await fetchResponse.json();
        //   setData(result);
        // }else{
        //   const fetchResponse = await fetch(`${Links.Domain}/api/User/Institute_data`, settings);
        //   result = await fetchResponse.json();
        //   setData(result);
        // }
        console.log('Value retrieved successfully');
        //     console.log("data.varified");
        // console.log(result);
        // console.log("data.varified");
        //  if(result.varified === 0){
        // setDataShow(true);
        // navigation.navigate("VarifyIdentity");
        // }else{
        // setDataShow(true);
        // }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error retrieving value:', error);
    }
  }

  useEffect(() => {
    getValue();
  }, [])

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
  return (
    <View style={styles.container}>
      {
        loading ? (
          <ActivityIndicator
            size={40}
            color={Color.Color.topHeaderBackground}
            style={{ marginTop: "40%" }}
          />
        ) :
          acountType === "Student" ?
            (

              <><View style={{ height: "20%", width: "80%", alignItems: "center", borderColor: "#000", borderWidth: 1, borderStyle: "dashed", margin: 10, borderRadius: 5 }}>
                <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]} onPress={pickOfficialTranscriptUriDocument}>
                  <Icon
                    name='add-circle-outline'
                    size={24}
                    color="#fff"
                    style={{ marginRight: 5 }} />
                  <Text style={styles.buttonText}>Pick a file </Text>
                </TouchableOpacity>

                {officialTranscriptUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 5, borderStyle: "dotted" }}>{officialTranscriptUri[0].name}</Text>}
                {!officialTranscriptUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 10, borderStyle: "dotted" }}>Official Transcript:</Text>}
              </View>
                <View style={{ height: "20%", width: "80%", alignItems: "center", borderColor: "#000", borderWidth: 1, borderStyle: "dashed", margin: 10, borderRadius: 5 }}>
                  <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]} onPress={pickLeavigCertificateDocument}>
                    <Icon
                      name='add-circle-outline'
                      size={24}
                      color="#fff"
                      style={{ marginRight: 5 }} />
                    <Text style={styles.buttonText}>Pick a file </Text>
                  </TouchableOpacity>

                  {leavigCertificateUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 5, borderStyle: "dotted" }}>{leavigCertificateUri[0].name}</Text>}
                  {!leavigCertificateUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 10, borderStyle: "dotted" }}>Leavig Certificate</Text>}
                </View>
                <View style={{ height: "20%", width: "80%", alignItems: "center", borderColor: "#000", borderWidth: 1, borderStyle: "dashed", margin: 10, borderRadius: 5 }}>
                  <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]} onPress={pickgovernmentIssuedIdentificationUriDocument}>
                    <Icon
                      name='add-circle-outline'
                      size={24}
                      color="#fff"
                      style={{ marginRight: 5 }} />
                    <Text style={styles.buttonText}>Pick a file</Text>
                  </TouchableOpacity>

                  {governmentIssuedIdentificationUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 5, borderStyle: "dotted" }}>{governmentIssuedIdentificationUri[0].name}</Text>}
                  {!governmentIssuedIdentificationUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 10, borderStyle: "dotted" }}>Leavig Certificate</Text>}
                </View><TouchableOpacity style={[styles.button, { marginTop: 50, width: "80%", alignItems: "center", padding: 12 }]} onPress={uploadFileForStudent}
                  disabled={!officialTranscriptUri || !leavigCertificateUri || !governmentIssuedIdentificationUri}>
                  <Text style={styles.buttonText}>Upload file</Text>
                </TouchableOpacity></>

            ) :

            (
              <><View style={{ height: "20%", width: "80%", alignItems: "center", borderColor: "#000", borderWidth: 1, borderStyle: "dashed", margin: 10, borderRadius: 5 }}>
                <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]} onPress={pickAccreditationCertificateUriDocument}>
                  <Icon
                    name='add-circle-outline'
                    size={24}
                    color="#fff"
                    style={{ marginRight: 5 }} />
                  <Text style={styles.buttonText}>Pick a files</Text>
                </TouchableOpacity>

                {accreditationCertificateUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 5, borderStyle: "dotted" }}>{accreditationCertificateUri[0].name}</Text>}
                {!accreditationCertificateUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 10, borderStyle: "dotted" }}>Accreditation Certificate</Text>}
              </View>
                <View style={{ height: "20%", width: "80%", alignItems: "center", borderColor: "#000", borderWidth: 1, borderStyle: "dashed", margin: 10, borderRadius: 5 }}>
                  <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]} onPress={pickBusinessRegistrationCertificateUriDocument}>
                    <Icon
                      name='add-circle-outline'
                      size={24}
                      color="#fff"
                      style={{ marginRight: 5 }} />
                    <Text style={styles.buttonText}>Pick a file</Text>
                  </TouchableOpacity>

                  {businessRegistrationCertificateUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 5, borderStyle: "dotted" }}>{businessRegistrationCertificateUri[0].name}</Text>}
                  {!businessRegistrationCertificateUri && <Text style={{ marginTop: 20, borderWidth: 0.5, padding: 10, borderStyle: "dotted" }}>Business Registration Certificate</Text>}
                </View><TouchableOpacity style={[styles.button, { marginTop: 50, width: "80%", alignItems: "center", padding: 12 }]} onPress={uploadFileForInstitute}
                  disabled={!accreditationCertificateUri || !businessRegistrationCertificateUri}>
                  <Text style={styles.buttonText}>Upload files</Text>
                </TouchableOpacity></>
            )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Color.Color.topHeaderBackground,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginTop: 0,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SubmitDocuments;



