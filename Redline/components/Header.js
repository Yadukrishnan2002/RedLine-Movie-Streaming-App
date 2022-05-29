import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {AntDesign, MaterialIcons, Ionicons} from '@expo/vector-icons';
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold

} from '@expo-google-fonts/montserrat'
import { useNavigation } from '@react-navigation/native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../firebase';
import { Dimensions, SafeAreaView } from 'react-native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


const Header = ({login, goBack, label}) => {

 const navigation = useNavigation();

 let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold

 })

    const signOutUser = () => {
        auth.signOut()
        .then(() => {
            navigation.navigate("Login")
        })
    }


    // fontsLoaded &&

  return  (

    login ? (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.headerLeftside}>
               
               { goBack ? (
                   <TouchableOpacity style = {{marginLeft: 10,}} onPress = {goBack}>
                        <AntDesign name = "arrowleft" size = {24} color = "white" />
                   </TouchableOpacity>



                ) : (
                    
                    <Image resizeMode = "contain" source = {require('../assets/logo.png')}  style = {styles.NetflixLogo}/>
                )
               }

               {
                   label && (
                       <View style = {styles.HeaderTitle}>
                            <Text>{label}</Text>
                       </View>

                   )
               }

            </View>

            <View style = {styles.headerIcons}>
                {
                    goBack ? (
                        <View style ={styles.SearchAvatar}>
                            <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
                            
                            <Image source={{uri: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png"}} style = {styles.SearchIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={signOutUser} >
                            <Image resizeMode = "contain" source = {require('../assets/avatarIcon.png')}  style = {styles.Avatar}/>
                            </TouchableOpacity>

                        </View>
                        
                        
                    ) : (
                        <View style ={styles.SearchAvatar}>
                            <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
                        
                                <Image source={{uri: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png"}} style = {styles.SearchIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={signOutUser} >
                                <Image resizeMode = "contain" source = {require('../assets/avatarIcon.png')}  style = {styles.Avatar}/>
                            </TouchableOpacity>

                    </View>
                    )
                }
                {/* {
                    goBack ? (
                        <TouchableOpacity onPress={signOutUser} >
                            <Image resizeMode = "contain" source = {require('../assets/avatarIcon.png')}  style = {styles.Avatar}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={signOutUser}>
                            <Image resizeMode = "contain" source = {require('../assets/avatarIcon.png')} style = {styles.Avatar}/>
                        </TouchableOpacity>
                    )
                } */}

            </View>

        </SafeAreaView>
    ) : (
        <View style = {styles.container2}>
            <View style = {styles.Logo2}>
                <Image resizeMode = "contain" source = {require('../assets/netflixlogo2.png')} style = {{width: 110, height: 100}}/>

            </View>

        </View>
    )
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 25,
        paddingLeft: 0,
        paddingRight: 25,
        width: '100%',

        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 1000,
        


    },
    headerLeftside: {

        flexDirection: 'row',


    },
    HeaderTitle: {
        color: 'white',
        marginLeft: 15,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18

    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    Avatar2: {
        zIndex: 1000,
        marginTop: 0,
        width: 50,
        height: 50,
        borderRadius: 20,

    },
    Avatar: {
         zIndex: 2000,
        marginTop: 220 -(Dimensions.get('window').height),
        width: 50,
        height: 50,
        borderRadius: 20,
        marginLeft: -500,
        
       


    },
    container2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        width: '100%',


    },
    NetflixLogo: {
        zIndex: 1000,
        width: 40,
        height: 40,
        marginLeft: 15,
        marginTop: 220 -(Dimensions.get('window').height)
        
        
    },
    SearchIcon: {
        zIndex: 1000,
        marginTop: 225 -(Dimensions.get('window').height),
        width: 35,
        height: 35,
        marginLeft: -130,
        

    },
    SearchAvatar: {
        flexDirection: 'row',
        
        

    },
   
})


export default Header