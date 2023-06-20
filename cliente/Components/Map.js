import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Asegúrate de tener instalada la dependencia axios
import { selectOrigin, selectSelectedMarker, setSelectedMarker } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './SearchBar';
import { IP } from '@env';
// Importaciones omitidas por brevedad

const Map = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const selectedMarker = useSelector(selectSelectedMarker);
  const [isFloatingBarVisible, setIsFloatingBarVisible] = useState(false);
  const [markersList, setMarkersList] = useState([]);
  
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get('http://192.168.1.2:8080/estacionamientos');
        setMarkersList(response.data);
      } catch (error) {
        console.error('Error al obtener los marcadores:', error);
      }
    };

    fetchMarkers();
  }, []);

  const handleMarkerPress = (marker) => {
    dispatch(setSelectedMarker(marker));
    setIsFloatingBarVisible(true);
  };

  const handleFloatingBarPress = () => {
    navigation.navigate('SelectParkingScreen', { marker: selectedMarker });
  };
  
 
  const MycustomMarkerView = () => {
    return (
      <Image
        style={{
          width: 40,
          height: 40,
        }}
        source={require('../assets/park_parking_icon.png')}
      />
    );
  };

  const renderFloatingBar = () => {
    if (!isFloatingBarVisible) {
      return null;
    }
  
    const campos = selectedMarker.campos;
    const totalSpots = Object.keys(campos).length;
    const numTrueSpots = Object.values(campos).filter(value => value === true).length;
  
    return (
      <TouchableOpacity
        onPress={handleFloatingBarPress}
        style={styles.floatingBar}
      >
        <View style={{ marginLeft: 7 }}>
          <Image
            style={{
              borderRadius: 15,
              width: 100,
              height: 100,
            }}
            source={selectedMarker.img}
          />
        </View>
        <View
          style={{
            marginLeft: 10,
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <View>
            <Text>{selectedMarker.direccion}</Text>
          </View>
          <View>
            <Text>{numTrueSpots}/{totalSpots} spots</Text>
          </View>
          <View>
            <Text>0.5 km</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 50 }}>
        <SearchBar />
      </View>
      <MapView
        style={{ flex: 1, position: 'relative' }}
        initialRegion={{
          latitude: origin?.location?.lat || 0,
          longitude: origin?.location?.lng || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
         {markersList.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.direccion}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
          >
            <MycustomMarkerView />
          </Marker>
        ))}
      </MapView>
      <View style={{ position: 'absolute', bottom: 0 }}>
        {renderFloatingBar()}
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  floatingBar: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    width: 300,
    marginBottom: 12,
    marginLeft: 50,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagen: {
    borderRadius: 15,
  },
});

