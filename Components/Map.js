import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import { selectOrigin, selectSelectedMarker, setSelectedMarker } from '../slices/navSlice';


const Map = () => {
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const selectedMarker = useSelector(selectSelectedMarker);
  const [isFloatingBarVisible, setIsFloatingBarVisible] = useState(false);
  const [markersList, setMarkersList] = useState([
    {
      id: 1,
      latitude: -33.602514,
      longitude: -70.8763652,
      direccion: 'doce de Septiembre',
      description: '$500',
      precio: '300',
    },
    {
      id: 2,
      latitude: -33.514899,
      longitude:  -70.718035,
      direccion: 'Dirección 2',
      description: 'Descripción 1',
      precio: '4000',
    },
    // Resto de los marcadores
  ]);

  const handleMarkerPress = (marker) => {
    dispatch(setSelectedMarker(marker));
    setIsFloatingBarVisible(true);
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

    return (
      <View style={styles.floatingBar}>
        <Text style={tw`text-lg `}>{selectedMarker.title}</Text>
        <Text style={tw`text-sm `}>{selectedMarker.description}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
    <MapView
      style={{ flex: 1, position: 'relative' }}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {markersList.map((marker) => {
        return (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.direccion}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
          >
            <MycustomMarkerView />
          </Marker>
        );
      })}
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
    flexirection:'row',
    backgroundColor:'white',
    corderRadius: 6,
    padding: 24,
    marginHorizontal: 24,
    width: 200,
  },
});




