import { View, Text ,StyleSheet, TextInput,TouchableOpacity,Image, ScrollView} from 'react-native'
import React, {useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
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
import {MaterialIcons,AntDesign} from '@expo/vector-icons'
import { Dimensions } from 'react-native';


const SearchScreen = () => {
    const navigation = useNavigation();

    const [search,setSearch] = useState('')
    const [results,setResults] = useState(null)
    const [results2,setResults2] = useState(null)

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
    })


    useEffect(() => {
        db.collection('movies').onSnapshot(snapshot => {
            setResults(snapshot.docs.map((doc) => doc.data()))
        })
        setResults2(results)
    },[])


    useEffect(() => {
        db.collection('movies').onSnapshot(snapshot => {
            setResults(snapshot.docs.map((doc) => doc.data()))
        })

        if(results != undefined){
            const finalResult = results.filter(result => {
                return result.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 
            })

            setResults2(finalResult)
        }
    },[search])

 

    // fontsLoaded &&
  return  (
    <View style = {styles.container}>
      <View style = {styles.HeaderContent}>
            <TouchableOpacity style = {{marginLeft: 10,}} onPress = {navigation.goBack}>
                <AntDesign name = "arrowleft" size = {24} color = "white" />
            </TouchableOpacity>
            <Text style = {styles.HeaderText}>Search</Text>

      </View>

      <View style = {styles.SearchBoxWrapper}>
          <View style = {styles.SearchBox}>
              <MaterialIcons name = "search" size = {30} color = '#b1b1b1' style = {{margin: 10}} />
              <TextInput style = {styles.SearchInput} value = {search} onChangeText = {(search) => setSearch(search)} placeholderText = "#7f7f7f" placeholder = "Search for a Movie, Tv Show" />


          </View>

      </View>

      <View>
          {
             search != '' && results2 && (
                  <View style = {styles.AllResults}>
                      <Text style = {styles.topMatchText}>Top Matches</Text>
                      <ScrollView>

                      
                      <View style = {styles.resultWrapper}>

                            {
                                results2.map((movie,index) => {
                                    return(
                                        <TouchableOpacity key = {index} onPress = {() => navigation.navigate("ViewMovie",{
                                            id: movie.id,
                                            CurrentMovieName: movie.name,
                                            watchCountTemp: movie.watchCount
                                           
                                        })} >
                                            <View style = {styles.MovieCard}>
                                                {/* {
                                                    my_variable = 'https://drive.google.com/file/d/1KqelJ1_1CAAAy2wWiYijoBGfMxBav-Xy'
                                                } */}
                                                <Image resizeMode = "cover" source = {{uri: 'https://drive.google.com/uc?export=view&id='+movie.banner}} style = {styles.MoviePoster}/>
                      
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                      </View>
                      </ScrollView>


                  </View>
              )
          }
      </View>

    </View>
  )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    HeaderContent: {
        marginTop: 40,
        flexDirection: 'row',
        marginLeft: 5,
    },
    MovieCard: {
        paddingRight: 9,
        marginTop: 15,
    
    },
    MoviePoster: {
        width: (Math.round((Dimensions.get('window').width * 35) / 100)),
        height: 200,
        borderRadius: 10,
    
    
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
AllResults: {
    marginTop: 20,
    marginLeft: 15,
},
topMatchText: {

    color: 'white',
    fontSize: 30,
    fontFamily: 'Montserrat_700Bold',
    


},
resultWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,


},
HeaderText: {
    
    color: 'white',
    marginLeft: 20,
    fontSize: 22,
    fontFamily: 'Montserrat_700Bold',

    
},
HeaderText: {
    
    color: 'white',
    marginLeft: 20,
    fontSize: 23,
    fontFamily: 'Montserrat_700Bold',

    
},



})

export default SearchScreen