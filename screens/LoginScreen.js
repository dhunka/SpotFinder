import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={{ alignItems:"center", height: 700, borderTopLeftRadius: 130, paddingTop: 200}}>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>
            Bienvenido de nuevo
        </Text>
        <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Inicie su sesión
        </Text>
      <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholder="Clave"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleLogin}
            style={{
                borderRadius: 100,
                alignItems: 'center',
                width: 350,
                paddingVertical: 5,
                marginVertical: 10
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                Ingresar
            </Text>
    </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
