import { StyleSheet, Text, View, ActivityIndicator, BackHandler, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Video from 'react-native-video';
import Color from '../constant/Color';
import { useNavigation } from '@react-navigation/native';
import Links from '../constant/Links';

const VideoPlay = ({ route }) => {

  const videoRef = useRef(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  console.log(route.params)


  const navigation = useNavigation();

  useEffect(() => {
    // getValue();
    const backAction = () => {
      // Do something else instead of exiting the app
      navigation.goBack();
      // closeModal(); // close a modal
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  console.log(route.params.thumbnailUrl)
  return (
    <View style={styles.videoContainer}>
      {isVideoLoading &&
        <View style={styles.videoLoadingContainer}>
          <ActivityIndicator
            size={50}
            color={Color.Color.bottomtabBackground}
            style={{ marginTop: 0 }}
          />
        </View>}


      <Video
        ref={videoRef}
        source={{ uri: `https://studydoor.s3.amazonaws.com/${route.params.videoUrl}` }}
        poster={`https://studydoor.s3.amazonaws.com/${route.params.thumbnailUrl}`}
        posterResizeMode="stretch"
        //  posterStyle={styles.poster}
        style={styles.videoMain}
        muted={false}
        controls={true}
        resizeMode="stretch"
        fullscreen={true}
        useNativeControls={true}
        onBuffer={() => {
          isVideoLoading(true)
        }}
        onLoad={
          (value) => {
            console.log("value")
            console.log(value)
            console.log("value")
            setIsVideoLoading(false)
          }
        }
        onEnd={
          // () =>{
          //   console.log("end end end")
          // }

          async () => {
            const videoSeen = await fetch(`${Links.Domain}/api/User/video_seen`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ student_id: route.params.studentId, video_id: route.params.videoId })
            });
            const videoSeenJson = await videoSeen.json();

            if (videoSeenJson.id === 1) {
              Alert.alert("Note : You have completed this video, this will be added to your overall growth");
              navigation.goBack();
            } else {
              Alert.alert("if you have watched the video ignore this Error : You have not completed this video, this will be added to your overall growth. try again later . . .");
              navigation.goBack();
            }
          }
        }
        onError={() => {
          Alert.alert("Error : server error please try later ")
        }}
      />

    </View>


  )
}

export default VideoPlay

const styles = StyleSheet.create({
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  videoLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoMain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  playPauseButton: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  seekButton: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 10,
  },
  timeLabel: {
    color: '#FFF',
    fontSize: 16,
  },
})