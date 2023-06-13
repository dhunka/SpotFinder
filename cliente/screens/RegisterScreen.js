import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userData = {
        nombre,
        apellido,
        numero,
        email,
        password
      };
      const response = await axios.post('http://localhost:8080/create', userData);
      console.log('Registro exitoso:', response.data);
      // Realizar acciones adicionales después del registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      // Manejar el error de registro
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>Crear una cuenta nueva</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={(text) => setNombre(text)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        onChangeText={(text) => setApellido(text)}
        value={apellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        onChangeText={(text) => setNumero(text)}
        value={numero}
      />
      <TextInput
        style={styles.input}
        placeholder="Clave"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
    color: 'blue',
    alignItems: 'center',
    width: 350,
    paddingVertical: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 25,
    color: 'blue',
  }
});
