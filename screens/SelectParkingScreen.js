import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentScreen from '../screens/PaymentScreen';
import { useEffect } from 'react';
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
  
  const handlePaymentMethodSelect = (method) => {
    dispatch(setSelectedPaymentMethod(method));
  };

  const handleParkingTimeSelect = (time) => {
    dispatch(setSelectedParkingTime(time));
  };


  const handleReservation = () => {
    if (selectedPaymentMethod === 'Stripe') {
      if (selectedParkingTime) {
        navigation.navigate('PaymentScreen', {
          parkingTime: selectedParkingTime,
          paymentMethod: selectedPaymentMethod,
        });
      } else {
        // Mostrar un mensaje de error indicando que se debe seleccionar un tiempo de estacionamiento
      }
    } else {
      // Lógica para otras formas de pago
    }
  };

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
                style={[styles.botonContent, selectedParkingTime === '30min' && styles.selectedParkingTime]}
                onPress={() => handleParkingTimeSelect('30min')}
              >
                <View>
                  <Text>30 min</Text>
                </View>
                <View>
                  <Text>$5</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedParkingTime === '1hr' && styles.selectedParkingTime]}
                onPress={() => handleParkingTimeSelect('1hr')}
              >
                <View>
                  <Text>1 hora</Text>
                </View>
                <View>
                  <Text>$10</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedParkingTime === '2hr' && styles.selectedParkingTime]}
                onPress={() => handleParkingTimeSelect('2hr')}
              >
                <View>
                  <Text>2 horas</Text>
                </View>
                <View>
                  <Text>$8</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.botonCalifica}>
              <TouchableOpacity
                style={[styles.botonContent, selectedParkingTime === 'Other' && styles.selectedParkingTime]}
                onPress={() => handleParkingTimeSelect('Other')}
              >
                <View>
                  <Text>Otro</Text>
                </View>
                <View>
                  <Text>Precio</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Pagos</Text>
            <View>
              <TouchableOpacity
                style={[styles.paymentButton, selectedPaymentMethod === 'Stripe' && styles.selectedPaymentMethod]}
                onPress={() => handlePaymentMethodSelect('Stripe')}
              >
                <Text style={styles.paymentButtonText}>Stripe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Comentarios</Text>
        </View>
        <TouchableOpacity style={styles.botonBottom} onPress={handleReservation}>
          <Text style={styles.text}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectParkingScreen;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categorias: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'black',
    height: windowHeight * 2 / 3,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17
  },
  botonCalifica: {
    width: 60,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#fb0e0e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2
  },
  botonContent: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column'
  },
  botonesCalificacion: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  botonBottom: {
    width: 80,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#fb0e0e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    left: 150
  },
  paymentButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#fb0e0e',
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
  },
  paymentButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedPaymentMethod: {
    backgroundColor: '#fb0e0e',
  },
  selectedParkingTime: {
    backgroundColor: '#fb0e0e',
  },
});
