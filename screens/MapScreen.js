import React from "react";
import { Text,StyleSheet,View } from "react-native";
import Map from "../Components/Map";
import MapView from 'react-native-maps'
import tw from "tailwind-react-native-classnames";
const MapScreen = () =>{
    return(
        <View>
            <View style={tw`h-2/3`}>
             <Map/>
            </View>
            <View style={tw`h-1/2`}>
                
            </View>
        </View>
    )
}
export default MapScreen;