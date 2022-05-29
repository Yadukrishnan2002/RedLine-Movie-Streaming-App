import { View, Text,StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase,db} from '../firebase'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold

} from '@expo-google-fonts/montserrat'
//import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../components/Header'
import { Dimensions } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import { bottomTabIcons } from '../components/BottomTabs'
import BottomTabs from '../components/BottomTabs'



const MyList = ({navigation,route}) => {
    

    let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold        
    })

    const [Loaded,setLoaded] = useState(true)
    const [movies,setMovies] = useState([])
    const [user,setUser] = useState(route.params.user)

    useEffect(() => {
        db.collection('users').doc(firebase.auth().currentUser.email).collection("watchlist").onSnapshot(snapshot => {
          setMovies(snapshot.docs.map(doc => doc.data()))
          
        })
    },[])

    // fontsLoaded &&

  return  (
    <View style = {styles.container}>
        {/* <Header login = {true} goBack = {navigation.goBack} label = "My List" /> */}
        <View style = {styles.HeaderContent}>
            <View style = {styles.BackButtonWrapper}>
                <TouchableOpacity style = {{marginLeft: 10,}} onPress = {() => navigation.goBack()}>
                    <AntDesign name = "arrowleft" size = {24} color = "white" />
                </TouchableOpacity>

            </View>
            <View>
                <Text style = {styles.HeaderText}>Watchlist</Text>
            </View>

                    

        </View>
      {
          movies.length == 0 && (
              <View style = {styles.WarningWrapper}>
                  <Text style = {styles.WarningText}>There are no movies in the Watchlist</Text>
                  <TouchableOpacity style = {styles.BrowseButton} onPress ={() => navigation.navigate("Home")}>
                      <Text style = {styles.BrowseButtonText}>Browse movies</Text>
                  </TouchableOpacity>

              </View>

          ) 
    }

            <ScrollView style = {styles.container}>
                <View style = {styles.MovieScroll}>
                {
                movies &&  movies?.map((movie,index) => {
                        return(
                        <TouchableOpacity key = {index} onPress = {() => navigation.navigate("ViewMovie",{
                            id: movie.movieID,
                            user: user
                            
                        })} >
                            <View style = {styles.MovieCard}>
                                {/* {
                                    my_variable = 'https://drive.google.com/file/d/1KqelJ1_1CAAAy2wWiYijoBGfMxBav-Xy'
                                } */}
                                <Image resizeMode = "cover" source = {{uri: 'https://drive.google.com/uc?export=view&id='+movie.banner}} 
                                style = {styles.MoviePoster}/>
        
                            </View>
                        </TouchableOpacity>
                        )
                    })
                }
            </View>
    
            </ScrollView>
          
      
            <BottomTabs icons = {bottomTabIcons} navigation = {navigation} user = {user}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: 'black',
       
    },
    WarningWrapper: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
WarningText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold'

},
BrowseButton: {
    backgroundColor: 'red',
    width: 200,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center'

},
BrowseButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
   

},
container2: {
    flex: 1,
    backgroundColor: 'black',

},
MovieScroll: {
    marginTop: 25,
    paddingLeft: Dimensions.get('window').width /7,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',


},

MovieCard: {
    marginTop: 18,
    paddingRight: 9,

    

},
MoviePoster: {
    width: (Math.round((Dimensions.get('window').width * 35) / 100)),
    height: 200,
    borderRadius: 10,


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

export default MyList