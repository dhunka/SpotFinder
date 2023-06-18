import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Components/config';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dimensionesAncho, setDimensionesAncho] = useState('');
  const [dimensionesLargo, setDimensionesLargo] = useState('');
  const [tarifa, setTarifa] = useState('');
  const [numVehiculos, setNumVehiculos] = useState('');

  function create() {
    if (
      !nombre ||
      !direccion ||
      !telefono ||
      !dimensionesAncho ||
      !dimensionesLargo ||
      !tarifa ||
      !numVehiculos
    ) {
      alert('Ingrese los datos correctamente');
      return;
    }

    const camposDisponibles = crearCamposDisponibles();

    addDoc(collection(db, 'estacionamiento'), {
      nombre: nombre,
      direccion: direccion,
      latitude: latitude,
      longitude: longitude,
      telefono: telefono,
      dimensiones: {
        ancho: dimensionesAncho,
        largo: dimensionesLargo,
      },
      tarifa: tarifa,
      campos: camposDisponibles,
    })
      .then(() => {
        console.log('datos subidos');
        alert('Datos registrados con éxito!!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function crearCamposDisponibles() {
    const camposDisponibles = {};
    for (let i = 1; i <= parseInt(numVehiculos); i++) {
      camposDisponibles[`espacio${i}`] = true;
    }
    return camposDisponibles;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Estacionamiento</Text>

      <View style={styles.direccionContainer}>
      <GooglePlacesAutocomplete
          placeholder="Dirección"
          onPress={(data, details = null) => {
            setDireccion(data.description);
            setLatitude(details.geometry.location.lat);
            setLongitude(details.geometry.location.lng);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'es',
          }}
          fetchDetails={true}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.input,
        }}
        />
      </View>


      <TextInput
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        placeholder="Nombre del estacionamiento"
        style={styles.input}
      />

      <TextInput
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
        placeholder="Teléfono"
        style={styles.input}
      />

      <View style={styles.dimensionesContainer}>
        <TextInput
          value={dimensionesAncho}
          onChangeText={(text) => setDimensionesAncho(text)}
          placeholder="Ancho (metros)"
          style={[styles.input, styles.dimensionesInput]}
        />

        <TextInput
          value={dimensionesLargo}
          onChangeText={(text) => setDimensionesLargo(text)}
          placeholder="Largo (metros)"
          style={[styles.input, styles.dimensionesInput]}
        />
      </View>

      <TextInput
        value={tarifa}
        onChangeText={(text) => setTarifa(text)}
        placeholder="Tarifa"
        style={[styles.input, styles.input]}
      />

      <TextInput
        value={numVehiculos}
        onChangeText={(text) => setNumVehiculos(text)}
        placeholder="Número de vehículos"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button onPress={create} title="Guardar" />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a214c',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    marginVertical: 4,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  dimensionesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionesInput: {
    flex: 1,
    marginHorizontal: 3,
  },
  direccionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  autocompleteContainer: {
    position: 'relative',
    width: '100%',
  },
});
