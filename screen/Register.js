import { View, Text, StyleSheet,  TextInput, TouchableOpacity, Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native'
import styledComponents from 'styled-components'

import { ImageBackground } from 'react-native'
import { Dimensions } from 'react-native'
//import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Alert } from 'react-native'
import { auth, db } from '../firebase'
import Header from '../components/Header'



const Register = ({navigation}) => {

    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    const register = () => {
        setLoading(true)
        if(!email || !password || !firstName || !lastName){
            alert("All fields are mandatory")
            setEmail('')
            setPassword('')
            setLoading(false)
            return
        }

        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser => {
            db.collection('users').doc(email).set({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                list: [],
                watchedMovies: [],
            })
        })
        .then(authUser => {
            navigation.replace("Home")
            setEmail('')
            setPassword('')
            setLoading(false)
        }).catch(error => {
            setEmail('')
            setPassword('')
            setLoading(false)
            alert(error.message)
        })
    }

  return (
   <View style = {styles.container}>
       
       {/* <ImageBackground source={require('../assets/Loginbg.jpg')} resizeMode = "cover" style = {{flex:1, height: Dimensions.get("window").height }}> */}
        <View style = {styles.Overlay}>
            <View>
               <Image source={require('../assets/RedlineMainColoredLogo.png')} style = {styles.RedlineLogo} />
           </View>
            <View style = {styles.FormWrapper}>
                <View style = {styles.Form}>
                    <Text style = {styles.headerText}>Sign Up</Text>
                    <View style = {styles.NameInputWrapper}>
                        <TextInput placeholder='First name' placeholderTextColor='grey' value = {firstName} onChangeText = {(firstName) => setFirstName(firstName)} style = {styles.NameInput} />
                        <TextInput placeholder='Last name' placeholderTextColor='grey' value = {lastName} onChangeText = {(lastName) => setLastName(lastName)} style = {styles.NameInput} />

                    </View>

                    <TextInput placeholder='Enter your Email' placeholderTextColor='grey' 
                    style = {styles.EmailPasswordInput} value = {email} onChangeText = {(email) => setEmail(email)} autoCapitalize = 'none'/>

                    <TextInput placeholder = 'Password' placeholderTextColor = 'grey' secureTextEntry 
                    style = {styles.EmailPasswordInput} value = {password} onChangeText = {(password) => setPassword(password)} autoCapitalize = 'none'/>
                    
                    <TouchableOpacity style = {styles.SignInButton} onPress = {register} disabled = {loading}>
                        <Text style = {styles.SignInButtonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
                    </TouchableOpacity>
                    
                    <View style = {styles.NewToNetflixTextWrapper}>
                        <Text style = {styles.NewToNetflixText}>Already have an account ?</Text><TouchableOpacity style = {styles.NewToNetflixButton} onPress = {() => navigation.navigate("Login")}><Text style = {styles.NewToNetflixButtonText}>Sign In</Text></TouchableOpacity>
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

NameInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,


},

NameInput: {
    width: '48%',
    height: 50,
    border: 'none',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 10,
    focus: {
        backgroundColor: '#454545',
    },


},
RedlineLogo: {
    marginLeft: ((Dimensions.get('window').width )/2) - 75,
    width: 150,
    paddingBottom: 10,
},


})

export default Register