import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedPaymentMethod,
  selectSelectedParkingTime,
  setSelectedPaymentMethod,
  setSelectedParkingTime,
} from '../slices/navSlice';
import { IP } from '@env';
const SelectParkingScreen = ({  }) => {
  const navigation = useNavigation();
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

  const calculatePrice = (parkingTime) => {
    switch (parkingTime) {
      case '30':
        return 5;
      case '60':
        return 8;
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
        const price = calculatePrice(selectedParkingTime);
  
        // Present the payment sheet
        const { error } = await presentPaymentSheet({
          amount: price,
        });

        if (!error) {
          navigation.navigate('PaymentSuccessfulScreen',{selectedPaymentMethod,selectedParkingTime,price});
        }
  
        // Handle errors
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
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
    console.log(price);
    const url = `${IP}/payment-sheet`;
    const response = await fetch(url, {
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
      manualInitialization: true,
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
            <TouchableOpacity
              style={[styles.botonCalifica, selectedParkingTime === '30' ? styles.botonCalificaSeleccionado : null]}
              onPress={() => handleParkingTimeSelect('30')}
            >
              <Text style={styles.textBotonCalificaTop}>30 min</Text>
              <Text style={styles.textBotonCalificaBottom}>$5.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonCalifica, selectedParkingTime === '60' ? styles.botonCalificaSeleccionado : null]}
              onPress={() => handleParkingTimeSelect('60')}
            >
              <Text style={styles.textBotonCalificaTop}>60 min</Text>
              <Text style={styles.textBotonCalificaBottom}>$8.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonCalifica, selectedParkingTime === '120' ? styles.botonCalificaSeleccionado : null]}
              onPress={() => handleParkingTimeSelect('120')}
            >
              <Text style={styles.textBotonCalificaTop}>120 min</Text>
              <Text style={styles.textBotonCalificaBottom}>$12.00</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Forma de Pago</Text>
          <View style={styles.botonesCalificacion}>
            <TouchableOpacity
              style={[styles.botonCalifica, selectedPaymentMethod === 'Stripe' ? styles.botonCalificaSeleccionado : null]}
              onPress={() => handlePaymentMethodSelect('Stripe')}
            >
              <Text style={styles.textBotonCalifica}>Stripe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonCalifica, selectedPaymentMethod === 'PayPal' ? styles.botonCalificaSeleccionado : null]}
              onPress={() => handlePaymentMethodSelect('PayPal')}
            >
              <Text style={styles.textBotonCalifica}>PayPal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonCalifica, selectedPaymentMethod === 'Otro' ? styles.botonCalificaSeleccionado : null]}
              onPress={() => handlePaymentMethodSelect('Otro')}
            >
              <Text style={styles.textBotonCalifica}>Otro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.reservarButton} onPress={handleReservation}>
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
    backgroundColor: '#171a21',
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
    color: '#c7d5e0',
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
    borderColor: '#c7d5e0',
    alignItems: 'center',
  },
  botonCalificaSeleccionado: {
    backgroundColor: '#66c0f4',
    borderColor: '#66c0f4',
  },
  textBotonCalificaTop: {
    fontSize: 16,
    color: '#c7d5e0',
  },
  textBotonCalificaBottom: {
    fontSize: 14,
    color: '#c7d5e0',
    marginTop: 5,
  },
  textBotonCalifica: {
    fontSize: 16,
    color: '#c7d5e0',
  },
  reservarButton: {
    backgroundColor: '#66c0f4',
    padding: 10,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 20,
    color: '#c7d5e0',
  },
});

export default SelectParkingScreen;
