import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React, {useState,useEffect} from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
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

import {firebase,auth,db} from '../firebase'







const submitRating = () => {

}
 

const RatingScreen = ({navigation,route}) => {

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold

    })

    const [user,setUser] = useState(route.params.user)
    const [UserRating,setUserRating] = useState()

    const ratingCompleted = (rating) => {
        // console.log("Rating is: " + rating)
        setUserRating(rating)
      }
    

      console.log(UserRating)

    
    const HandleSubmit = () => {
        db.collection('users').doc(user.Email).collection('MoviesWatched').doc(route.params.id).set({
            movieID: route.params.id,
            movieName: route.params.name,
            rating: UserRating,
        })

        var watchedMovies = user.watchedMovies

        if(watchedMovies.includes(route.params.id)){

        }else{
            watchedMovies.push(route.params.id)
            db.collection('users').doc(user.Email).update({
                watchedMovies
            })
        }

        navigation.goBack()

    }

    // fontsLoaded &&

  return  (
    <View style = {styles.container2}>

        <View style = {styles.HeaderContent}>
            <View style = {styles.BackButtonWrapper}>
                <TouchableOpacity style = {{marginLeft: 10,}} onPress = {() => navigation.goBack()}>
                    <AntDesign name = "arrowleft" size = {24} color = "white" />
                </TouchableOpacity>

            </View>
            <View>
                <Text style = {styles.HeaderText}>Rate</Text>
            </View>

        </View>

        <View style = {styles.container}>
            <View style = {styles.TextContainer}>
                <Text style = {styles.HeadingText}>How would you Rate the Movie?</Text>
            </View>

            <View style = {styles.RatingContainer}>
                <Rating
                type='heart'
                ratingCount={5}
                imageSize={60}
                showRating
                onFinishRating={ratingCompleted}
                />
                
            </View>

            <View style = {styles.SubmitButtonWrapper}>
                <TouchableOpacity onPress={HandleSubmit}>
                    <Text style = {styles.SubmitButtonText}>Submit Rating</Text>
                </TouchableOpacity>

            </View>

        </View>

        
        

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
    },
    container2: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
       
    },

    TextContainer: {


    },
    HeadingText: {
        color: 'white',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 25,


    },
    RatingContainer: {
        marginTop: 50,
        justifyContent: 'center'
    },
    SubmitButtonWrapper: {
        
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 40,
        width: '60%',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'

    },
    SubmitButtonText: {
        fontSize: 23,
        color: 'white',
        fontFamily: 'Montserrat_700Bold'

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
})

export default RatingScreen