import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectSelectedMarker, setSelectedMarker } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { IP } from '@env';
import axios from 'axios';

const Map = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin) || {};
  const dispatch = useDispatch();
  const selectedMarker = useSelector(selectSelectedMarker)||{};
  const [isFloatingBarVisible, setIsFloatingBarVisible] = useState(false);
  const [markersList, setMarkersList] = useState([]);



  const fetchMarkers = async () => {
    try {
      const response = await axios.get(`${IP}/estacionamientos`);
      const data = response.data;
      setMarkersList(data);
    } catch (error) {
      console.error('Error al obtener los marcadores:', error);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  useEffect(() => {
    console.log('selectedMarker updated:', selectedMarker);
    console.log('isFloatingBarVisible updated:', isFloatingBarVisible);
  }, [selectedMarker, isFloatingBarVisible]);

  const handleMarkerPress = (marker) => {
    dispatch(setSelectedMarker(marker));
    setIsFloatingBarVisible(true);
    console.log('Marker pressed:', marker);
    console.log('isFloatingBarVisible:', true);
  };

  const handleFloatingBarPress = () => {
    navigation.navigate('SelectParkingScreen', { marker: selectedMarker });
  };

  const renderFloatingBar = () => {
    console.log('renderFloatingBar called');
    if (!isFloatingBarVisible || !selectedMarker) {
      console.log('renderFloatingBar returning null');
      return null;
    }

    console.log('renderFloatingBar rendering floating bar');
    const espacios = selectedMarker.espacios || {};
    const totalSpots = Object.keys(espacios).length;
    const numTrueSpots = Object.values(espacios).filter(value => value === true).length;
    const occupancyRatio = totalSpots ? numTrueSpots / totalSpots : 0;
    let textColor = 'green';

    if (occupancyRatio < 0.5) {
      textColor = 'yellow';
    }

    return (
      <TouchableOpacity
        onPress={handleFloatingBarPress}
        style={styles.floatingBar}
        testID="floating-bar"
      >
        <View style={{ marginLeft: 7 }} />
        <View
          style={{
            marginLeft: 10,
            justifyContent: 'center',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <View>
            <Text numberOfLines={1} style={styles.addressText}>{selectedMarker.direccion}</Text>
          </View>
          <View>
            <Text style={[styles.spotsText, { color: textColor }]}>
              {numTrueSpots}/{totalSpots} spots
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredMarkers = markersList.filter(marker => {
    const espacios = marker.espacios;
    const hasTrueSpots = Object.values(espacios).some(value => value === true);
    return hasTrueSpots;
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 50 }}>
        {/* ... */}
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
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index.toString()}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.nombre}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
            testID={`marker-${index}`}
          >
            <MarkerImage />
          </Marker>
        ))}
      </MapView>
      <View style={{ position: 'absolute', bottom: 0 }}>
        {renderFloatingBar()}
      </View>
    </View>
  );
};

const MarkerImage = () => {
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

export default Map;

const styles = StyleSheet.create({
  floatingBar: {
    backgroundColor: '#2a475e',
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
  spotsText: {},
});
