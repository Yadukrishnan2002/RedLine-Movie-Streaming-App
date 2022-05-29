import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
//import { TouchableOpacity } from 'react-native-gesture-handler'

const HeaderTabs = () => {
  return (
    <View style = {styles.container}>
        <TouchableOpacity >
            <Text style = {styles.Tab}>TV Shows</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style = {styles.Tab}>
            <Text>Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.Tab}>
            <Text>My Lists</Text>
        </TouchableOpacity>

      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 25,
        paddingBottom: 50,
        paddingRight: 0,
        paddingLeft: 50,
        width: '100%',

    },

    Tab: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1000,
        fontSize: 18,
        color: 'white',
        fontWeight: '400',
        top: 100,

    },



})

export default HeaderTabs