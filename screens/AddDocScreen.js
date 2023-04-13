import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'

export default function AddDocScreen({ navigation }) {
// Dispatch pour reducer login
  const dispatch = useDispatch();

// États pour GET les tables de références et mapper 
const [sectorsList, setSectorsList] = useState([]);
const [specialtiesList, setSpecialtiesList] = useState([]);

//USEEFFECT
useEffect(() => {
  //GET la table de référence SECTORS au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/sectors`)
    .then((response) => response.json())
    .then((data) => {
      setSectorsList([...data.sectors]);
      });
  
  //GET la table de référence SPECIALTIES au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/specialties`)
    .then((response) => response.json())
    .then((data) => {
      setSectorsList([...data.specialties]);
      });

  
}, []);

 console.log('sectorsList',sectorsList)
 console.log('specialtiesList',specialtiesList)
 
//Map des sectors
const sectors = sectorsList.map((data, i) => {
  return (
    data.description
    //MAP qui renvoie les element du Picker
    // <Picker.Item style={styles.card} label={data.description} value={data.value} key={data.id}/>
  );
});

//Map des specialties
const specialties = specialtiesList.map((data, i) => {
  return (
    data.value
  );
});

//USEEFFECT Qui GET la table de référence SPECIALTIES au chargement de la page
/* useEffect(() => {
  fetch(`https://safedoc-backend.vercel.app/specialties`)
    .then((response) => response.json())
    .then((data) => {
      setSectorsList(data.sectors);
      console.log('sectorsList',sectorsList)
      });
}, []); */


// Local States pour les valeurs des docs a ajouter
  const [docLastName, setDocLastName] = useState('');
  const [docFirstName, setDocFirstName] = useState('');
  const [docPhoneNbr, setDocPhoneNbr] = useState('');
  const [docAdress, setDocAdress] = useState('');
  //UseState pour le Picker
const [sectorValue, setSectorValue] = useState();

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>

          <TouchableOpacity style={styles.angleLeft} onPress={() => navigation.goBack()}>
            <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} title="Go back" />
          </TouchableOpacity>

            <Text style={styles.h1}>Enregister un.e doc</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {/* INPUT PRENOM */}
              <TextInput
                style={styles.TextInput}
                mode="outlined"
                label="Prénom"
                placeholder="Prénom"
                onChangeText={(value) => setDocFirstName(value)}
                value={docFirstName}
                //test css
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
              />

              {/* INPUT NOM */}
              <TextInput
                style={styles.TextInput}
                mode="outlined"
                label="Nom de famille"
                placeholder="Nom de famille"
                onChangeText={(value) => setDocLastName(value)}
                value={docLastName}
                //test css
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
              />

              {/* INPUT PHONE */}
              <TextInput
                style={styles.TextInput}
                mode="outlined"
                label="Téléphone"
                placeholder="Téléphone"
                onChangeText={(value) => setDocPhoneNbr(value)}
                value={docPhoneNbr}
                //test css
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
              />

              {/* INPUT ADRESS */}
              <TextInput
                style={styles.TextInput}
                mode="outlined"
                label="Adresse"
                placeholder="Entrez l'adresse"
                onChangeText={(value) => setDocAdress(value)}
                value={docAdress}
                //test css
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
              />

              {/* <Picker
                selectedValue={sectorValue}
                onValueChange={(value) => setSectorValue(value)}
                >
                {sectors}
              </Picker> */}

              <SelectDropdown
                
                data={sectors}
                defaultButtonText="Conventionnement"

                onSelect={(selectedItem, index) => {
                  console.log('test SelectDropdown',selectedItem, index)
                }}
                dropdownTextStyle={{fontSize: 16}}
                renderDropdownItem={(data, index) => (
                  console.log('data is',data),
                  <Text style={{fontSize: 16}}>
                    {data.description}
                  </Text>
                )}
              />

            </ScrollView>           
        </KeyboardAvoidingView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#652CB3',
  },

  keyContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  angleLeft: {
    position: 'absolute',
    left: 30
  },

  h1: {
    marginTop: 50,
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
},

scrollContainer: {
  backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    height: '70%',
    bottom: '6%',
    top: '10%',
},
TextInput: {
  marginBottom: 10,
},

h3:{
  fontFamily: 'Greycliff-Regular',
  fontWeight: 600,
  fontSize: 20,
},

mediumbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
/* Purple */
    backgroundColor: '#652CB3',
    width: 182,
    height: 68,
    borderRadius: 20,
/* Shadow Boutons */
    shadowColor: "#000000",
    shadowOffset: {
    width: 6,
    height: 6,
},
    shadowOpacity:  0.25,
    shadowRadius: 12,
    elevation: 12
},

h3white: {
    color: 'white',
    fontFamily: 'Greycliff-Regular',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
},
});