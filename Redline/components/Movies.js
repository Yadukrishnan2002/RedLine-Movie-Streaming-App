import { View, Text, StyleSheet,Image,  ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
//import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const Movies = ({label,item,user}) => {

    const navigation = useNavigation();
    
    // var my_variable  = require('https://drive.google.com/uc?export=view&id=1KqelJ1_1CAAAy2wWiYijoBGfMxBav-Xy');
   //https://drive.google.com/file/d/1rIXmW2qaQwVAerkaogWLj9-C3wUJ_IAP/view?usp=sharing
  return (
    <View style = {styles.container}>
      <Text style = {styles.labelText}>{label}</Text>
      <ScrollView horizontal style = {styles.MovieScroll}>
          {item.map((movie,index) => {
              return(
                  <TouchableOpacity key = {index} onPress = {() => navigation.navigate("ViewMovie",{
                      id: movie.id,
                      watchCountTemp: movie.data.watchCount,
                      CurrentMovieName: movie.data.name,
                      user: user,
                  })} >
                      <View style = {styles.MovieCard}>
                          {/* {
                              my_variable = 'https://drive.google.com/file/d/1KqelJ1_1CAAAy2wWiYijoBGfMxBav-Xy'
                          } */}
                          <Image resizeMode = "cover" source = {{uri: 'https://drive.google.com/uc?export=view&id='+movie.data.banner}} style = {styles.MoviePoster}/>

                      </View>
                  </TouchableOpacity>
              )
          })}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {

        paddingTop: 20,
    },
   
labelText: {

    color: 'white',
    fontWeight: '700',
    fontSize: 23,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,


},
MovieScroll: {
    paddingLeft: 10,


},

MovieCard: {
    paddingRight: 9,

},
MoviePoster: {
    width: (Math.round((Dimensions.get('window').width * 35) / 100)),
    height: 200,
    borderRadius: 10,


},

})

export default Movies