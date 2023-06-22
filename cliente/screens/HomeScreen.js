import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import SearchBar from '../Components/SearchBar';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SpotFinder</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <SearchBar />
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewCarScreen')}
          style={[styles.button, { backgroundColor: '#66c0f4' }]}
        >
          <View>
            <Image
              style={styles.buttonImage}
              source={{ uri: 'https://links.papareact.com/3pn' }}
            />
            <Text style={styles.buttonText}>Autos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FormScreen')}
          style={[styles.button, { backgroundColor: '#66c0f4' }]}
        >
          <View>
            <Image
              style={styles.buttonImage}
              source={{ uri: 'https://links.papareact.com/3pn' }}
            />
            <Text style={styles.buttonText}>Mis Estacionamientos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ParkingListScreen')}
          style={[styles.button2, { backgroundColor: '#66c0f4' }]}
        >
          <View>
            <Image
              style={styles.buttonImage}
              source={{ uri: 'https://links.papareact.com/3pn' }}
            />
            <Text style={styles.buttonText}>Estacionamiento</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={[styles.bottomBarButton, { backgroundColor: '#2a475e' }]}
        >
          <Text style={styles.bottomBarButtonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={[styles.bottomBarButton, { backgroundColor: '#2a475e' }]}
        >
          <Text style={styles.bottomBarButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    marginTop:30,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  body: {
    flex: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  button2: {
    width: 340,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  buttonImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  buttonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#2a475e',
  },
  bottomBarButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a475e',
  },
  bottomBarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#171a21',
  },
});
