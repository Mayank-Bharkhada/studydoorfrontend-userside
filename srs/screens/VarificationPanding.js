import { StyleSheet, Text, View,Image,BackHandler } from 'react-native'
import React from 'react'
import Color from '../constant/Color'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const VarificationPanding = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setScreen();

      const backAction = () => {
        // Do something else instead of exiting the app
        BackHandler.exitApp();
        // closeModal(); // close a modal
        return true;
      };
  
      // getValue();
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();

  }, [])
  return (
    <View style={{alignItems:'center',justifyContent:"center",height:"100%",backgroundColor:`rgba(13, 136, 56, 0.03 )`}}>
  <Image
   source={require('../../assets/PandingAccount.png')}
   style={{ width: 350, height: 350, margin:50 }}
 />
 <TouchableOpacity style={styles.loginButton} onPress={() =>{}}  >
     <Text style={styles.loginButtonText} > Please Wait For Approvel </Text>
   </TouchableOpacity>
 <Text style={{fontSize:12,marginTop:50,justifyContent:"space-around",color:"orange"}}>*Your have submitted document, please wait </Text>
 <Text style={{fontSize:12,marginTop:0,justifyContent:"space-around",color:"orange"}}>It can take up to 3 business days</Text>  
</View>
  )
}

export default VarificationPanding

const styles = StyleSheet.create({
  loginButton: { backgroundColor: "#000419" , borderRadius: 5, borderColor: Color.Color.topHeaderBackground, borderWidth: 0.5, marginBottom: 10,padding:10 },
  loginButtonText: { color: "#fff", height: 50, alignSelf: "center", padding: 11, fontSize: 20 },
})
