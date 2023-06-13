import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedPaymentMethod,
  selectSelectedParkingTime,
  setSelectedPaymentMethod,
  setSelectedParkingTime,
} from '../slices/navSlice';

const SelectParkingScreen = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);
  const selectedParkingTime = useSelector(selectSelectedParkingTime);
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePaymentMethodSelect = (method) => {
    dispatch(setSelectedPaymentMethod(method));
  };

  const handleParkingTimeSelect = (time) => {
    dispatch(setSelectedParkingTime(time));
  };

  const calculatePrice = () => {
    switch (selectedParkingTime) {
      case '30':
        return 5;
      case '60':
        return 10;
      case '120':
        return 15;
      default:
        return 0;
    }
  };
  
  const handleReservation = async () => {
    console.log("Reservar");
  
    // Check if the user has selected a payment method
    if (selectedPaymentMethod === 'Stripe') {
  
      // Check if the user has selected a parking time
      if (selectedParkingTime) {
  
        // Calculate the price of the parking
        const price = calculatePrice();
  
        // Present the payment sheet
        const { error } = await presentPaymentSheet({
          amount: price,
        });
  
        // Handle errors
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          console.log("Formulario de pago desplegado correctamente");
          const { error: presentError } = await presentPaymentSheet();
          if (presentError) {
            Alert.alert(`Error code: ${presentError.code}`, presentError.message);
          }
        }
  
      } else {
        Alert.alert("Error", "Selecciona un tiempo de estacionamiento");
      }
  
    } else {
      // Logic for other payment methods
    }
  };
  const fetchPaymentSheetParams = async () => {
    const price = calculatePrice(selectedParkingTime);
  
    const response = await fetch(`http://192.168.1.8:8080/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: price,
      }),
    });
  
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await response.json();
  
    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();
  
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      manualInitialization: true, // Agregamos esta opción para la inicialización manual del PaymentSheet
    });
  
    if (!error) {
      setLoading(true);
    }
  };
  

  useEffect(() => {
    initializePaymentSheet();
  }, [selectedParkingTime]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/Estacionamiento.png')} />
      </View>

      <View style={styles.categorias}>
        <View>
          <Text style={styles.text}>Avenida Francisco Bilbao 511</Text>
        </View>
        <View>
          <Text style={styles.text}>Tiempo</Text>
          <View style={styles.botonesCalificacion}>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedParkingTime === '30'
                ? styles.botonCalificaSeleccionado : styles.botonCalifica]}
                onPress={() => handleParkingTimeSelect('30')}
              >
                <Text style={styles.textBotonCalifica}>30 min</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedParkingTime === '60'
                ? styles.botonCalificaSeleccionado : styles.botonCalifica]}
                onPress={() => handleParkingTimeSelect('60')}
              >
                <Text style={styles.textBotonCalifica}>60 min</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedParkingTime === '120'
                ? styles.botonCalificaSeleccionado : styles.botonCalifica]}
                onPress={() => handleParkingTimeSelect('120')}
              >
                <Text style={styles.textBotonCalifica}>120 min</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Forma de Pago</Text>
          <View style={styles.botonesCalificacion}>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedPaymentMethod === 'Stripe'
                ? styles.botonCalificaSeleccionado : styles.botonCalifica]}
                onPress={() => handlePaymentMethodSelect('Stripe')}
              >
                <Text style={styles.textBotonCalifica}>Stripe</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedPaymentMethod === 'PayPal'
                ? styles.botonCalificaSeleccionado : styles.botonCalifica]}
                onPress={() => handlePaymentMethodSelect('PayPal')}
              >
                <Text style={styles.textBotonCalifica}>PayPal</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedPaymentMethod === 'Otro'
                ? styles.botonCalificaSeleccionado : styles.botonCalifica]}
                onPress={() => handlePaymentMethodSelect('Otro')}
              >
                <Text style={styles.textBotonCalifica}>Otro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.reservarButton}
        onPress={handleReservation}
      >
        <Text style={styles.textButton}>Reservar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  categorias: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  botonesCalificacion: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  botonCalifica: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  botonCalificaSeleccionado: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  botonContent: {
    alignItems: 'center',
  },
  textBotonCalifica: {
    fontSize: 16,
  },
  reservarButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
  },
});

export default SelectParkingScreen;
