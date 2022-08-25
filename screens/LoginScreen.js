import { StyleSheet, Text, View , KeyboardAvoidingView, TextInput, TouchableOpacity, Alert,Image} from 'react-native'
import React ,{ useState,useEffect }from 'react'
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
import {useNavigation} from "@react-navigation/native"

const LogInScreen = () => {
    const[email,setEmail]=useState('');
    const[Password,setPassword]=useState('');

    // const navigation=useNavigation();
    
    const app=initializeApp(firebaseConfig);
    const auth=getAuth(app);
    const handleSignUp=()=>{
        createUserWithEmailAndPassword(auth,email,Password).then((userCredential)=>{
            console.log("usuario creado correctamente");
            const user=userCredential.user;
            console.log(user)
            // navigation.navigate("login")
        }).catch((error)=>{
            console.log(error.message)
            Alert.alert(error.message)
        })

    }
    const handleSignIn=()=>{
        signInWithEmailAndPassword(auth,email,Password).then((userCredential)=>{
            console.log("usuario iniciado correctamente");
            const user=userCredential.user;
            console.log(user)
            // navigation.navigate("Home")
        }).catch((error)=>{
            console.log(error.message)
            Alert.alert(error.message)
        })

    }






  return (
    <KeyboardAvoidingView
    style={styles.container}
    behaviour="padding"
    >
    <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://i.pinimg.com/originals/a5/60/61/a56061edb79b06592ddf76f3c1d48c90.gif',
        }}
      />

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder="Email"
        value={ email}
        onChangeText={text=>setEmail(text)}
        style={styles.input}
        />
        <TextInput 
        placeholder="Password"
        value={Password}
        onChangeText={text=>setPassword(text)}
        style={styles.input}
        secureTextEntry
        />
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={handleSignIn}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity 
        onPress={handleSignUp}
        style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Create Account</Text>
        </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
}

export default LogInScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
    },
    inputContainer:{
        width:"80%"
    },
    input:{
        backgroundColor:"white",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
        borderColor:"gray",
        borderWidth:1,
        color:"green"
    },
    buttonContainer:{
        width:"60%",
        justifyContent:"center",
        alignItems:"center",
        marginTop:40
    },
    button:{
        backgroundColor:"#0782f9",
        width:"100%",
        padding:15,
        borderRadius:10,
        alignItems:"center"
    },
    buttonOutline:{
        backgroundColor:"white",
        marginTop:5,
        borderColor:"#0782f9",
        borderWidth:2

    },
    buttonText:{
        color:"white",
        fontWeight:"700",
        fontSize:16,

    },

    buttonOutlineText:{
        color:"#0782f9",
        fontWeight:"700",
        fontSize:16,
    },
      tinyLogo: {
    width: 100,
    height: 100,
    marginBottom:30
  },
})