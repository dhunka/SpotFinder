import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text  } from 'react-native';

const carTypes = [
    { type: 'Urbano', icon: '🚗' },
    { type: 'Sedan', icon: '🚘' },
    { type: 'SUV', icon: '🚙' },
    { type: 'Deportivo', icon: '🏎️' },
];

const CustomDropdown = ({ selectedValue, onValueChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleOptionPress = (option) => {
        setIsDropdownOpen(false);
        onValueChange(option);
    };

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5,
                    width: '100%',
                    alignItems: 'center',
                }}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <Text>{selectedValue}</Text>
            </TouchableOpacity>
            {isDropdownOpen && (
                <View
                    style={{
                        position: 'absolute',
                        top: 40,
                        backgroundColor: 'white',
                        width: '100%',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        zIndex: 1,
                    }}
                >
                    {carTypes.map((car, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                padding: 10,
                                alignItems: 'center',
                            }}
                            onPress={() => handleOptionPress(car.type)}
                        >
                            <Text>{car.type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const NewCarScreen = () => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [patente, setPatente] = useState('');
    const [medidas, setMedidas] = useState('');
    const [carType, setCarType] = useState(carTypes[0].type);

    const handleNewCar = () => {
        // Aquí puedes implementar la lógica de registro
        console.log('Marca:', marca);
        console.log('Modelo:', modelo);
        console.log('Color:', color);
        console.log('Patente:', patente);
        console.log('Medidas:', medidas);
        console.log('Car Type:', carType);
    };

    return (
        <View style={{ alignItems:"center", height: '100%', paddingTop: 200}}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>
                Agregar Vehículo
            </Text>
            <Text
                style={{
                    color: 'grey',
                    fontSize: 19,
                    fontWeight: 'bold',
                    marginBottom: 20,
                }}>
                Ingresar datos
            </Text>
            <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
                placeholder="Marca"
                onChangeText={text => setMarca(text)}
                value={marca}
            />
            <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
                placeholder="Modelo"
                onChangeText={text => setModelo(text)}
                value={modelo}
            />
            <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
                placeholder="Color"
                onChangeText={text => setColor(text)}
                value={color}
            />
            <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
                placeholder="Patente"
                onChangeText={text => setPatente(text)}
                value={patente}
            />
            <TextInput style={{borderRadius: 100, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
                placeholder="Medidas"
                onChangeText={text => setMedidas(text)}
                value={medidas}
                secureTextEntry
            />
            <CustomDropdown selectedValue={carType} onValueChange={setCarType} style={{ alignItems: 'center'}}/>
            <View style={{ alignItems: 'center', marginTop: 10, zIndex: 2 }}>
                <Text style={{ fontSize: 24 }}>{carTypes.find(car => car.type === carType)?.icon}</Text>
            </View>
            <TouchableOpacity
                onPress={handleNewCar}
                style={{
                    borderRadius: 100,
                    alignItems: 'center',
                    width: 180,
                    paddingVertical: 5,
                    marginVertical: 10,
                }}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    Agregar
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default NewCarScreen;
