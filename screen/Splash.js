import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import styledComponents from 'styled-components'
import {auth} from '../firebase'
import { StatusBar } from 'expo-status-bar'

import LottieView from 'lottie-react-native'


const Splash = ({navigation}) => {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home")
            }else{
                navigation.replace("Login")
            }
        })

        return() => {
            unsubscribe();
        }

    },[])

  return (
    <View style ={styles.container}>
        
        <LottieView 
            source = {require('../assets/loadingGif.json')}
            size = {1}
            autoPlay
            loop
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Splash