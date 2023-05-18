import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import NewCarScreen from "../screens/NewCarScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='MapScreen'
            component={MapScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
          <Stack.Screen
            name='NewCarScreen'
            component={NewCarScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
        </Stack.Navigator>
   
    </Provider>
  );
}
