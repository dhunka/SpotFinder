import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { useState } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Components/config';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function create() {
    if (!nombre || !apellido || !numero || !email || !password) {
      alert('Ingrese los datos correctamente');
      return;
    }

    addDoc(collection(db, 'usuario'), {
      nombre: nombre,
      apellido: apellido,
      email: email,
      numero: numero,
      password: password,
    })
      .then(() => {
        console.log('datos subidos');
        alert('Datos registrados con éxito!!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>Crear una cuenta nueva</Text>


      

      <TextInput
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        placeholder="Nombre"
        style={styles.input}
      />

      <TextInput
        value={apellido}
        onChangeText={(text) => setApellido(text)}
        placeholder="Apellido"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        style={styles.input}
      />

      <TextInput
        value={numero}
        onChangeText={(text) => setNumero(text)}
        placeholder="Telefono"
        style={styles.input}
      />

      <TextInput
        style={styles.input}
        placeholder="Clave"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <Button onPress={create} title="Subir datos" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a214c', // Fondo negro
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
