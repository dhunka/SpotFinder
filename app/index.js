import React from "react";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import HomeScreen from "../screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
  
    <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
             <SafeAreaView>
               <HomeScreen/>
             </SafeAreaView>
          </SafeAreaProvider>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

