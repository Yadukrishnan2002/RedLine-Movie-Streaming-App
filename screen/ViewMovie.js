import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState,useEffect,useLayoutEffect} from 'react'
import {Feather,Ionicons, AntDesign} from '@expo/vector-icons'
import { Video } from 'expo-av'
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
import { Foundation } from '@expo/vector-icons';
import { Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';




const ViewMovie = ({navigation,route}) => {

    const [Loading,setLoading] = useState(true)
    const [movie,setMovie] = useState(null)
    const [user,setUser] = useState(route.params.user)
    const [playState,setPlayState] = useState(false)
    
    const [Allmovies,setAllMovies] = useState([])
    const [SimilarMovies,setSimilarMovies] = useState([])

    const [HeartRed,setHeartRed] = useState(false)

    const Toggleplay = () => {
        setPlayState(playState => !playState)
    }
    

    const Icon = ({imgStyle, imgUrl}) => (


    
        <TouchableOpacity onPress={navigation.navigate("RatingScreen",{
            id: movie.id,
            user: user,
        })}>
            <Image style = {imgStyle} source = {{uri: imgUrl}} />
        </TouchableOpacity>    
        
    
    )


     useEffect(() => {
         db.collection('users').doc(firebase.auth().currentUser.email).onSnapshot(doc => {
             if(doc.exists)
             {
                 setUser(doc.data())
             }
         })

     }, [firebase.auth().currentUser])


    useEffect(() => {
        db.collection('movies').doc(route.params.id).onSnapshot(doc => {
            setMovie(doc.data())
            
        })
        
        setLoading(false)

    }, [route])

    useEffect(() => {
        db.collection('users').doc(firebase.auth().currentUser.email).collection('MoviesWatched').onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if((doc.data().movieName == route.params.CurrentMovieName) && (doc.data().rating != 2.5)){
                    setHeartRed(true)
                }
            })
        })
    },[])

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold

    })

    useLayoutEffect(() => {
        const unsubscribe = db.collection('movies').onSnapshot(snapshot => {
            setAllMovies(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                }))
            )
        })

       

        return unsubscribe


        
    },[])

    
    //Finding Similar Movies
    useEffect(() => {
        FindSimilarMovies()

    },[movie,Allmovies])

   


    const FindSimilarMovies = () => {
        let tempState = []
        movie && Allmovies.map((mov,index) => {
            if((mov.data.tags[0] == movie.tags[0]) && (mov.data.name != movie.name)){
                tempState = [...tempState,mov]
            }
        })

        setSimilarMovies(tempState)

       
        
    }



    const HandlePlay = () => {
        var watchedMovies = user.watchedMovies

        if(watchedMovies.includes(movie.id)){
            //Playing the video

            Toggleplay()
        }
        else{
            db.collection('users').doc(firebase.auth().currentUser.email).collection('MoviesWatched').doc(movie.id).set({
                movieID: movie.id,
                movieName: movie.name,
                rating: 2.5,
            })

            watchedMovies.push(movie.id)

            db.collection('users').doc(firebase.auth().currentUser.email).update({
                watchedMovies,
            })

            

            //Incrementing Watch count of the respective Movie

           

            count = route.params.watchCountTemp
            count = count + 1

            db.collection('movies').doc(route.params.id).update({
                watchCount: count
            })


            //Playing the video

            Toggleplay()

        }

        

        
    }
    // fontsLoaded &&

  return  !Loading ? (
    <ScrollView style ={styles.container} >
        <Header login = {true} goBack = {navigation.goBack} />

        <Video source={{uri: movie?.videoURL}}
        isMuted = {false}
        shouldPlay = {playState}
        
        style = {{height: 225, marginTop: 15}}
        resizeMode = 'contain'
        usePoster = {true}
        posterSource = {{uri: 'https://drive.google.com/uc?export=view&id='+ movie?.banner}}
        // posterResizeMode = "stretch"
        useNativeControls = {true}
       
        
        />
        <View>
            <View style = {styles.MoviePrimaryDetailsWrapper}>
                <Text style = {styles.Title}>{movie?.name}</Text>
                <View style = {styles.MovieSubPrimaryDetailWrapperMain}>

                    <View style = {styles.MovieSubPrimaryDetailWrapper}>
                        <View style = {styles.AgeBadge}>
                            <Text  style = {styles.AgeBadgeText}>13+</Text>
                        </View>
                        <Text style = {styles.yearText}>{movie?.yearOfRelease}</Text>
                    </View>

                    <View style = {styles.HeartIconWrapper}>
                        {/* <Icon imgStyle={styles.footerIcon} imgUrl = {PostFooterIcons[0].imageUrl} /> */}

                        <TouchableOpacity onPress={() => navigation.navigate("RatingScreen",{
                            id: movie.id,
                            name: movie.name,
                            user: user,
                        })}>
                            <Image style = {styles.footerIcon} source = {{uri: HeartRed ? PostFooterIcons[0].likedImageUrl : PostFooterIcons[0].imageUrl}} />
                        </TouchableOpacity> 

                        <Text style = {styles.RateText}>Rate</Text>
                    </View>


                </View>

            </View>

            <View style = {styles.ActionButtons}>

                    {
                        playState ? (
                            <TouchableOpacity style = {styles.PauseButton} onPress = {HandlePlay}>
                                <Ionicons name="ios-pause-sharp" size={26} color="black" />
                                <Text style = {styles.PauseButtonText}>Pause</Text>
                            </TouchableOpacity>
                            

                        ) : (
                            <TouchableOpacity style = {styles.PlayButton} onPress = {HandlePlay}>
                                <Ionicons name = "ios-play" size = {26} color = "white" />
                                <Text style = {styles.PlayButtonText}>Play</Text>
                            </TouchableOpacity>

                        )
                    }
                

                <View style = {styles.watchListGroupWatchWrapper}>   

                {
                    movie && user && user.list.includes(movie.id) ? (
                           

                        <TouchableOpacity style = {styles.WatchlistButton} onPress = {() => {
                            db.collection('users').doc(firebase.auth().currentUser.email).collection('watchlist').doc(movie.id).delete()

                            var list = user.list;
                            list.splice(list.indexOf(movie.id), 1)

                            db.collection('users').doc(firebase.auth().currentUser.email).update({
                                list,
                            })
                        }} >

                            <Feather name="check" size={24} color="#fff" />
                            <Text style = {styles.WatchlistButtonText}>Added</Text>

                         </TouchableOpacity>

                    ) : (
                        <TouchableOpacity style = {styles.WatchlistButton} onPress = {() => {
                            db.collection('users').doc(firebase.auth().currentUser.email).collection('watchlist').doc(movie.id).set({
                                movieID: movie.id,
                                banner: movie.banner,
                            });

                            var list = user.list;
                            list.push(movie.id)

                            db.collection('users').doc(firebase.auth().currentUser.email).update({
                                list,
                            })
                            
                        }}>

                            
                            <Ionicons name = "add-outline" size = {28} color = '#fff' />
                            <Text style = {styles.WatchlistButtonText}>Watchlist</Text>

                         </TouchableOpacity>
                    )
                }


                        <TouchableOpacity style = {styles.GroupWatchButtonWrapper} onPress = {() => navigation.navigate("GroupWatchInitial",{
                            id: movie.id,
                            banner: movie.banner,
                            name: movie.name,
                            tags: movie.tags,
                            videoURL: movie.videoURL,
                            yearOfRelease: movie.yearOfRelease,
                            user: user
                        })}>
                            <MaterialIcons name="group" size={28} color="white" />
                            <Text style = {styles.GroupWatchButtonText}>Group watch</Text>
                        </TouchableOpacity>

                </View> 

            </View>

            <View style = {styles.MovieSecondaryDetailsWrapper}>
                <Text style = {styles.MovieDescription}>{movie?.description}</Text>

            </View>
            <View style = {styles.MovieTagsWrapper}>
                <View style = {styles.MovieTags}>
                    {
                        movie?.tags.slice(0,3).map((tag,index) => {
                            if(index + 1 == movie.tags.length){
                                return(
                                    <Text style = {styles.MovieTagsText}>{tag}</Text>
                                )
                            }else{
                                return(
                                    <Text style = {styles.MovieTagsText}>{tag} - </Text>
                                )
                            }
                        })
                    }

                </View>
            </View>

        </View>

        <View style = {styles.SimilarMoviesWrapper}>
            <View>
                <Text style = {styles.SimilarMoviesText}>Similar Movies</Text>
            </View>

            <View style = {styles.SimilarMovies}>
                <ScrollView horizontal style = {styles.MovieScroll}>
                    {SimilarMovies.map((movie,index) => {
                        return(
                            <TouchableOpacity key = {index} onPress = {() => navigation.replace("ViewMovie",{
                                id: movie.id,
                                user: user,
                            })} >
                                <View style = {styles.MovieCard}>
                                    
                                        {/* my_variable = 'https://drive.google.com/file/d/1KqelJ1_1CAAAy2wWiYijoBGfMxBav-Xy' */}
                                    
                                    <Image resizeMode = "cover" source = {{uri: 'https://drive.google.com/uc?export=view&id='+movie.data.banner}} style = {styles.MoviePoster}/>

                                </View>
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>

            </View> 

        </View>

    </ScrollView>
  ) : (
      <ScrollView style ={styles.container} >

            {/* Show loading gif icon */}
      </ScrollView>
  )
}


const PostFooterIcons = [
    {
        name: 'Like',
        imageUrl: "https://img.icons8.com/material-outlined/24/ffffff/like--v1.png",
        likedImageUrl: "https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png",
    },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',

    },
    MoviePrimaryDetailsWrapper: {
        marginTop: 15,
        marginLeft: 10,
    },
    Title: {
        color: 'white',
        fontSize: 30,
        margin: 10,
        fontFamily: "Montserrat_700Bold"
    },
    ActionButtons: {
        alignItems: 'center',
        marginTop: 20,
    },

    PlayButton: {
        flexDirection: 'row',
        backgroundColor: 'red',
        width: 300,
        height: 34,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

        },
        PlayButtonText: {
            color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
    },

    PauseButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: 300,
        height: 34,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,


    },
    PauseButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
    },

    MovieSubPrimaryDetailWrapper: {
        flexDirection: 'row',
        
        
    },
    AgeBadge: {
        color: '#a2a2a2',
        backgroundColor: '#373737',
        padding: 2,
        borderRadius: 10,
        width: 40,
        height: 30,
        marginLeft: 15,
        textAlign: 'center'


    },
    AgeBadgeText: {
        color: 'white',
        padding: 2,
        textAlign: 'center',
    },
    yearText: {
        color: 'white',
        marginLeft: 20,
        fontSize: 20,

    },

    WatchlistButton: {
        flexDirection: 'row',
        backgroundColor: '#262626',
        width: 140,
        height: 38,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 8,
        alignSelf: 'flex-start'


    },
    WatchlistButtonText: {
        color: 'white',
        marginLeft: 5,

    },  

    MovieSecondaryDetailsWrapper: {
        marginTop: 15,
        marginLeft: 10,
        padding: 10,
    },

    MovieDescription: {
        color: 'white',
        fontSize: 16,
        //fontWeight: '600',
        fontFamily: "Montserrat_500Medium",
        
    },
    MovieTagsWrapper: {
        alignItems: 'center',
        marginTop: 10,
    },
    MovieTags: {
        flexDirection: 'row',
        backgroundColor: '#373737',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: '70%',


    },
    MovieTagsText: {
        color: 'white',
        textAlign: 'center',

    },

    MovieSubPrimaryDetailWrapperMain:  {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    footerIcon: {
        marginRight: 10,
        width: 33,
        height: 33,


    },
    RateText: {
        color: 'white',
        fontFamily: 'Montserrat_500Medium',

    },

    SimilarMoviesWrapper: {

        marginTop: 30,
       

    },
    SimilarMoviesText: {
        paddingLeft: 15,
        // paddingBottom: 5,
        color: 'white',
        fontSize: 22,
        fontFamily: 'Montserrat_700Bold',


    },
    SimilarMovies: {
        marginTop: 15,
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

    watchListGroupWatchWrapper: {
        alignSelf: 'flex-start',
        marginLeft: (Dimensions.get('window').width - 300) /2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    GroupWatchButtonWrapper: {
        flexDirection: 'row',
        backgroundColor: '#262626',
        width: 140,
        height: 38,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
        marginLeft: 20,
    },  
    GroupWatchButtonText: {
        color: 'white',
        marginLeft: 5,
    },
})

export default ViewMovie