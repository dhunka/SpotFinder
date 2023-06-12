import React from "react";
import { View } from "react-native";
import Map from "../Components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "tailwind-react-native-classnames";
import ParkingCard from "../Components/ParkingCard";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <View style={tw`h-full w-full`}>
        <Map />
      </View>
    </View>
  );
}

export default MapScreen;
