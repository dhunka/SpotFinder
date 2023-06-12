import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin,setOrigin,setDestination } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
const SearchBar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const origin = useSelector(selectOrigin);
 

  const navigateToFilterScreen = () => {
    navigation.navigate('SearchBarFilterScreen');
  };

  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        placeholder="Where from?"
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        returnKeyType={'search'}
        enablePoweredByContainer={false}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
  
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterMenu: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    width: 200,
    marginTop: 60,
    marginRight: 10,
    elevation: 5,
  },
});

export default SearchBar;
