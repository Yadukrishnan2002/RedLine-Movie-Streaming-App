import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { createNativeStackNavigator,} from '@react-navigation/native-stack';
import Login from './screen/Login'
import Register from './screen/Register'
import Splash from './screen/Splash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home';
import {AntDesign, MaterialIcons, Ionicons} from '@expo/vector-icons';
import ViewMovie from './screen/ViewMovie';
import MyList from './screen/MyList';


//To remove all warnings appearing in our app during development
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import SearchScreen from './screen/SearchScreen';
import RatingScreen from './screen/RatingScreen';
import ProfilePage from './screen/ProfilePage';
import GroupWatchInitial from './screen/GroupWatchInitial';
import GroupWatchFinal from './screen/GroupWatchFinal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
}

export default function App() {

  function BottomStackScreen() {
    return(
      <Tab.Navigator tabBarOptions = {{
        initialRouteName: "Home",
        activeTintColor: 'white',
        inactiveTintColor: '#5b5b5b',
        tabBarOptions: {
          style: {
         
            backgroundColor: '#141414',
            borderTopWidth: 0,
            // elevation: 0, //android
            // shadowOffset: {
            //   width: 0, height: 0 //IOS
            // },
            height: 60,
            paddingBottom: 10,
          }

        }
        
      }}

      screenOptions = {{
        tabBarItemStyle: {flexDirection: 'row'}
      }}
      >
        <Tab.Screen name = "Home" component={Home} options = {{ headerShown: false,
          tabBarIcon: ({color}) => <AntDesign name = "home" size = {24} color = {color} style = {{marginBottom: -10}} />
        }}/>

        <Tab.Screen name = "Coming Soon" component={Home} options = {{ headerShown: false,
          tabBarIcon: ({color}) => <MaterialIcons name = "video-library" size = {24} color = {color} style = {{marginBottom: -10}} />
        }}/>

        <Tab.Screen name = "Downloads" component={Home} options = {{ headerShown: false,
          tabBarIcon: ({color}) => <AntDesign name = "download" size = {24} color = {color} style = {{marginBottom: -10}} />
        }}/>
      </Tab.Navigator>

    ) 

  }

  return (
    <NavigationContainer>
     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {{flex: 1}} keyboardVerticalOffset = {Platform.OS === "ios" ? -64 : 0}>
        <Stack.Navigator initialRouteName='Splash' screenOptions={screenOptions}>

        <Stack.Screen name = "Splash" component={Splash} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }}/>
          
          <Stack.Screen name = "Login" component={Login} options = {{
            gestureEnabled: false,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }}/>

          <Stack.Screen name = "Register" component={Register} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "Home" component={Home} options = {{
            gestureEnabled: false,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "ViewMovie" component={ViewMovie} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "MyList" component={MyList} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "SearchScreen" component={SearchScreen} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "RatingScreen" component={RatingScreen} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "ProfilePage" component={ProfilePage} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "GroupWatchInitial" component={GroupWatchInitial} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          <Stack.Screen name = "GroupWatchFinal" component={GroupWatchFinal} options = {{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />

          {/* <Stack.Screen name = "BottomStack" component={BottomStackScreen} /> */}

        </Stack.Navigator>
     </KeyboardAvoidingView>

    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
