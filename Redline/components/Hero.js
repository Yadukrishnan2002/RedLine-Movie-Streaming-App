import { View, Text, StyleSheet, Image,TouchableOpacity,Dimensions} from 'react-native'
import React, {useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase,db,auth} from '../firebase'
import {Feather,Ionicons} from '@expo/vector-icons'
//import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold

} from '@expo-google-fonts/montserrat'



const Hero = ({user,TrendingNo1}) => {

    const navigation = useNavigation();
    const[mylist, setMylist] = useState(user.list)

    const [HeartRed,setHeartRed] = useState(false)
    console.log(TrendingNo1.data.watchCount)
    

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold

    })
    

    useEffect(() => {
        db.collection('users').doc(firebase.auth().currentUser.email).collection('MoviesWatched').onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if((doc.data().movieName == TrendingNo1.data.name) && (doc.data().rating != 2.5)){
                    setHeartRed(true)
                }
            })
        })
    },[])
    // fontsLoaded &&

  return  (

    <View style = {styles.container}>


        
        
       
       <View style = {styles.container2}>

            <View style = {styles.TrendingWrapper}>
                <Text style = {styles.TrendingText}>Trending #1</Text>
            </View>

        <View style = {styles.HeaderTitleContainer}>

            

            <View style = {styles.Moviename}>
                <Text style = {styles.MovienameText}>{TrendingNo1.data.name}</Text>

            </View>


        </View>
       
        <View style = {styles.Tags}>
            {
                TrendingNo1?.data.tags.slice(0,3).map((tag,index) => {
                    
                    if(index + 1 == TrendingNo1.data.tags.length){
                        return(
                        <Text style = {styles.MenuTag} key ={index}>{tag}</Text>
                        )
                    }

                    else
                    {
                        return(
                        <Text style = {styles.MenuTag} key ={index}>{tag} - </Text>
                        )

                    }
                })
            }
        </View>
        
        <View style = {styles.MenuHero}>

            <View>
                
                { 
                        // db.collection('users').doc(firebase.auth().currentUser.email).where('list','array-contains','UJ40wWq43DSYFSsEFQ90') ? (
                           // mylist.includes("UJ40wWq43DSYFSsEFQ90") ? (
                        user.list && user.list.includes(TrendingNo1.data.id) ? (
                           

                        <TouchableOpacity style = {styles.ListButton} onPress = {() => {
                            db.collection('users').doc(firebase.auth().currentUser.email).collection('watchlist').doc(TrendingNo1.data.id).delete()

                            var list = user.list
                            list.splice(list.indexOf(TrendingNo1.data.id), 1)

                            db.collection('users').doc(firebase.auth().currentUser.email).update({
                                list,
                            })
                        }} >

                            <Feather name="check" size={24} color="#fff" />
                            <Text style = {styles.ListButtonText}>Added</Text>

                         </TouchableOpacity>

                    ) : (
                        <TouchableOpacity style = {styles.ListButton} onPress = {() => {
                            db.collection('users').doc(firebase.auth().currentUser.email).collection('watchlist').doc('UJ40wWq43DSYFSsEFQ90').set({
                                movieID: TrendingNo1.data.id,
                                banner: TrendingNo1.data.banner,
                            });

                            var list = user.list
                            list.push(TrendingNo1.data.id)
                            db.collection('users').doc(firebase.auth().currentUser.email).update({
                                list,
                            })
                            
                        }}>

                            
                            <Ionicons name = "add-outline" size = {28} color = '#fff' />
                            <Text style = {styles.ListButtonText}>My List</Text>

                         </TouchableOpacity>
                    )
                }
               

            </View>
            

            
            <View>
                <TouchableOpacity style = {styles.PlayButton} onPress = {() => {
                    navigation.navigate("ViewMovie",{
                        id: TrendingNo1.data.id,
                        watchCountTemp: TrendingNo1.data.watchCount,
                        CurrentMovieName: TrendingNo1.data.name,
                        user: user,
                    })
                }}>
                    <Ionicons name = "ios-play" size = {26} color = "white"/>
                    <Text style = {styles.PlayButtonText}>Play</Text>
                </TouchableOpacity>
            </View>

            <View>
            <View style = {styles.HeartIconWrapper}>
                       

                        <TouchableOpacity onPress={() => navigation.navigate("RatingScreen",{
                            id: TrendingNo1.data.id,
                            name: TrendingNo1.data.name,
                            user: user,
                            watchCountTemp: TrendingNo1.data.watchCount,
                        })}>
                            <Image style = {styles.footerIcon} source = {{uri: HeartRed ? PostFooterIcons[0].likedImageUrl : PostFooterIcons[0].imageUrl}} />
                        </TouchableOpacity> 

                        <Text style = {styles.RateText}>Rate</Text>
            </View>

            </View>

        </View>

        </View>

    </View>
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
        
        // backgroundColor: 'rgba(0, 0, 0, 0.1)',

        position: 'absolute',
        
        width: '100%',
        alignItems: 'center',
        marginTop: 410,
        height: '50%',
        

    },
    container2: {

        borderRadius: 30,

        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
       
        width: '100%',
        alignItems: 'center',
        
        
        height: '50%',
        paddingTop: 10,
        marginTop: ((Dimensions.get('window').height * 81) / 100) - 600,


    },

    

    Banner: {
        
        height: 135,
        width: '100%'

    },
    Tags: {
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    MenuTag: {
       
       
        color: '#fff',
        paddingTop: 0,
        paddingBottom: 8,
        fontSize: 13,
        fontWeight: '700'
    },
    MenuHero: {
       
        width: '90%',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ListButton: {
        alignItems: 'center'
    },
    ListButtonText: {
        color: '#fff',
        fontSize: 13,
        marginTop: 3,
    },

    PlayButton: {
        flexDirection: 'row',
        backgroundColor: 'red',
        width: 145,
        height: 35,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

        },
        PlayButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: 'white',
    },

    InfoButton: {
        alignItems: 'center'

    },
    InfoButtonText: {
        color: '#fff',
        fontSize: 13,
        marginTop: 3,

    },

    Moviename: {

    },
    MovienameText: {
        color: 'white',
        fontSize: 27,
        fontFamily: 'Montserrat_700Bold'

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
    
    TrendingWrapper: {
        
        backgroundColor: '#fff',
        marginLeft: -Dimensions.get('window').width + 150,
        width: '30%',
        
        borderRadius: 20,
        alignItems: 'center',
        height: 25,
       
        
        
    

    },
    TrendingText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '700',
        

    },
    HeaderTitleContainer: {
        alignItems: 'center'
        
    },  
    

   

})

export default Hero
