import React, { Component } from "react";
import MapView from "react-native-maps";

import { Text,StyleSheet,View } from "react-native";

export default class Map extends Component{
   
    render(){
        return(
            <View style={styles.container}> 
                <MapView
               style={styles.map}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
    },
    map:{
        flex:1,
    }
})