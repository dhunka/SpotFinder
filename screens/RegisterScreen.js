import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text } from 'react-native';

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Aquí puedes implementar la lógica de registro
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={{ alignItems:"center", height: 700, borderTopLeftRadius: 130, paddingTop: 200}}>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>
            Registrarse
        </Text>
        <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Crear una cuenta nueva
        </Text>
        <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Nombre"
        onChangeText={text => setNombre(text)}
        value={nombre}
        />
        <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
          placeholder="Apellidos"
          onChangeText={text => setApellido(text)}
          value={apellido}
        />
        <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        />
        <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Número"
        onChangeText={text => setNumero(text)}
        value={numero}
        />
        <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Clave"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        />
        <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Confirmar Clave"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleRegister}
            style={{
                borderRadius: 100,
                alignItems: 'center',
                width: 350,
                paddingVertical: 5,
                marginVertical: 10
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                Registrarse
            </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
