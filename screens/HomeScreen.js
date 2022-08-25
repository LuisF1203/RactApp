import { StatusBar } from "expo-status-bar";
import React,{useState,useEffect} from "react";
import * as Location from "expo-location"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import MapView,{Marker,Polyline} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {GOOGLE_MAPS_ENV} from '@env'
// import AsyncStorage from '@react-native-community/async-storage';
const carImage=require('../assets/car.png')
const imagenes = [
  "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
  "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
  "https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

function Backdrop({ scrollX }) {
  return (
    <View
      style={[
        {
          position: "absolute",
          height: ALTURA_BACKDROP,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={index}
            source={{ uri: imagen }}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function HomeScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [origin,setOrigin]=useState({
    latitude:33.640411,
    longitude:-84.419853,
  })
  const [destination,setDestination]=useState({
    latitude:33.753746,
    longitude:-84.386330,
  })





  useEffect(()=>{
  getLocationPermission();
  },[])


  async function getLocationPermission(){
    let { status }= await Location.requestForegroundPermissionsAsync();
    if(status!== 'granted'){
      alert('Permission denied');
      return;
    }
    // let location=await Location.getCurrentPositionAsync({});
    // const current={
    //   latitude:location.coords.latitude,
    //   longitude:location.coords.longitude
    // }
    // setOrigin(current);
    // console.log(current);
    // console.log("pidiendo localisación")
    let location=await Location.getCurrentPositionAsync({});
    alert("hola")
  }




  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        snapToInterval={ANCHO_CONTENEDOR}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={imagenes}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR,
          ];

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          return (
            <TouchableOpacity style={{ width: ANCHO_CONTENEDOR }} onPress={()=>{
              console.log("hola mundo");
            }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 34,
                  backgroundColor: "white",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={{ uri: item }} style={styles.posterImage} />
                <Text style={{ fontWeight: "bold", fontSize: 26 ,color:"gray"}}>
                  {" "}
                  {"Username"}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <View marginHorizontal={20}>
      <Text>A tu alrededor</Text>
      <MapView style={styles.map} 
      initialRegion={{
        latitude:origin.latitude,
        longitude:origin.longitude,
        latitudeDelta:0.09,
        longitudeDelta:0.04
      }}

      >
        <Marker

        draggable={true}
          coordinate={origin}
          image={carImage}
          onDragEnd={(direction)=>{
            setOrigin(direction.nativeEvent.coordinate)
          }}
        />
        <Marker
          draggable={true}
          coordinate={destination}
          onDragEnd={(direction)=>{
            setDestination(direction.nativeEvent.coordinate)
          }}
          />
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_ENV}
        strokeColor="black"
        strokeWidth={3}
      />
      {/* <Polyline
        coordinates={[origin,destination]}

      /> */}

      </MapView>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   justifyContent: "center",
  // },
  posterImage: {
    width: "100%",
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  map:{
    width:300,
    height:200,
    marginTop:10,
  },
  //   scrollView: {
  //   // backgroundColor: 'pink',
  //   marginHorizontal: 20,
  // },
  // text: {
  //   fontSize: 42,
  // },
});