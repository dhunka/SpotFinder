import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import tw from "tailwind-react-native-classnames";
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';


const Map = () => {
    const origin = useSelector(selectOrigin);
  return (
    <View style={tw`flex-1`}>
      <MapView
      style={tw`flex-1`}
      initialRegion={{
        latitude:origin.location.lat,
        longitude:origin.location.lng,
        latitudeDelta:0.005,
        longitudeDelta:0.005,
      }}
      />
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})