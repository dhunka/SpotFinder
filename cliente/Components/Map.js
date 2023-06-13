import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import { selectOrigin, selectSelectedMarker, setSelectedMarker } from '../slices/navSlice';
import { useNavigation } from 'expo-router';
import SelectParkingScreen from '../screens/SelectParkingScreen';
import SearchBar from './SearchBar';


const Map = () => {
  const navigation= useNavigation();
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const selectedMarker = useSelector(selectSelectedMarker);
  const [isFloatingBarVisible, setIsFloatingBarVisible] = useState(false);
  const [markersList, setMarkersList] = useState([
    {
      id: 1,
      img:require('../assets/Estacionamiento.png'),
      latitude: -33.602514,
      longitude: -70.8763652,
      direccion: 'doce de Septiembre',
      description: '$500',
      precio: '300',
      rating:'4',
      spots:'5',
    },
    {
      id: 1,
      img:require('../assets/Estacionamiento.png'),
      latitude: -33.545666, 
      longitude: -70.654401,
      direccion: 'casa diegomon',
      description: '$500',
      precio: '300',
      rating:'4',
      spots:'5',
    },
    {
      id: 1,
      img:require('../assets/Estacionamiento.png'),
      latitude: -33.493553,
      longitude: -70.682161,
      direccion: 'casa diegomon',
      description: '$500',
      precio: '300',
      rating:'4',
      spots:'5',
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
      <TouchableOpacity 
      onPress={() => navigation.navigate('SelectParkingScreen')}
        style={styles.floatingBar}>
 
            <View style={{marginLeft:7}}>
              <Image
                style={{
                  
                  borderRadius:15,
                  width: 100,
                    height: 100,
                }}
                source={selectedMarker.img } 
                />
             </View>
            <View style={{
              marginLeft:10,
              justifyContent:'center',
              flexDirection:'column',
          
          }}>
              <View>
                <Text>FranciscoBilbao</Text>
              </View>
              <View>
                <Text>150 spots</Text>
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
      <View style={{  marginTop:50}}>
        <SearchBar/>
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
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    width: 300,
    marginBottom: 12,
    marginLeft: 50,
    height: 120,
   
    flexDirection:'row',
    alignItems:'center'
   
  },
  imagen:{
    borderRadius:15
  },

});



