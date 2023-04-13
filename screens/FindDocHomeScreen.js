import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDownWideShort, faPen, faTrashCan, faUserDoctor } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header';
import DoctorCard from '../components/DoctorCard';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

export default function FindDocHomeScreen({ navigation }) {

  //gestion de l'etat filtres et apparition resultats docteurs au clic des boutons
  const [selected, setSelected] = useState(false);

  // Local States pour les valeurs des 3 Inputs de recherche de Doc
  const [docName, setDocName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const handlePress = () => {
    console.log('click detected');
    setSelected(true)
    Keyboard.dismiss();
  };

 
    //map sur 
    const doctorList = [{
      "_id": {
        "$oid": "6437d6c351065b06079b8dfe"
      },
      "firstname": "Sophie",
      "lastname": "Lefebvre",
      "email": "sophie.lefebvre@gmail.com",
      "phone": "+33 6 45 67 89 01",
      "address": "19 Rue de la Pompe, 75116 Paris",
      "latitude": 48.865358,
      "longitude": 2.280123,
      "sector": 1,
      "specialties": [
        "Dermatology",
        "Cosmetic Surgery"
      ],
      "languages": [
        "French",
        "English"
      ],
      "tags": [
        "trans-friendly",
        "gay-friendly",
        "accessibilite pmr"
      ],
      "confidentiality": 2
    },{
      "_id": {
        "$oid": "6437d6c351065b06079b8dff"
      },
      "firstname": "Jean",
      "lastname": "Dupont",
      "email": "jean.dupont@gmail.com",
      "phone": "+33 6 78 90 12 34",
      "address": "2 Rue de la Croix, 93120 La Courneuve",
      "latitude": 48.931115,
      "longitude": 2.390466,
      "sector": 3,
      "specialties": [
        "Ophthalmology",
        "Optometry"
      ],
      "languages": [
        "French"
      ],
      "tags": [
        "lesbinne-friendly",
        "accessibilite pmr",
        "gay-friendly"
      ],
      "confidentiality": 1
    },{
      "_id": {
        "$oid": "6437d6c351065b06079b8e00"
      },
      "firstname": "Camille",
      "lastname": "Martin",
      "email": "camille.martin@gmail.com",
      "phone": "+33 6 23 45 67 89",
      "address": "15 Rue de la Convention, 93120 La Courneuve",
      "latitude": 48.931115,
      "longitude": 2.390466,
      "sector": 2,
      "specialties": [
        "Psychiatry",
        "Psychotherapy"
      ],
      "languages": [
        "French",
        "Spanish"
      ],
      "tags": [
        "accessibilite pmr",
        "trans-friendly",
        "lesbienne-friendly"
      ],
      "confidentiality": 3
    },{
      "_id": {
        "$oid": "6437d6c351065b06079b8e01"
      },
      "firstname": "Pierre",
      "lastname": "Leroy",
      "email": "pierre.leroy@gmail.com",
      "phone": "+33 6 12 34 56 78",
      "address": "24 Rue du Faubourg Saint-Honoré, 75008 Paris",
      "latitude": 48.870308,
      "longitude": 2.314382,
      "sector": 1,
      "specialties": [
        "Cardiology",
        "Internal Medicine"
      ],
      "languages": [
        "French",
        "English"
      ],
      "tags": [
        "accessibilite pmr",
        "lesbienne",
        "gay-friendly"
      ],
      "confidentiality": 2
    },{
      "_id": {
        "$oid": "6437d6c351065b06079b8e02"
      },
      "firstname": "Julie",
      "lastname": "Girard",
      "email": "julie.girard@gmail.com",
      "phone": "+33 6 78 90 12 34",
      "address": "3 Rue de la République, 93120 La Courneuve",
      "latitude": 48.931115,
      "longitude": 2.390466,
      "sector": 3,
      "specialties": [
        "Pediatrics",
        "Neonatology"
      ],
      "languages": [
        "French"
      ],
      "tags": [
        "gay-friendly",
        "gay-friendly",
        "trans-friendly"
      ],
      "confidentiality": 1
    },{
      "_id": {
        "$oid": "6437d6c351065b06079b8e03"
      },
      "firstname": "Marie",
      "lastname": "Dufour",
      "email": "marie.dufour@gmail.com",
      "phone": "+33 6 23 45 67 89",
      "address": "25 Rue de Vaugirard, 75006 Paris",
      "latitude": 48.848069,
      "longitude": 2.329768,
      "sector": 2,
      "specialties": [
        "Gynecology",
        "Obstetrics"
      ],
      "languages": [
        "French",
        "English"
      ],
      "tags": [
        "lisbienne-friendly",
        "gay-friendly",
        "accessibilite pmr"
      ],
      "confidentiality": 3
    }]

    const doctors = doctorList.map((data, i) => {
      return (
          <DoctorCard key={i} lastname={data.lastname} firstname={data.firstname} specialties={data.specialties} address={data.address}/>
      );
    });

     // Faire apparaitre resultats docs et boutons filtre
  let docResults;
  let filter;

  if(selected){
    // Il faudra rajouter un if si pas de result qui dit que docResults = <ScrollView style={styles.scrollDoc}<Text>Nous sommes désolés. Aucun résultat ne correspond à votre recherche</Text></ScrollView>
    docResults =  
    // <View style={styles.scrollDoc}>
    //   <Text style={styles.noResultText}>Nous sommes désolés. Aucun résultat ne correspond à votre recherche
    //   </Text>
    // </View>
    // docResults =  
    <ScrollView style={styles.scrollDoc}>
          {doctors}
    </ScrollView>;

    filter = 
    <TouchableOpacity style={styles.filter}>
    <Text style={styles.textFilter}>trier par filtres</Text>
    <FontAwesomeIcon  icon={ faArrowDownWideShort } size={20} color={'black'}  />
    </TouchableOpacity>
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

          <Header navigation={navigation}/>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Doctor')} style={styles.doctorTest}><Text>Aller Page Doctor</Text></TouchableOpacity> */}
          <View style={styles.inputsContainer}>

          <View style={styles.logoContainer}>
            <Text style={styles.h2}>Je recherche :</Text>
          </View>
            {/* ajout des input dans ce cadre */}
          
          {/* INPUT Recherche par médecin*/}
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

          {/*INPUT Recherche par spécialité*/}
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
          <View style={styles.filterContainer}>
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
           {/* Apparition tri par filtres conditionné au clic sur rechercher */}
          {filter}
          </View>

          {/* Creation Scrollview resultats medecins avec composants conditionné au clic sur rechercher */}
          {docResults}


          <TouchableOpacity
            style={styles.largeBtn}
            title="Add a doc"
            onPress={handlePress}
            >
            <Text style={styles.h3}>Rechercher</Text>
          </TouchableOpacity>

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
      justifyContent: 'space-between',
      height: '80%',
      width: '90%',
      alignItems: 'center',
      marginBottom: '10%',
    },
    
    h3: {
      color: 'white',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },
    TextInput: {
      width: 320,
      marginBottom: 20
    },

    largeBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      /* Purple */
      backgroundColor: '#652CB3',
      width: 320,
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

    scrollDoc:{
      width: '95%',
      marginBottom: 15,
      display: 'flex',
    },

    filterContainer: {
      display: 'flex',
      // alignItems: 'flex-end'
    },

    filter: {
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'flex-end'
    },

    textFilter: {
      color: 'black',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
      marginRight: 10,
      marginBottom: 15
    },

    noResultText: {
      fontFamily: 'Greycliff-Bold',
      fontSize: 16,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  // onPress={handlePress}
