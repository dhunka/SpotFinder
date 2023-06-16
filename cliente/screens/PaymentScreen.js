import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Checkout = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const initializePaymentSheet = async () => {
    const response = await fetch('http://192.168.1.7:8080/payment-sheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { paymentIntent, customer, publishableKey } = await response.json();

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: customer,
      merchantDisplayName: 'Example, Inc.',
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Checkout"
        onPress={openPaymentSheet}
        disabled={!loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PaymentScreen = () => { 
  const Stack = createNativeStackNavigator();

  return (
    <StripeProvider
      publishableKey="pk_test_51N75MIGD6rvnwVkTDi2rwCqgzXzroP7Osg6FjbznpuZyFqCTKrhtYpDYjuXvCm1AqhFSFfuFpo5CunviTZnyH52K00HWd3jwyP"
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
    >
      <Checkout/>
    </StripeProvider>
  );
};

export default PaymentScreen;