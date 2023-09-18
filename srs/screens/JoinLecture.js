

////////////////////////////////////////////////////////
//////////////////  Join  lecture  /////////////////////
////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import AgoraUIKit, { } from 'agora-rn-uikit';
import { Share, StyleSheet, Text, TouchableOpacity, Dimensions, StatusBar, BackHandler } from 'react-native';


const JoinLecture = ({ navigation, route }) => {
  const { ChannelName, ChannalToken } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  console.log("ChannelName")
  console.log(ChannelName)
  console.log(ChannalToken)
  console.log("ChannelName")
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [styleConfiguration, setStyleConfiguration] = useState({
    UIKitContainer: {
      paddingTop: "40%",
      paddingBottom: "10%",
    }
  });
  const [lectureCall, setlectureCall] = useState(false);
  const connectionData = {
    appId: '3b0b38080efd46a28c8b75387c66e8ff',
    channel: ChannelName,
    token: ChannalToken,
    // layout: 0

  };






  const callbacks = {

    EndCall: () => {
      navigation.goBack();
    },
  };

  const onShare = async () => {
    try {
      await Share.share({ message: connectionData.channel });
    } catch (error) {
      console.log(error);
    }
  };



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
    <>
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} styleProps={styleConfiguration} />
      {/* <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity> */}
      {
        isFullScreen ?
          (
            <TouchableOpacity style={styles.fullScreenButton} onPress={() => {
              setIsFullScreen(!isFullScreen);
              setStyleConfiguration({
                UIKitContainer: {
                  paddingTop: 170,
                  // paddingBottom:"10%",     
                }
              })
            }}>
              <Text style={styles.fullScreenButtonText}>[  ]</Text>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity style={styles.fullScreenButton} onPress={() => {
              setIsFullScreen(!isFullScreen);
              setStyleConfiguration({
                UIKitContainer: {
                  paddingTop: 170,
                  position: "absolute",
                  marginTop: -180,
                  height: screenHeight + 180,
                  width: screenWidth,
                }
              })
            }}>
              <Text style={styles.fullScreenButtonText}>[  ]</Text>
            </TouchableOpacity>
          )
      }


    </>
  )
}
export default JoinLecture;

const styles = StyleSheet.create({
  shareButton: {
    right: 0,
    width: 80,
    height: 40,
    margin: 25,
    borderRadius: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 1)",
  },
  shareButtonText: {
    fontSize: 16,
    color: "#fff"
  },
  fullScreenButton: {
    left: 0,
    width: 80,
    height: 40,
    margin: 25,
    borderRadius: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 1)",
  },
  fullScreenButtonText: {
    fontSize: 16,
    color: "#fff"
  },
});