import { StyleSheet, Text, View ,Image,TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SelectParkingScreen = () => {
    const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image}  source={require('../assets/Estacionamiento.png')}/>
      </View>
      
      <View style={styles.categorias}>
           <View>
            <Text style={styles.text}>Avenida Francisco Bilbao 511</Text>
           </View>
          <View>
            <Text style={styles.text}>Tiempo</Text>
            <View style={styles.botonesCalificacion}>
              <View style={styles.botonCalifica}>
                  <TouchableOpacity style={styles.botonContent}>
                        <View>
                          <Text>
                            30 min
                          </Text>
                        </View>
                        <View>
                            <Text>
                              $5
                            </Text>
                          </View>
                    </TouchableOpacity>
                </View>
              <View style={styles.botonCalifica}>
                <TouchableOpacity style={styles.botonContent}>
                      <View>
                        <Text>
                          1 hora
                        </Text>
                      </View>
                      <View>
                          <Text>
                            $10
                          </Text>
                        </View>
                  </TouchableOpacity>
              </View>  
              <View style={styles.botonCalifica}>
                  <TouchableOpacity style={styles.botonContent}>
                        <View>
                          <Text>
                            2 horas
                          </Text>
                        </View>
                        <View>
                            <Text>
                              $8
                            </Text>
                          </View>
                    </TouchableOpacity>
                </View>
              <View style={styles.botonCalifica}>
                <TouchableOpacity style={styles.botonContent}>
                      <View>
                        <Text>
                          30 min
                        </Text>
                      </View>
                      <View>
                          <Text>
                            $5
                          </Text>
                        </View>
                  </TouchableOpacity>
              </View>
            </View>
          <View>
            <Text style={styles.text}>Pagos</Text>
            
            </View>
          </View>
          <View>
             <Text style={styles.text}>Comentarios</Text>
          </View>
          <TouchableOpacity style={ styles.botonBottom}>
            <Text style={styles.text}>Reservar</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default SelectParkingScreen
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categorias: {
    flex: 2,
    flexDirection:'column',
    backgroundColor: 'black',
    height: windowHeight * 2 / 3,
  },
  text:{
    fontWeight:'bold',
    fontSize:17
  },
  botonCalifica:{
    width:60,
    height:40,
    backgroundColor: 'white',
    borderColor:'#fb0e0e',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    borderWidth: 2
   },
   botonContent:{
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'column'

   },
   botonesCalificacion:{
    marginTop:10,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  botonBottom:{
    width:80,
    height:40,
    backgroundColor: 'white',
    borderColor:'#fb0e0e',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    borderWidth: 2,
    position:'absolute',
    bottom:20,
    left:150

   },
 
})