

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
  TouchableOpacity
  ,StatusBar 
} from 'react-native';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
} from 'react-native-agora-chat';

import React, { useEffect, useState } from 'react'
import Color from '../constant/Color'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import { SearchBar } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { ScrollView } from 'react-native';
import { BackHandler, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';



// Defines the App object.
const Chats = ({ route, navigation }) => {
  // const {senderUserName, senderUuid, targetUserName } = route.props;
  console.log(route.props)
  const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/studydoor/chat`;
  const filePath = `${directoryPath}/${route.params.targetUserName}.txt`;


  async function checkStoragePermissions() {
    try {
      const readGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const writeGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (readGranted && writeGranted) {
        console.log('Read and write permissions granted!');
      } else {
        console.log('Read and write permissions not granted, requesting...');
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
          console.log('Read and write permissions granted!');
        } else {
          console.log('Read and write permissions denied!');
        }
      }
    } catch (error) {
      console.log('Error checking storage permissions:', error);
    }
  }


  useEffect(() => {
    checkStoragePermissions();
    // 

  }, [])

  // console.log(route.params.msgData)
  // Defines the variable.
  const title = 'Message';
  // Replaces <your appKey> with your app key.
  const appKey = '41951683#1112484';
  // console.log(route)
  // Replaces <your userId> with your user ID.
  const [username, setUsername] = React.useState(route.params.senderUserName);
  // Replaces <your agoraToken> with your Agora token.
  const [chatToken, setChatToken] = React.useState(route.params.senderUuid);
  const [targetUserName, setTargetUserName] = React.useState(route.params.targetUserName);
  const [content, setContent] = React.useState('');
  const [msgData, setMsgData] = React.useState(JSON.parse(route.params.msgData));
  const [logText, setWarnText] = React.useState([{}]);
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;
  // Outputs console logs.




  useEffect(() => {

    const setMessageListener = () => {
      chatManager.removeAllMessageListener();
      let msgListener = {
        async onMessagesReceived(messages) {
          console.log("messages")
          console.log(messages)
          console.log("messages")
          console.log("received")
          setMsgData([...msgData, {
            type: "receive",
            txt: messages[0].body.content
          },]);
          const isCreated = await createDirectoryAndFile(msgData,messages[0].body.content,"send");
       
          if (isCreated == 1) {

            console.log("received successfully")
            // setMsgData([...msgData, {
            //   type: "receive",
            //   txt: messages[0].body.content
            // },]);
          } else {
            console.log("received")
            setMsgData([...msgData, {
              type: "receive",
              txt: "Error receivinge msg"
            },]);
          }

        },
        onCmdMessagesReceived: messages => { },
        onMessagesRead: messages => { },
        onGroupMessageRead: groupMessageAcks => { },
        onMessagesDelivered: messages => { },
        onMessagesRecalled: messages => { },
        onConversationsUpdate: () => { },
        onConversationRead: (from, to) => { },
      };
      chatManager.addMessageListener(msgListener);
    };
    // Initializes the SDK.
    // Initializes any interface before calling it.
    const init = () => {

      let o = new ChatOptions({
        autoLogin: false,
        appKey: appKey,
      });
      chatClient.removeAllConnectionListener();
      chatClient
        .init(o)
        .then(() => {
          console.log('init success');

          this.isInitialized = true;
          if (this.isInitialized === false || this.isInitialized === undefined) {
            console.log('Perform initialization first.');
            return;
          }
          console.log('start logout ...');
          chatClient
            .logout()
            .then(() => {
              console.log('logout success.');
              console.log('start login ...');
              chatClient
                .loginWithAgoraToken(username, chatToken)
                .then(() => {
                  console.log('login operation success.');
                })
                .catch(reason => {
                  console.log('login fail: ' + JSON.stringify(reason));
                });
            })
            .catch(reason => {
              console.log('logout fail:' + JSON.stringify(reason));
              console.log('start login ...');
              chatClient
                .loginWithAgoraToken(username, chatToken)
                .then(() => {
                  console.log('login operation success.');
                })
                .catch(reason => {
                  console.log('login fail: ' + JSON.stringify(reason));
                });
            });




          let listener = {
            onTokenWillExpire() {
              console.log('token expire.');
            },
            onTokenDidExpire() {
              console.log('token did expire');
            },
            onConnected() {
              // console.log('onConnected');
              setMessageListener();
            },
            onDisconnected(errorCode) {
              console.log('onDisconnected:' + errorCode);
            },
          };
          chatClient.addConnectionListener(listener);
        })
        .catch(error => {
          console.log(
            'init fail: ' +
            (error instanceof Object ? JSON.stringify(error) : error),
          );
        });
    };
    init();


    // Registers listeners for messaging.

  }, [chatClient, chatManager, appKey, msgData]);



  const createDirectoryAndFile = async (Data, content, type) => {
    try {

      let newData = Data;
      newData.push({"txt": content, "type": type});

      const directoryExists = await RNFS.exists(directoryPath);

      if (!directoryExists) {
        await RNFS.mkdir(directoryPath);
        console.log('Directory created:', directoryPath);
      }

      const fileExists = await RNFS.exists(filePath);
      
  
      const messageSaved = await RNFS.writeFile(filePath, JSON.stringify(newData));
     


      return 1;

    } catch (error) {
      console.log('Error creating directory or file:', error);
      return 0;
    }
  };


  useEffect(() => {





    const backAction = async () => {



      if (this.isInitialized === false || this.isInitialized === undefined) {
        console.log('Perform initialization first.');
        navigation.goBack();
      }
      console.log('start logout ...');
      chatClient
        .logout()
        .then(() => {
          console.log('logout success.');
        })
        .catch(reason => {
          console.log('logout fail:' + JSON.stringify(reason));
        });

      navigation.goBack(); // navigate back to previous screen
      // closeModal(); // close a modal

    };



    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [username, chatToken, msgData]);






  // console.log('start login ...');
  // chatClient
  //   .loginWithAgoraToken(username, chatToken)
  //   .then(() => {
  //     console.log('login operation success.');
  //   })
  //   .catch(reason => {
  //     console.log('login fail: ' + JSON.stringify(reason));
  //   });


  const sendmsg = () => {
    if (this.isInitialized === false || this.isInitialized === undefined) {
      console.log('Perform initialization first.');
      return;
    }
    let msg = ChatMessage.createTextMessage(
      targetUserName,
      content,
      ChatMessageChatType.PeerChat,
    );
    const callback = new (class {
      onProgress(locaMsgId, progress) {
        console.log(`send message process: ${locaMsgId}, ${progress}`);
      }
      onError(locaMsgId, error) {
        console.log(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
      }
      async onSuccess(message) {
        setMsgData([...msgData, {
          type: "send",
          txt: content
        },])

    
        const isCreated = await createDirectoryAndFile(msgData,content,"send");

        if (isCreated == 1) {
          console.log('send message success: ' + message.localMsgId);
          setContent(null);
        } else {
          setMsgData([...msgData, {
            type: "send",
            txt: "Error send again"
          },])
          console.log('send message success but file is not created: ' + message.localMsgId);
          setContent(null);
        }
      }
    })();
    console.log('start send message ...');
    chatClient.chatManager
      .sendMessage(msg, callback)
      .then(() => {
        console.log('send message: ' + msg.localMsgId);
      })
      .catch(reason => {
        console.log('send fail: ' + JSON.stringify(reason));
      });
  };

  const renderItem = ({ item }) => {
    if (item.type === "receive") {
      return (
        <View style={styles.chat_messages_receive}>
          <View style={styles.messages_receive}>
            <Text style={styles.messages_receive_text}>{item.txt}</Text>
            {/* <Text style={styles.messages_receive_text}>Today 04:55</Text> */}
          </View>
        </View>
      );
    } else if (item.type === "send") {
      return (
        <View style={styles.chat_messages_sent}>
          <View style={styles.messages_sent}>
            <Text style={styles.messages_sent_text}>{item.txt}</Text>
            {/* <Text style={styles.messages_sent_text}>Today 04:55</Text> */}
          </View>
        </View>
      );
    } else {
      return null;
    }
  };


  const updatecontent = (txt) => {
    setContent(txt);
    console.log(txt);
  };

  // Renders the UI.
  return (
    <View style={styles.mainContainer} >
      <View style={styles.chatHeaderContainer}>
        <Icon name="arrow-back" size={27} color="#fff" onPress={() => {

          if (this.isInitialized === false || this.isInitialized === undefined) {
            console.log('Perform initialization first.');
            return;
          }
          console.log('start logout ...');
          chatClient
            .logout()
            .then(() => {
              console.log('logout success.');
            })
            .catch(reason => {
              console.log('logout fail:' + JSON.stringify(reason));
            });
          navigation.goBack()
          console.log("backpress")
        }} style={{ alignSelf: "center" }} />

        <View style={[styles.chatHeaderUserNameContainer, { marginLeft: 20 }]} >
          <Text style={styles.chatHeaderUserName} >{route.params.targetName}</Text>
        </View>
      </View>
      {/* <ScrollView> */}

      <View style={styles.chatMinChattingMainContainer}>

        <FlatList
          data={msgData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.chatFotterInpurbar}>
        <View style={styles.chatFotterInpurbarbackground} >
          <SearchBar

            placeholder="Enter your Message . . ."
            round
            containerStyle={{ padding: 0, paddingHorizontal: 5, alignSelf: "center", width: "100%", backgroundColor: `rgba(13, 136, 56, 0.00 )`, borderTopColor: `rgba(13, 136, 56, 0.00 )`, borderBottomColor: `rgba(13, 136, 56, 0.00 )` }}
            inputContainerStyle={{ alignSelf: "center", height: 45, backgroundColor: "#fff", borderRadius: 25 }}
            // value={this.state.searchValue}
            searchIcon={() => {}}
            onChangeText={updatecontent}

            value={content}
            autoCorrect={false}
            clearIcon={() =>{
              
              return (
              <TouchableOpacity >

              <Icon name="send" size={30} color={Color.Color.topHeaderBackground}  onPress={() => {
                if (content === "") {
                  Alert.alert("enter somthing!!")
                } else {
                  
                  sendmsg()
                }
                
                
              }} />
              </TouchableOpacity>
              )
          
            }}

          />
        </View>
      </View>
    </View>
  );
};
// Sets UI styles.
const styles = StyleSheet.create({
  inputCon: {
    marginLeft: '5%',
    width: '90%',
    height: 60,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputBox: {
    marginTop: 15,
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },


  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: `rgba(13, 136, 56, 0.03 )`
  },
  chatHeaderContainer: {
    height: 60,
    width: "100%",
    backgroundColor: Color.Color.topHeaderBackground,
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
    alignContent: "flex-end"
  },
  chatHeaderImgContainer: {
    height: 40,
    width: 40,
    // backgroundColor:"black",
    borderRadius: 100,
    marginHorizontal: 0,
    alignSelf: "center"
  },
  chatHeaderImg: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginHorizontal: 10,
    alignSelf: "center"
  },
  chatHeaderUserNameContainer: {
    marginHorizontal: 0,
    alignSelf: "center"
  },
  chatHeaderUserName: {
    color: "#fff",
    fontSize: 22
  },
  chatMinChattingMainContainer: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 120,

  },
  chat_messages_receive: {
    marginBottom: 2,
    marginRight: "auto",
    borderBottomEndRadius: 100,
  },
  messages_receive: {
    padding: 10,
    marginBottom: 2,
    marginLeft: 10,
    marginRight: "auto",
    borderColor: "#000",
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#fff"
  },
  chat_messages_sent: {
    width: "100%",
  },
  messages_sent: {
    marginBottom: 2,
    padding: 10,
    backgroundColor: Color.Color.topHeaderBackground,
    marginHorizontal: 10,
    marginLeft: "auto",
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  messages_sent_text: {
    color: "#fff",
  },
  messages_receive_text: {
    color: "#000",
  },
  chatFotterInpurbar: {
    height: 55,
    // padding:0,
    width: "100%",
    // backgroundColor:"blue",
    flexDirection: "row",
    backgroundColor: "#fff",
    position: 'absolute',
    bottom: 0,
  },
  chatFotterInpurbarbackground: {
    width: "100%",
    backgroundColor: `rgba(13, 136, 56, 0.07 )`,
  }
});
export default Chats;
