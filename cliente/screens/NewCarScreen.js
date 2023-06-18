import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Text, Button, Modal } from 'react-native';
import { useState } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Components/config';

export default function App() {
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [patente, setPatente] = useState('');
  const [color, setColor] = useState('');
  const [showCard, setShowCard] = useState(false);

  function create() {
    if (!modelo || !marca || !patente || !color) {
      alert('Ingrese los datos correctamente');
      return;
    }


    addDoc(collection(db, 'autos'), {
      modelo: modelo,
      marca: marca,
      patente: patente,
      color: color,
    })
      .then(() => {
        console.log('datos actualizados');
        alert('Datos registrados con éxito!!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleCard() {
    setShowCard(!showCard);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Vehículo</Text>
      <Text style={styles.subtitle}>Ingresa los datos de tu vehículo aquí</Text>
      <Button onPress={toggleCard} title="Como ingresar datos" />

      <TextInput
        value={modelo}
        onChangeText={(text) => setModelo(text)}
        placeholder="Modelo"
        style={styles.input}
      />
      <TextInput
        value={marca}
        onChangeText={(text) => setMarca(text)}
        placeholder="Marca"
        style={styles.input}
      />

      <TextInput
        value={patente}
        onChangeText={(text) => setPatente(text)}
        placeholder="Patente"
        style={styles.input}
      />

      <TextInput
        value={color}
        onChangeText={(text) => setColor(text)}
        placeholder="Color"
        style={styles.input}
      />

      <Button onPress={create} title="Subir datos" />

      <StatusBar style="auto" />

      <Modal
        visible={showCard}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleCard}
      >
        <View style={styles.modalContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Modelos: SUV/Deportivo/Urbano</Text>
            <Button onPress={toggleCard} title="Cerrar" />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fondo oscuro translúcido
  },
  cardContainer: {
    width: '80%', // Ancho personalizado del modal
    height: 200, // Altura personalizada del modal
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
