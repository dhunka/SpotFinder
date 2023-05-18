import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import NavOptions from '../Components/NavOptions'
import tw from "tailwind-react-native-classnames";
import {GOOGLE_MAPS_APIKEY} from "@env";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {useDispatch} from "react-redux";
import { setDestination,setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
    const dispatch=useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text>ola</Text>
        <GooglePlacesAutocomplete
            placeholder="where from?" 
            styles={{
                container:{
                    flex:0,
                },
                textInput:{
                    fontSize:18,
                }
            }}
            onPress={(data,details = null) =>{
             dispatch(
                setOrigin({
                location: details.geometry.location,
                description: data.description
             }))
             dispatch(setDestination(null))
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            query={{
                key:GOOGLE_MAPS_APIKEY,
                language:"en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            />
        <NavOptions/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})