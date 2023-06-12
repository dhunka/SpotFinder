import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { CardField, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { STRIPE_APIKEY } from '@env';

const PaymentScreen = () => {
  const [card, setCard] = useState(null);
  const [costo, setCosto] = useState(0);
  const navigation = useNavigation();
  const { confirmPayment } = useStripe();

  const parkingTime = useSelector(state => state.nav.selectedParkingTime);

  useEffect(() => {
    let nuevoCosto = 0;
    switch (parkingTime) {
      case '30min':
        nuevoCosto = 5;
        break;
      case '1hr':
        nuevoCosto = 10;
        break;
      case '2hr':
        nuevoCosto = 8;
        break;
      default:
        console.log('Error: Categoría de tiempo no válida');
        break;
    }
    setCosto(nuevoCosto);
  }, [parkingTime]);

  const handlePayment = async () => {
    try {
      const { paymentMethod, error } = await confirmPayment({
        type: 'Card',
        card: {
          number: card.cardNumber,
          cvc: card.cvc,
          expMonth: card.expirationMonth,
          expYear: card.expirationYear,
        },
      });
      
      

      if (error) {
        console.log('Error processing payment:', error.message);
      } else {
        console.log('Payment successful:', paymentMethod);
        // Aquí puedes realizar las acciones necesarias después de que el pago se haya procesado correctamente
        // Por ejemplo, puedes llamar a una API de backend para guardar la transacción en tu base de datos
        // y actualizar el estado de la reserva del estacionamiento.

        // Aquí hay un ejemplo de cómo podrías navegar a otra pantalla después del pago exitoso:
        navigation.navigate('PaymentSuccessfulScreen');
      }
    } catch (e) {
      console.log('Error processing payment:', e.message);
    }
  };

  return (
    <StripeProvider publishableKey={STRIPE_APIKEY}>
      <View style={styles.container}>
        <Text style={styles.title}>Realizar Pago</Text>
        <Text style={styles.amount}>Monto a Pagar: ${costo}</Text>
        <View style={styles.cardContainer}>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={styles.cardField}
            onCardChange={(cardDetails) => {
              setCard(cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log('focusField', focusedField);
            }}
          />
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    marginBottom: 20,
  },
  cardContainer: {
    width: '80%',
    marginBottom: 20,
  },
  cardField: {
    height: 50,
  },
  payButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
