import { View, Text ,StyleSheet, Image, ScrollView, TouchableOpacity,TextInput,Dimensions} from 'react-native'
import React, {useState,useEffect,useLayoutEffect}  from 'react'
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
import Header from '../components/Header'
import {AntDesign} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import {v4 as uuid} from 'uuid'


const GroupWatchInitial = ({navigation,route}) => {

    const [RoomKeyEntered,setRoomKeyEntered] = useState('')
    const [RoomKey,setRoomKey] = useState('')

    const GenerateRoomKey= () =>{
        const unique_id = uuid();
        const smallid = unique_id.slice(0,8)
        setRoomKey(smallid)
        
    }

    
    useEffect(() => {
        GenerateRoomKey()
    },[])

  return (
    <View style = {styles.container}>
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


        <View style = {styles.MoviePrimaryDetailsWrapper}>
                <Text style = {styles.Title}>{route.params.name}</Text>
                <View style = {styles.MovieSubPrimaryDetailWrapperMain}>

                    <View style = {styles.MovieSubPrimaryDetailWrapper}>
                        <View style = {styles.AgeBadge}>
                            <Text  style = {styles.AgeBadgeText}>13+</Text>
                        </View>
                        <Text style = {styles.yearText}>{route.params.yearOfRelease}</Text>
                    </View>

                   


                </View>

        </View>


        <View style = {styles.GroupNameButtonWrapper}>
            <View style = {styles.SearchBoxWrapper}>

                <View style = {styles.SearchBox}>
                    <MaterialIcons name="group" size={28} color="black"  style = {{margin: 10}} />
                    <TextInput style = {styles.SearchInput} autoCapitalize = 'none' value = {RoomKeyEntered} onChangeText = {(FriendUsername) => setRoomKeyEntered(FriendUsername)} placeholderText = "#7f7f7f" placeholder = "Enter Room id to join/create Room " />
                </View>

            </View>

            <View style = {styles.ButtonWrapper}>
                <TouchableOpacity style = {styles.Button} onPress = {() => navigation.navigate("GroupWatchFinal",{
                    id: route.params.id,
                    banner: route.params.banner,
                    name: route.params.name,
                    tags: route.params.tags,
                    videoURL: route.params.videoURL,
                    yearOfRelease: route.params.yearOfRelease,
                    user: route.params.user,
            
                    RoomKey: RoomKeyEntered
                })}>
                    <AntDesign name="arrowright" size={32} color="white" />
                </TouchableOpacity>
            </View>

        </View>

        <View style = {styles.RoomIDWrapper}>
            <Text style = {styles.RoomIDText}>Room Key: {RoomKey}</Text>
            
        </View>
        <View style = {styles.Info}>
            <Text style = {styles.InfoText}>Use the above Room key to create a new Room and Share it with your group for them to join</Text>
        </View>
        

    </View>
  )
}

const PostFooterIcons = [
    {
        name: 'Like',
        imageUrl: "https://img.icons8.com/material-outlined/24/ffffff/like--v1.png",
        likedImageUrl: "https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png",
    },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
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
    MoviePrimaryDetailsWrapper: {
        marginTop: 15,
        marginLeft: 10,
    },
    Title: {
        color: 'white',
        fontSize: 30,
        margin: 10,
        fontFamily: "Montserrat_700Bold"
    },

    MovieSubPrimaryDetailWrapperMain:  {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    MovieSubPrimaryDetailWrapper: {
        flexDirection: 'row',
        
        
    },
    footerIcon: {
        marginRight: 10,
        width: 33,
        height: 33,


    },
    RateText: {
        color: 'white',
        fontFamily: 'Montserrat_500Medium',

    },
    AgeBadge: {
        color: '#a2a2a2',
        backgroundColor: '#373737',
        padding: 2,
        borderRadius: 10,
        width: 40,
        height: 30,
        marginLeft: 15,
        textAlign: 'center'


    },
    AgeBadgeText: {
        color: 'white',
        padding: 2,
        textAlign: 'center',
    },
    yearText: {
        color: 'white',
        marginLeft: 20,
        fontSize: 20,

    },

    SearchBoxWrapper: {
        marginTop: 20,
        padding: 10,


    },
    SearchBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 12,
        

    },
    SearchInput: {
        fontSize: 18,

    },
    ButtonWrapper:{
        marginTop: 50,

    },
    Button:{
        backgroundColor: 'red',
        width: 80,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: ((Dimensions.get('window').width)/2) - 50,
       
    },
    GroupNameButtonWrapper: {
        marginTop: 30,
        padding: 10,
    },

    RoomIDWrapper: {

        padding: 20,
        paddingLeft: 30,
        marginTop: 70,
    },
    RoomIDText: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'Montserrat_700Bold'
    },
    Info: {
        
        padding: 20,
        paddingLeft: 30,
        backgroundColor: '#3e403e',
        borderRadius: 25,
        marginTop: 20,
    },
    InfoText: {
        color: 'white',
        fontSize: 18,
    },
        
})

export default GroupWatchInitial