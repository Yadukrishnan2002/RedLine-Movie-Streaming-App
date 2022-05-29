import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native'
import styledComponents from 'styled-components'

import { ImageBackground } from 'react-native'
import { Dimensions } from 'react-native'
//import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Alert } from 'react-native'
import { auth } from '../firebase'
import Header from '../components/Header'
import { Image } from 'react-native'



const Login = ({navigation}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    const [img,setImg] = useState('../assets/Loginbg.jpg')

    const login = () => {
        setLoading(true)
        if(!email || !password){
            alert("All fields are mandatory")
            setEmail('')
            setPassword('')
            setLoading(false)
            return
        }

        auth.signInWithEmailAndPassword(email,password)
        .then(authUser => {
            navigation.replace("Home")
            setEmail('')
            setPassword('')
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            alert(error.message)
        })
    }

  return (
   <View style = {styles.container}>
       {/* source={require('../assets/Loginbg.jpg')} */}

       {/* by using the below shown method we can use variable to store image and use it to display */}
       {/* <ImageBackground source={require('../assets/Loginbg.jpg')} resizeMode = "cover" style = {{flex:1, height: Dimensions.get("window").height }}> */}
        <View style = {styles.Overlay}>
           <View>
               <Image source={require('../assets/RedlineMainColoredLogo.png')} style = {styles.RedlineLogo} />
           </View>
            <View style = {styles.FormWrapper}>
                <View style = {styles.Form}>
                    <Text style = {styles.headerText}>Sign In</Text>

                    <TextInput placeholder='Enter your Email' placeholderTextColor='grey' 
                    style = {styles.EmailPasswordInput} value = {email} onChangeText = {(email) => setEmail(email)} autoCapitalize = 'none'/>

                    <TextInput placeholder = 'Password' placeholderTextColor = 'grey' secureTextEntry 
                    style = {styles.EmailPasswordInput} value = {password} onChangeText = {(password) => setPassword(password)} autoCapitalize = 'none'/>
                    
                    <TouchableOpacity style = {styles.SignInButton} onPress = {login} disabled = {loading}>
                        <Text style = {styles.SignInButtonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
                    </TouchableOpacity>
                    
                    <View style = {styles.NewToNetflixTextWrapper}>
                        <Text style = {styles.NewToNetflixText}>New To Netflix ?</Text><TouchableOpacity style = {styles.NewToNetflixButton} onPress = {() => navigation.navigate("Register")}><Text style = {styles.NewToNetflixButtonText}>Sign Up</Text></TouchableOpacity>
                    </View>



                </View>

            </View>
            </View>
       {/* </ImageBackground> */}
       

   </View>

      
   
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',

    },
FormWrapper:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',

},
Form:{
    height: 400,
    width: '90%',
    backgroundColor: '#1c1c1c',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 20,
    justifyContent:'center',
    marginTop: -370,


},
SignInButton: {
    width: '95%',
    height: 50,
    border: 'none',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'red',
    color: 'white',
    marginTop: 10,
    justifyContent: 'center',


},
SignInButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 4,
    color: 'white',
    textAlign: 'center',
    
},

NewToNetflixTextWrapper:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,

},

NewToNetflixText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: '#ccc',
    margin: 15,
    
},
NewToNetflixButton: {

   

    

},

NewToNetflixButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    
    color: 'white',
    marginTop: 15,
    marginLeft: -2,

},

Overlay: {

    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,



},
EmailPasswordInput: {
    width: '95%',
    height: 50,
    border: 'none',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 10,

},

headerText: {

    fontSize: 36,
    color: 'white',
    fontWeight: '700',
    marginBottom: 15,

},

RedlineLogo: {
    marginLeft: ((Dimensions.get('window').width )/2) - 75,
    width: 150
},

})

export default Login