import { View, Text,StyleSheet, Image, ScrollView, TouchableOpacity,TextInput,Dimensions , SafeAreaView} from 'react-native'
import React,{useState,useEffect,useLayoutEffect} from 'react'
import { Video } from 'expo-av'
import {firebase,db,auth} from '../firebase'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold

} from '@expo-google-fonts/montserrat'
import {AntDesign,Ionicons} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'

const GroupWatchFinal = ({navigation,route}) => {


    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold

    })


    const [text,setText] = useState('')
    const [play,setPlay] = useState(false)


    const [dbmessages,setDBmessages] = useState([])
    const [Allmessages,setAllmessages] = useState([
        {
            owner: 'yadus2002@gmail.com',
            text: 'test',
        },
    ])

    const HandleSend = () => {
        db.collection('groupChat').doc(route.params.RoomKey).collection('Chats').add({
            owner: firebase.auth().currentUser.email,
            Name: route.params.user.FirstName + ' ' + route.params.user.LastName,
            text: text,
            time: firebase.firestore.Timestamp.now(),
            
        })
        setText('')
    }

    const HandlePlay = () => {
        setPlay(!play)
        db.collection('groupChat').doc(route.params.RoomKey).update({
            play: !play
        })
    }

   
   

    useEffect (() => {
        const unsubscribe = db.collection('groupChat').doc(route.params.RoomKey).onSnapshot(snapshot => {
            setPlay(snapshot.data().play)
        })

        return unsubscribe
    },[])
    
    useEffect(() => {
        const unsubscribe = db.collection('groupChat').doc(route.params.RoomKey).collection('Chats').orderBy("time").onSnapshot(snapshot => {
            setDBmessages(snapshot.docs.map(doc => ({
                data: doc.data()
                
            }))
            )
        })
        return unsubscribe
    },[])

    useEffect(() => {
         db.collection('groupChat').doc(route.params.RoomKey).set({
            play: play
        })
       
    },[])

    useEffect(() => {
        setAllmessages(dbmessages)
    },[dbmessages])




  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.HeaderContent}>
            <View style = {styles.BackButtonWrapper}>
                <TouchableOpacity style = {{marginLeft: 10,}} onPress = {() => navigation.goBack()}>
                    <AntDesign name = "arrowleft" size = {24} color = "white" />
                </TouchableOpacity>

            </View>
            <View>
                <Text style = {styles.HeaderText}>Group Watch</Text>
            </View>
        </View>



        <View style = {styles.MovieWrapper}>

       
            <Video source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}
            isMuted = {false}
            shouldPlay = {play}
            
            style = {{height: 225, marginTop: 15}}
            resizeMode = 'contain'
            usePoster = {true}
            posterSource = {{uri: 'https://drive.google.com/uc?export=view&id='+ route.params.banner}}
            // posterResizeMode = "stretch"
            useNativeControls = {true}
        
            
            />
         </View>

         <View style = {styles.ButtonWrapper}>
                {
                        play ? (
                            <TouchableOpacity style = {styles.PauseButton} onPress = {HandlePlay}>
                                <Ionicons name="ios-pause-sharp" size={26} color="black" />
                                <Text style = {styles.PauseButtonText}>Pause</Text>
                            </TouchableOpacity>
                           

                        ) : (
                            
                            
                             <TouchableOpacity style = {styles.PlayButton} onPress = {HandlePlay}>
                             <Ionicons name = "ios-play" size = {26} color = "white" />
                             <Text style = {styles.PlayButtonText}>Play</Text>
                         </TouchableOpacity>

                        )
                }

        
         </View>

         <View style={{ borderBottomColor: 'white', borderBottomWidth: 3, marginTop: 20}} />
      

        <ScrollView style = {styles.ChatScroll}>

        {
         dbmessages && dbmessages?.map((msg,index) => {

           return(
            <View style = {styles.ChatBubbleContainer} key = {index}>
                <View style = {[msg.data.owner == route.params.user.Email ? styles.MessageContainer : styles.MessageContainer2 ]}>
                    <View style = {styles.MessageView}>
                        <View style = {styles.Message}>
                         { msg.data.Name != route.params.user.FirstName + ' ' + route.params.user.LastName && <Text style = {styles.SenderNameText}>{msg.data.Name}</Text> }
                            <Text style = {styles.MessageText}>{msg.data.text}</Text>
                        </View>
                    </View>
                </View>
            </View>
            )
        })
             
        }
            
        </ScrollView>
    

       <View style={{ borderBottomColor: 'black', borderBottomWidth: 3,marginTop: 70 }} /> 


       <View style = {styles.ChatScreenWrapper}>
        <View style = {styles.ChatInputWrapper}>
            <View style = {styles.ChatInput}>
                <TextInput 
                multiline
                placeholder='Type Something...'
                value = {text}
                onChangeText = {(text) => setText(text) }
                style = {{fontSize: 18}}
                />

            </View>

            <View>
                <TouchableOpacity style = {styles.SendIconWrapper} onPress = {HandleSend}>
                    <Image source = {{uri: "https://img.icons8.com/ios-glyphs/90/fa314a/filled-sent.png"}} style = {{width: 30, height: 30,marginRight: -40,}} />
                </TouchableOpacity>

            </View>


        </View>
      </View> 



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        
       
    },
    HeaderContent: {
        flexDirection: 'row',
        marginTop: 40,
    },
    HeaderText: {
        
        color: 'white',
        marginLeft: 20,
        fontSize: 22,
        fontFamily: 'Montserrat_700Bold',
    
        
    },


    ChatScreenWrapper: {
        backgroundColor: 'black'
      
    },
    ChatInputWrapper: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 30,
        alignItems:'center',
        position: 'absolute',
        // marginTop: Dimensions.get('window').height - 1080,
        
        backgroundColor: 'black',
        marginTop: -50,
        
       
       
        
        
        
    },
    ChatInput: {
        backgroundColor: 'white',
        width: '92%',
        borderRadius: 10,
        height: 50,
        padding: 10,
        alignSelf: 'center',
        
        
        
    },
    SendIconWrapper: {
        
    },
    MovieWrapper: {
        
    },
    ButtonWrapper: {
        alignItems: 'center',
        marginTop: 20,
    },
    PlayButtonWrapper: {
        backgroundColor: 'red',
        width: '55%',
        alignItems: 'center',
        marginBottom: 20,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
    },
    QuitButtonWrapper: {
        backgroundColor: 'red',
        width: '55%',
        alignItems: 'center'
    },
    PlayButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600'
    },



    ChatScroll: {//550 //430
        height: Dimensions.get('window').height - 600
    },

    ChatBubbleContainer: {
        paddingVertical: 10,
        marginVertical: 5,

    },
    MessageContainer: {
        //backgroundColor: '#05b5f5',
        backgroundColor:'#00bfff',
        maxWidth: '80%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,

    },
    MessageContainer2: {
        backgroundColor: 'lightgreen',
        maxWidth: '80%',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    MessageView: {

    },
    Message: {

    },
    MessageText: {
        fontSize: 17,
    },

    PlayButton: {
        flexDirection: 'row',
        backgroundColor: 'red',
        width: 300,
        height: 34,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

        },
        PlayButtonText: {
            color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
    },

    PauseButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: 300,
        height: 34,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,


    },
    PauseButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    SenderNameText: {
        fontSize: 12,
        color: '#4d4d4d'
    },
              
})

export default GroupWatchFinal