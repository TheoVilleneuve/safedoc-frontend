import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Header from '../components/Header';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

export default function FindDocHomeScreen({ navigation }) {

  //gestion de la couleur au clic des boutons
  const [selected, setSelected] = useState('false');

  // Local States pour les valeurs des 3 Inputs de recherche de Doc
  const [docName, setDocName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const handlePress = () => {
    console.log('click detected');
    setSelected(!selected)
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

          <Header navigation={navigation}/>

          <View style={styles.inputsContainer}>

          <View style={styles.logoContainer}>
            <Text style={styles.h2}>Je recherche :</Text>
          </View>
            {/* ajout des input dans ce cadre */}
          
          {/* INPUT Recherche par médecin */}
          <TextInput
            style={styles.TextInput}
            mode="outlined"
            label="Nom du·de la doc (facultatif)"
            placeholder="Rechercher un.e doc"
            onChangeText={(value) => setDocName(value)}
            value={docName}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
          />

          {/* INPUT Recherche par spécialité */}
          <TextInput
            style={styles.TextInput}
            mode="outlined"
            label="Spécialité"
            placeholder="Rechercher une spécialité"
            onChangeText={(value) => setSpecialty(value)}
            value={specialty}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
          />

            {/* INPUT Recherche par localisation */}
          <TextInput
            style={styles.TextInput}
            mode="outlined"
            label="Recherche par ville"
            placeholder="Recherche par ville"
            onChangeText={(value) => setLocation(value)}
            value={location}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
          />
          <Button 
          style={{ backgroundColor: selected ? "#652CB3" : "#2D0861" }}
          onPress={handlePress}
          mode='elevated'           
          contentStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 320,
            height: 68,
            borderRadius: 20,
          }}
          labelStyle={{
            color: 'white',
            fontFamily: 'Greycliff-Bold',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 19,
            display: 'flex',
            alignItems: 'center',
            letterSpacing: 0.25,
          }}
          >
          Rechercher 
          </Button>

          </View>

      </KeyboardAvoidingView>     
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: '#2D0861',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor:'white',
      },

    logoContainer: {
      width: 320,
    },
    
    logoSafeDoc: {
      objectFit: 'contain',
      width: '85%',
      height: 120,
      },

    h2: {
      color: '#2D0861',
      fontFamily: 'Greycliff-Bold',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: 20,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },

    inputsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: 340,
      marginBottom: '35%',
    },
    
    h3: {
      color: 'white',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },
    TextInput: {
      width: 320,
    },
  });