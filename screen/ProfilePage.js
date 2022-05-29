import { View, Text,StyleSheet,TouchableOpacity,Image,Dimensions } from 'react-native'
import React, {useEffect,useState} from 'react'
import {AntDesign} from '@expo/vector-icons'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold

} from '@expo-google-fonts/montserrat'
import {firebase,db,auth} from '../firebase'
import BottomTabs from '../components/BottomTabs'
import { bottomTabIcons } from '../components/BottomTabs'


const ProfilePage = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold        
        })

   
    const [user,setUser] = useState([])

    const signOutUser = () => {
        auth.signOut()
        .then(() => {
            navigation.replace("Login")
        })
    }


    useEffect(() => {

        db.collection('users').doc(firebase.auth().currentUser.email).onSnapshot(doc => {
            if(doc.exists){
                setUser(doc.data())
                
            }
        })

    },[])

    // fontsLoaded &&

  return  (
    <View style = {styles.container}>
        <View style = {styles.HeaderContent}>
            <View style = {styles.BackButtonWrapper}>
                <TouchableOpacity style = {{marginLeft: 10,}} onPress = {() => navigation.goBack()}>
                    <AntDesign name = "arrowleft" size = {24} color = "white" />
                </TouchableOpacity>

            </View>
            <View>
                <Text style = {styles.HeaderText}>Profile</Text>
            </View>

                    

        </View>

        <View style = {styles.ProfileContentWrapper}>

            <View style = {styles.ProfileDetails}>
                <View style = {styles.AvatarWrapper}>
                    <Image resizeMode = "contain" source = {require('../assets/avatarIcon.png')}  style = {styles.Avatar}/>
                </View>

                <View style = {styles.PersonalDetails}>

                    <Text style = {styles.ProfileName}>{user.FirstName + ' ' + user.LastName}</Text>
                    <Text style = {styles.ProfileEmail}>{user.Email}</Text>
                </View>

            </View>

        </View>

        {/* Adding Divider */}
        <View style={{ borderBottomColor: 'white', borderBottomWidth: 3,}} />

        <View style = {styles.ButtonWrapper}>

            <View>
                <TouchableOpacity style = {styles.LogoutButton} onPress = {signOutUser}>
                    <Text style = {styles.LogoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>

        </View>

    <BottomTabs icons = {bottomTabIcons} navigation = {navigation} user = {user}/>
      
    </View>
  )
}

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

    Avatar: {
        height: 180,
        width: 180,
    },

    ProfileContentWrapper: {
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: '#141414',
        height: '40%',
        borderRadius: 20,
    }, 
    ProfileDetails: {
        
        alignItems: 'center',
        marginTop: 40,
    }, 

    PersonalDetails: {
        alignItems: 'center'
    },
    
    ProfileName: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Montserrat_700Bold',
        marginTop: 12,


    },
    ProfileEmail: {
        color: 'white',
        fontSize: 15,
        marginTop: 10,
        fontFamily: 'Montserrat_500Medium'

    },

    ButtonWrapper: {
        marginTop: 100,
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        

    },
   

    LogoutButton: {
        alignItems: 'center',
        backgroundColor: 'red',
        width: Dimensions.get('window').width - ((Dimensions.get('window').width) /2 ) + 30 ,
        
        height: '37%',
        justifyContent: 'center',
        borderRadius: 10,

        
    },
    LogoutButtonText: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'Montserrat',
        fontWeight: '600',
        
        
    },
})

export default ProfilePage