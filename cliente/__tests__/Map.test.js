import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Map from '../Components/Map';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

describe('Map Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      nav: {
        origin: { location: { lat: 0, lng: 0 } },
        selectedMarker: null,
      },
    });

    useNavigation.mockReturnValue({ navigate: mockNavigate });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: '1',
              latitude: 37.78825,
              longitude: -122.4324,
              nombre: 'Parking 1',
              description: 'Description 1',
              espacios: { 1: true, 2: false },
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch markers and display them on the map', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`${process.env.IP}/estacionamientos`);
    });

    expect(getByTestId('marker-0')).toBeTruthy();
  });

  it('should display floating bar when a marker is pressed', async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
  
    await waitFor(() => {
      expect(getByTestId('marker-0')).toBeTruthy();
    });
  
    const marker = getByTestId('marker-0');
    fireEvent.press(marker);
  
    await waitFor(() => {
      expect(queryByText('Parking 1')).toBeTruthy();
      expect(queryByText('1/2 spots')).toBeTruthy();
    });
  });
});