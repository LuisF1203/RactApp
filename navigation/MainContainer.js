import React ,{ useState,useEffect }from 'react'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { initializeApp  } from 'firebase/app';
import { firebaseConfig } from "../firebase-config"
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  
} from 'firebase/auth';





// Screens
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

//Screen names
const homeName = "Home";
const settingsName = "Settings";
const LoginName = "Login";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            }else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          labelStyle: { paddingBottom: 10, fontSize: 10},
          style: { padding: 10, height: 90},
        }}>


        


        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        {/* <Tab.Screen name={LoginName}  component={LoginScreen} /> */}

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;