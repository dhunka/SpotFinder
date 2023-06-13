import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text  } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';

const FormScreen = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [capacity, setCapacity] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [owner, setOwner] = useState('');
  const [rentalRate, setRentalRate] = useState('');

  const handleSave = () => {
    // Generar un ID único para el estacionamiento
    const parkingId = generateParkingId();

    const parkingData = {
      id: parkingId,
      address,
      latitude,
      longitude,
      capacity,
      dimensions,
      owner,
      rentalRate,
    };

    // Imprimir los datos en la consola para verificar
    console.log(parkingData);

    // Limpiar los campos del formulario después de guardar
    setAddress('');
    setLatitude('');
    setLongitude('');
    setCapacity('');
    setDimensions('');
    setOwner('');
    setRentalRate('');
  };

  const generateParkingId = () => {
    // Generar un ID único utilizando la fecha actual
    const timestamp = Date.now();
    return `PARKING_${timestamp}`;
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.row}>
        <GooglePlacesAutocomplete
          placeholder="Dirección"
          onPress={(data, details = null) => {
            setAddress(data.description);
            setLatitude(details.geometry.location.lat);
            setLongitude(details.geometry.location.lng);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'es',
          }}
          fetchDetails={true}
          styles={{
            textInput: styles.input,
          }}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Cantidad de vehículos que caben"
          value={capacity}
          onChangeText={text => setCapacity(text)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Medidas del estacionamiento"
          value={dimensions}
          onChangeText={text => setDimensions(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Dueño del estacionamiento"
          value={owner}
          onChangeText={text => setOwner(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Valor de la tarifa de arriendo"
          value={rentalRate}
          onChangeText={text => setRentalRate(text)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormScreen;
