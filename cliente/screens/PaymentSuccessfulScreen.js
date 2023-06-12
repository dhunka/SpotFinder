import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const PaymentSuccessfulScreen = () => {
    const Stack = createNativeStackNavigator();
  return (
    <View>
      <Text>PaymentSuccessfulScreen</Text>
    </View>
  )
}

export default PaymentSuccessfulScreen

const styles = StyleSheet.create({})