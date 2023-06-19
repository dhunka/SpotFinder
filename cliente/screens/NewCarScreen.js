import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { IP } from '@env';

const RegisterScreen = () => {
  const [Modelo, setModelo] = useState('');
  const [Marca, setMarca] = useState('');
  const [Patente, setPatente] = useState('');
  const [Color, setColor] = useState('');
  

  const handleRegister = async () => {
    try {
      const userData = {
        Modelo,
        Marca,
        Patente,
        Color
      };
      const url = `${IP}/create/autos`;
      const response = await axios.post(url, userData);
      console.log('Registro exitoso:', response.data);
      // Realizar acciones adicionales después del registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      // Manejar el error de registro
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Vehículo </Text>
      <Text style={styles.subtitle}>Ingresa los datos de tu vehículo aquí</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        onChangeText={(text) => setModelo(text)}
        value={Modelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        onChangeText={(text) => setMarca(text)}
        value={Marca}
      />
      <TextInput
        style={styles.input}
        placeholder="Patente"
        onChangeText={(text) => setPatente(text)}
        value={Patente}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        onChangeText={(text) => setColor(text)}
        value={Color}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000', // Fondo negro
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff', // Texto en blanco
    marginBottom: 20,
  },
  subtitle: {
    color: 'grey',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginVertical: 4,
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    borderRadius: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    width: 350,
    paddingVertical: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
  }
});

export default RegisterScreen;
