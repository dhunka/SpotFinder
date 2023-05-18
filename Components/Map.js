import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectSelectedMarker, setSelectedMarker } from '../slices/navSlice';


const Map = () => {
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const selectedMarker = useSelector(selectSelectedMarker);
  const handleMarkerPress = (marker) => {
    dispatch(setSelectedMarker(marker));
  };

  const MycustomMarkerView = () => {
    return (
      <Image
        style={{
          width: 40,
          height: 40
        }}
        source={require('../assets/park_parking_icon.png')}
      />
    );
  };

  const markersList = [
    {
      id: 1,
      latitude: -33.602514,
      longitude: -70.8763652,
      direccion: 'av bilbao',
      description: "4000",
      precio:300,
      Espacios:1,
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
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
              direccion={marker.direccion}
              description={marker.description}
              precio={marker.precio}
              onPress={() => handleMarkerPress(marker)}
            >
              <MycustomMarkerView />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

export default Map;
