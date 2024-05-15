import React from 'react';
import renderer from 'react-test-renderer';
import NavOptions from '../Components/NavOptions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MockNavigation = ({ component }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={component} />
        <Stack.Screen name="MapScreen" component={() => null} />
        <Stack.Screen name="ParkingListScreen" component={() => null} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('NavOptions', () => {
  it('renderiza correctamente', () => {
    const tree = renderer.create(<MockNavigation component={NavOptions} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renderiza la lista de opciones correctamente', () => {
    const tree = renderer.create(<MockNavigation component={NavOptions} />).toJSON();
    expect(tree.children).toHaveLength(1);

    const flatList = tree.children[0];
    expect(flatList.type).toBe('RCTFlatList');
    expect(flatList.children).toHaveLength(2);

    const option1 = flatList.children[0];
    expect(option1.children[0].children[0].children[0].type).toBe('Image');
    expect(option1.children[0].children[0].children[1].children[0]).toBe('Buscar Estacionamiento');

    const option2 = flatList.children[1];
    expect(option2.children[0].children[0].children[0].type).toBe('Image');
    expect(option2.children[0].children[0].children[1].children[0]).toBe('Mis Estacionamientos');
  });
});