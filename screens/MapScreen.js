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
      <View style={tw`h-3/4`}>
        <Map />
      </View>
      <View style={tw`h-1/4`}>
        <Stack.Navigator>
          <Stack.Screen
            name='ParkingCard'
            component={ParkingCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}

export default MapScreen;
