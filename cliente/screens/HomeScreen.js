  import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
  import React from 'react';
  import tw from 'tailwind-react-native-classnames';
  import NavOptions from '../Components/NavOptions';
  import { useDispatch } from 'react-redux';
  import SearchBar from '../Components/SearchBar';
  

  const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>SpotFinder</Text>
          <SearchBar />
        </View>
        <View style={styles.body}>
          <NavOptions />
        </View>
      </SafeAreaView>
    );
  };

  export default HomeScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    header: {
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
    },
  });
