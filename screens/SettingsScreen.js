import react from "react";
import { StyleSheet, Text, View , KeyboardAvoidingView, TextInput, TouchableOpacity, Alert,Image} from 'react-native'
import { getAuth, signOut } from "firebase/auth";
import {useNavigation} from "@react-navigation/native"
function SettingsScreen(){
// const navigation=useNavigation();
    const handleSignOut=()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        
        console.log("user logout");
        // navigation.navigate("login")
        }).catch((error) => {
        console.log(error.message);
        });
    }
    return(
<KeyboardAvoidingView
    style={styles.container}
    behaviour="padding"
    >
    {/* <View style={styles.viewTinyLogo}>
        <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://i.pinimg.com/originals/a5/60/61/a56061edb79b06592ddf76f3c1d48c90.gif',
        }}
        resizeMode={"cover"}
      />
    </View> */}

{/* <Image source={{ uri:"https://i.pinimg.com/originals/a5/60/61/a56061edb79b06592ddf76f3c1d48c90.gif" }} style={styles.tinyLogo} /> */}
<Image 
  source={{
    uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'
  }} 
  style={{width: 100, height: 100, borderRadius: 100/ 2}} 
/>


    <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={handleSignOut}
        style={styles.button}
        >
        <Text style={styles.buttonText}>SignOut</Text>
        </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
        
    )
}

export default SettingsScreen;
const styles = StyleSheet.create({
   
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
    },
    buttonContainer:{
        width:"60%",
        justifyContent:"center",
        alignItems:"center",
        marginTop:40
    },
    button:{
        backgroundColor:"red",
        width:"100%",
        padding:15,
        borderRadius:10,
        alignItems:"center"
    },

    buttonText:{
        color:"white",
        fontWeight:"700",
        fontSize:16,

    },
      tinyLogo: {
    width: 150,
    height: 150,
    borderColor: 'red',
    borderWidth: 10,
    borderRadius: 75
  },
//   viewTinyLogo:{
//     // flex: 0,

//     borderWidth: 6,
//     borderRadius: 50,
//     // padding:9,
//     backgroundColor:"black"
//     // borderTopRightRadius: 20,
//   }


})