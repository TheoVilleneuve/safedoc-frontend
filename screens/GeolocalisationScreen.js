import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView } from 'react-native';

// IMPORTS LIES AU COMPOSANT MAP ET GEOLOC
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import {Dimensions} from 'react-native'
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



export default function GeolocalisationScreen({ navigation }) {
  const dispatch = useDispatch();
  const docplaces = useSelector((state) => state.docplaces.value);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);

// UseEffect pour geolocalisation
useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
 
    if (status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 },
        (location) => {
          setCurrentPosition(location.coords);
        });
    }
  })();
 }, []);

console.log('current is', currentPosition);

// Markers // MAPPER SUR LES DOCS RESULTS
// const markers = docplaces.map((doc, i) => {
//   console.log(docplaces);
//    return <Marker key={i} coordinate={{ latitude: doc.latitude, longitude: doc.longitude }} title={`${doc.lastname}, ${doc.firstname}`} description={`${doc.specialties}, ${doc.address}`} pinColor="#652CB3" />;
// });

const markers = docplaces.map((doc, i) => {
 
  console.log(docplaces);
   return (
     <Marker 
       key={i} 
       coordinate={{ latitude: doc.latitude, longitude: doc.longitude }} 
       title={`${doc.lastname}, ${doc.firstname}`} 
       description={`${doc.specialties}, ${doc.address}`}
       pinColor="#652CB3"
     >
      <Callout style={styles.callout}>
        <View>
          <Text style={styles.calloutTitle}>{`${doc.lastname}, ${doc.firstname}`}</Text>
          <Text style={styles.calloutDescription}>{`Spécialité(s): ${doc.specialties}`}</Text>
          <Text style={styles.calloutDescription}>{`Adresse: ${doc.address}`}</Text>
          <TouchableOpacity style={styles.btnDoc} onPress={()=>navigation.navigate('Doctor', {...doc})}>
          <Text style={styles.h5}>Aller sur sa page</Text>
          </TouchableOpacity>
        </View>
      </Callout>
     </Marker>
   );
});

    return (
        <SafeAreaView style={styles.container}>

          <Header navigation={navigation}/>

          <MapView
            initialRegion={{
            // Coordonnées de Paris
            // latitude: 48.866667,
            // longitude: 2.333333,
            latitude: currentPosition?.latitude || 48.866667,
            longitude: currentPosition?.longitude || 2.333333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            {currentPosition && <Marker coordinate={currentPosition} title="Ma Position" pinColor="#2D0861" />}
            {markers}
          </MapView>
        </SafeAreaView>
      );

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2D0861',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    map: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  },

    callout: {
    width: 200,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 10
  },

  h5: {
    color: 'white',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
  },

  btnDoc: {
    backgroundColor: '#652CB3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '65%', 
    alignSelf: 'center',
    padding: 2
  }
  });