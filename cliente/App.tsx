import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/LoginScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
    return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}