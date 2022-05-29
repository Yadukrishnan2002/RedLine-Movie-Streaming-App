import { View, Text , Image} from 'react-native'
import React, {useState} from 'react'
// import { Divider } from 'react-native-elements'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import {auth} from '../firebase'
import {useRoute} from '@react-navigation/native';


const BottomTabs = ({icons,navigation,user}) => {
  
    const route = useRoute();

    const CurrentScreenName = route.name

  const [activeTab,setActiveTab] = useState(CurrentScreenName);

  const signOutUser = () => {
    auth.signOut()
    .then(() => {
        navigation.navigate("Login")
    })
}

  const Icon = ({icon}) => (
      <TouchableOpacity onPress = {()=> {
          if(icon.name == "Home"){
            
            navigation.popToTop()
            
          }
          else if(icon.name == "MyList"){
              
              navigation.navigate("MyList",{
                  user: user
              })
          }
          
      }}>
          <Image source = {{uri: activeTab === icon.name ? icon.active : icon.inactive}}
           style = {styles.icon}/>
           
      </TouchableOpacity>

  )

  return (
      <View style = {styles.wrapper}>
          {/* <Divider width={1} orientation = 'vertical' /> */}
          <View style = {styles.container}>
            {icons.map((icon,index) => (
                <Icon key = {index} icon = {icon} />
            ))} 
            <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")} 
            style ={ (route.name == "ProfilePage") ? styles.AvatarWrapperActive : styles.AvatarWrapper} >
                <Image resizeMode = "contain" source = {require('../assets/avatarIcon.png')}  style = {styles.Avatar}/>
            </TouchableOpacity>
        </View>

      </View>
      
    
  )
}

const styles = StyleSheet.create({

    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '0%',
        zIndex: 999,
        backgroundColor: '#000',



    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,

    },

    icon: {
        width: 30,
        height: 30,
        
    },

    AvatarWrapperActive: {
        backgroundColor: 'lightgreen',
        borderRadius: 22  

    },

    AvatarWrapper: {

    },
    Avatar: {

       width: 40,
       height: 40,

   },

    profilePic: (activeTab = '') => ({
        borderRadius: 50,

        borderWidth: activeTab === 'Profile' ? 2 : 0,

        borderColor: '#fff',

    }),
    
})



export const bottomTabIcons = [
    {
        name: 'Home',
        active: "https://img.icons8.com/fluency-systems-filled/48/ffffff/home.png",
        inactive: "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
    },
    {
        name: 'MyList',
        active:"https://img.icons8.com/ios-filled/100/ffffff/frame-rate.png",
        inactive: "https://img.icons8.com/dotty/80/ffffff/frame-rate.png" ,
    },

    // {
    //     name: 'Downloads',
    //     active: "https://img.icons8.com/metro/52/ffffff/download.png" ,
    //     inactive:"https://img.icons8.com/material-outlined/96/ffffff/download--v1.png",
    // },

   

]


export default BottomTabs