// In App.js in a new project

import react,{useEffect,useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { initializeApp  } from 'firebase/app';

import MainContainer from './navigation/MainContainer';

import { firebaseConfig } from './firebase-config'; 
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  
} from 'firebase/auth';






const Stack = createNativeStackNavigator();

function App() {
  const [log,setLog]=useState(false);
  useEffect(()=>{
    const app=initializeApp(firebaseConfig);
    const auth=getAuth(app);
            onAuthStateChanged(auth, (user) => {
        if (user) {
          setLog(true)
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
          setLog(false)
            // User is signed out
            // ...
        }
        });
  },[])

  
return(
  log?<MainContainer/>:<Login/>
)

  // if(log){
  // return (
  //   <MainContainer/>
  // );
  // }else{
  //   return(
  //     <Login/>
  //   )
  // }

}

export default App;