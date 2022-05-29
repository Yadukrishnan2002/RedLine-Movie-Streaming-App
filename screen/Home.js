import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView , SafeAreaView} from 'react-native'
import React, {useState,useEffect,useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import { Dimensions } from 'react-native'
import { bottomTabIcons } from '../components/BottomTabs'
import {firebase,auth,db} from '../firebase'
import BottomTabs from '../components/BottomTabs'
import HeaderTabs from '../components/HeaderTabs'
import Hero from '../components/Hero'
import Movies from '../components/Movies'
import axios from 'axios'
import {AntDesign} from '@expo/vector-icons'
//import { ScrollView } from 'react-native-gesture-handler';


const Home = ({navigation}) => {

    const [movies,setMovies] = useState([])
    const [user,setUser] = useState('')

    const [dbMovies,setDBmovies] = useState([])
    const [dbRating,setDBrating] = useState([])

    const [result, setResult] = useState([])

    const [recMovies,setRecMovies] = useState([])


    const [watchCount,setWatchCount] = useState([])
    const [movieNames,setMovieNames] = useState([])
    

    const [TrendingMovies, setTrendingMovies] = useState([])
    const [TrendingNO1,setTrendingNO1] = useState()


    const [SuperheroMovies,setSuperheroMovies] = useState([])
    




    // The below code will extract the details of the current user. And if the current user
    // changes then it will refresh again. That is why we put a firebase code in the [] brackets
    // in the end

    const addTodo = async () => {

        // Online Hosted API
        // https://bgnsbn.deta.dev/api/todo/

        axios.post('http://127.0.0.1:8000/api/todo/',{'title':dbMovies,'description':dbRating})
       
        
        //Online Hosted API
        // https://bgnsbn.deta.dev/api/data
        // 
        let res = await axios.get('http://127.0.0.1:8000/api/data')
        
        



        setResult(res.data)


        

        // console.log(res.data)
        
        // console.log(result)

        // result.length !=0 && result.map((movieName,index) => {
        //     db.collection('movies').onSnapshot(snapshot => {
        //         snapshot.docs.map(doc => {
        //             if(doc.data().name == movieName){
        //                 console.log("Matched")
        //                 setRecMovies(doc.data())
                        
        //             }
        //         })
        //     })
        // })


        // result.map((movResult,index1) => {
        //     console.log(movResult)
        //     movies.map((movMovies,index2) => {
              
        //         if(movResult == movMovies.data.name){
        //             console.log("matched")
                   
                   
        //         }
        //     })
        // })
        let tempState = []
        
        res.data.map((movResult,index) => {
             
             movies.map((movMovies,index2) => {
                 if(movResult === movMovies.data.name){
                     tempState = [...tempState, movMovies]
                 }
             })
             
         })
         
        setRecMovies(tempState)

        

      
        


    }


    const addTrending = async () => {
        
        // axios.post('http://127.0.0.1:8000/api/todo/',{'title':dbMovies,'description':dbRating})
        // .then(res => console.log(res.data))

        

        // let res = await axios.get('http://127.0.0.1:8000/api/data')

        // Online Hosted API
        // https://bgnsbn.deta.dev/api/PostTrending

        axios.post('http://127.0.0.1:8000/api/PostTrending',{'Mnames':movieNames, 'MwatchCounts':watchCount})
        

        // Online Hosted API
        // https://bgnsbn.deta.dev/api/GetTrending

        let trend = await axios.get('http://127.0.0.1:8000/api/GetTrending')

        console.log("Trend",trend.data)

        let tempTrendState = []

        trend.data.map((movTrend,index) => {
            movies.map((movieDB,index2) => {
                if(movTrend === movieDB.data.name){
                    tempTrendState = [...tempTrendState,movieDB]
                }

            })
        })

        setTrendingMovies(tempTrendState)


        console.log(TrendingMovies[0])

        


    }

    const PostTrending = () => {

        setTrendingNO1(TrendingMovies[0])
    }


    const FindSuperheroMovies = () => {

        let tempsupestate = []
        
        movies && movies.map((mov,index) => {

            if(mov.data.tags[1] == 'Superhero'){
                tempsupestate = [...tempsupestate,mov]
            }
        })

        setSuperheroMovies(tempsupestate)

    }



    useEffect(() => {
        db.collection('users').doc(firebase.auth().currentUser.email).onSnapshot(doc => {
            if(doc.exists){
                setUser(doc.data())
                
                
                
            }
        })
    },[firebase.auth().currentUser])


    //The below code will get all the movies
    useEffect(() => {
        const unsubscribe = db.collection('movies').onSnapshot(snapshot => {
            setMovies(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                }))
            )
        })
        return unsubscribe
    },[])

     
    


    //Recommended Movies

    useEffect(() => {
        db.collection('users').doc(firebase.auth().currentUser.email).collection('MoviesWatched').onSnapshot(snapshot => {
            setDBmovies(snapshot.docs.map(doc => doc.data().movieName))
        })
        
        
    },[])

    useEffect(() => {
        db.collection('users').doc(firebase.auth().currentUser.email).collection('MoviesWatched').onSnapshot(snapshot => {
            setDBrating(snapshot.docs.map(doc => doc.data().rating))
        })
        
        
    },[])

    useEffect(() => {
        db.collection('movies').onSnapshot(snapshot => {
           setWatchCount(snapshot.docs.map(doc => doc.data().watchCount))
           setMovieNames(snapshot.docs.map(doc => doc.data().name))

        })
    },[])

    useEffect(() => {
        addTodo()
        
        

    },[dbMovies,dbRating])


     useEffect(() => {
        addTrending()
        

     },[movieNames,watchCount])

     useEffect(() => {
         PostTrending()

     },[TrendingMovies])


     useEffect(() => {
         FindSuperheroMovies()
     },[movies])



  return (
    
    <View style = {styles.outerContainer}>

       
        
       
       
      {/* <StatusBar translucent backgroundColor='transparent' barStyle = 'light-content' /> */}

    
      

      <View style = {styles.container}>
     
        <View style = {styles.HeaderContent}>
            <View style = {styles.LogoTextWrapper}>
                <View style = {styles.LogoWrapper}>
                    <Image resizeMode = "contain" source = {require('../assets/RedlineColoredLogo.png')}  style = {styles.Logo}/>
                </View>
                <View>
                    <Image resizeMode='contain' source={require('../assets/RedlineColoredText.png')}  style = {{width: 100,height: 30,}}/>
                </View>
            </View>

            <View style = {styles.SearchIconWrapper}>

                <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>  
                    <Image source={{uri: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png"}} style = {styles.SearchIcon} />
                </TouchableOpacity>

            </View>
            
        </View>

        <ScrollView>
        
        
      {/* 'https://cdn.vox-cdn.com/thumbor/9PqzVk9RnfW0g22byhIyRSPDBYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8832449/strangerthings.jpg' */}
         {TrendingNO1 && (<Image  source = {{uri: 'https://drive.google.com/uc?export=view&id=' + TrendingNO1.data.banner }}  style = {styles.Poster}/>) }
        
            
        {/* <Header login = {true} navigation = {navigation}/>   */}
        
        
       

        {TrendingNO1 && (<Hero user = {user} TrendingNo1 = {TrendingNO1}/>)  }

        {
            movies && (
                <React.Fragment>
                { recMovies.length!=0 && (<Movies label="Recommended for you" item = {recMovies} user = {user}/>)  }
                 {  TrendingMovies.length !=0 && ( <Movies label="Top 10 Trending" item = {TrendingMovies} user = {user} /> ) }
                 {  SuperheroMovies.length !=0 && (<Movies label="Superhero Movies" item = {SuperheroMovies} user = {user} /> )}
                </React.Fragment>
            )
        }

          
      
      </ScrollView>
      </View>
      <BottomTabs icons = {bottomTabIcons} navigation = {navigation} user = {user}/>
     
    </View>
    
  )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#000000',

    },
    container: {
        flex: 1,
        backgroundColor: '#000000',

    },
    Poster: {
        width: '100%',
        height: (Dimensions.get('window').height * 81) / 100,
        zIndex: -1000,


        



    },
    gradient: {
        height: '101%',

    },
    Tab: {
        zIndex: 1000,
        fontSize: 18,
        color: 'white',
        fontWeight: '400',
       

    },
    Headericons: {
        flexDirection: 'row',
        zIndex: 1000,
        
        marginTop: 50,
    },

    

    HeaderContent: {
       
        width: '100%',
        zIndex: 1000,
        //position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.9)',

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        borderRadius: 15,
        
        
    },
    LogoWrapper: {

        marginLeft: 20,
        paddingBottom: 10,

    },

    Logo: {
        
        width: 40,
        height: 40,
       
    },

    SearchIcon: {
      
        
        width: 35,
        height: 35,
        
    },
    SearchIconWrapper: {
        marginRight: 20,
        paddingBottom: 10,


    
    },
    LogoTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    HeaderText: {
        color: 'white',
        fontSize: 28,
        marginLeft: 10,
        
    },

    
    

})

export default Home