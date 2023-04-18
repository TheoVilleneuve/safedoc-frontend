import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Keyboard, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDownWideShort, faMap, faMapPin, faPen, faTrashCan, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../components/Header';
import DoctorCard from '../components/DoctorCard';
import DoctorCardTags from '../components/DoctorCardTags';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

// Import pour reducer doctor
import { useDispatch, useSelector } from 'react-redux';
import {addDocToReducer } from '../reducers/doctor'

// Import pour reducer docplaces pour geoloc
import { addDocPlacesToReducer, deleteDocPlacesFromReducer } from '../reducers/docplaces'

export default function FindDocHomeScreen({ navigation }) {
    // UseSelector pour recuperer user reducer
    const user = useSelector((state) => state.user.value);
    
  // Dispatch pour reducer doctor
  const dispatch = useDispatch();
  // Ajouter dispatch quand clique sur fiche // Verifier qu'il ne faut pas ajouter .doctors (data.doctors._id)

  // UseSelector pour recuperer user reducer
  const doctor = useSelector((state) => state.doctor.value);

  // locat state pour recuperer liste doctor
  const [doctorsList, setdoctorsList] = useState([]);

  //gestion de l'etat filtres et apparition resultats docteurs au clic des boutons
  const [selected, setSelected] = useState(false);

    //gestion de l'etat si pas de resultats docteurs au clic des boutons
  const [noResult, setNoResult] = useState(false);

  //gestion de l'etat si pas resultats limitées au clic des boutons
  const [limitedResult, setLimitedResult] = useState(false);

  // Local States pour les valeurs des 3 Inputs de recherche de Doc
  const [docName, setDocName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialtyToDisplay, setSpecialtyToDisplay] = useState('');
  const [location, setLocation] = useState('');

  // Faire apparaitre resultats docs et boutons filtre
  let docResults;
  let filter;
  let map
  let textLimitedResults

  // État pour GET la table de référence SPECIALTIES et mapper 
const [specialtiesList, setSpecialtiesList] = useState([]);

  //USEEFFECT pour récuperer la table de référence des spécialités
useEffect(() => {
  //GET la table de référence SPECIALTIES au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/specialties`)
    .then((response) => response.json())
    .then((data) => {
      setSpecialtiesList([...data.specialties]);
      });
}, []);
  //Map des SPECIALTIES
const specialties = specialtiesList.map((data, i) => {
  return (
    { label: data.value, value: i }
  );
});
  //DROPDOWN////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);

//Fonction style des Dropdown
    const renderLabelSector = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#652CB3' }]}>
            Spécialité
          </Text>
        );
      }
      return null;
    };

  const handlePress = () => {
    console.log('click detected');
    Keyboard.dismiss();
    setDocName('')
    setSpecialty('')
    setLocation('')
    // Ajouter route Recherche docteur
    fetch(`https://safedoc-backend.vercel.app/doctors/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lastname: docName, specialties: specialty }),
    }).then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // User token
          if(user.token){
            // Si user a un token, il peut voir tous les docs (data.doctors)
            dispatch(deleteDocPlacesFromReducer())
            console.log('data result', data.doctors)
            dispatch(addDocPlacesToReducer( data.doctors ));
            setdoctorsList(data.doctors)
            setSelected(true)
            setNoResult(false)
          } else {
            // Filter pour que les user non loggués ne voient que les docs à confidentiality level 0
            const doctorsNoFiltered = data.doctors
            const filteredDocByConfitiendality = doctorsNoFiltered.filter(doctorsNoFiltered => doctorsNoFiltered.confidentiality.value < 1);
            console.log('filtered docs', filteredDocByConfitiendality)
            dispatch(deleteDocPlacesFromReducer())
            dispatch(addDocPlacesToReducer( filteredDocByConfitiendality ));
            setdoctorsList(filteredDocByConfitiendality)
            setSelected(true)
            setNoResult(false)
            setLimitedResult(true)
          }
        } else {
          setNoResult(true)
          setSelected(false)
        }
      });
  };

    const doctors = 
    doctorsList.map((data, i) => {
      console.log('data map doctors are', data)

      function handleDocPress() {
        // dispatch(addDocToReducer({ _id: data._id, firstname: data.firstname, lastname: data.lastname, email: data.email, phone: data.phone, address: data.address, latitude: data.latitude, longitude: data.longitude, sector: data.sector.description, specialties: data.specialties, tags: data.tags.name }));
        navigation.navigate('Doctor', {...data})
        }
        
        // if(user.token) = return tous les docs //If (!user.token) return que les docs a confidentiality level
          return (
            <TouchableOpacity onPress={handleDocPress} key={i}>
                <DoctorCard  lastname={data.lastname} firstname={data.firstname} specialties={data.specialties} address={data.address} />
            </TouchableOpacity>
          );
    });

// If pour montrer resultats et le plus de filtres
  if(selected){
    docResults =  
    <View style={styles.scrollDoc}>
          {doctors}
    </View>;

    filter = 
    <TouchableOpacity style={styles.filter}>
    <Text style={styles.textFilter}>Trier par filtres</Text>
    <FontAwesomeIcon  icon={ faArrowDownWideShort } size={20} color={'black'}  />
    </TouchableOpacity>;

    map = 
    <TouchableOpacity style={styles.filter} onPress={() => navigation.navigate('Geolocalisation')}>
    <Text style={styles.textFilter}>Voir les résultats sur une carte</Text>
    <FontAwesomeIcon  icon={ faMap } size={20} color={'black'}  />
    </TouchableOpacity>;


  }

  // if pour afficher le no result (par un etat local)
  if (noResult){
    docResults = <View style={styles.scrollDoc}>
    <Text style={styles.noResultText}>Nous sommes désolé.e.s. Aucun résultat ne correspond à votre recherche
     </Text>
    </View>
  }
  // if pour afficher le no result (par un etat local)
  if (limitedResult){
    textLimitedResults =  <Text style={styles.limitedResultText}>
    La liste suivante est restreinte, certains doc.s ne souhaitant apparaitre que pour les utilisateur.rice.s connecté.e.s
    </Text>
  }

  useEffect(() => {
    console.log('SPECIALTY IS', specialty)
  }, [specialty]);
  console.log('SPECIALTY IS (OUE)', specialty)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

          <Header navigation={navigation}/>
          <View style={styles.inputsContainer}>

            <View style={styles.logoContainer}>
              <Text style={styles.h2}>Je recherche :</Text>
            </View>

            {/* ajout des input dans ce cadre */}
          
            {/* INPUT Recherche par médecin*/}
            <View style={styles.boxContainer}>
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

            {/*INPUT DROPDOWN Recherche par spécialité*/}
            <View style={styles.dropdownContainer}>
                {renderLabelSector()}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: '#2D0861' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  activeColor= '#E9D3F1'
                  data={specialties}
                  search
                  maxHeight={300}
                  value = {specialtyToDisplay}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Spécialité' : '...'}
                  searchPlaceholder=" Sélectionner une spécialité :"
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setSpecialty(item.label);
                    setSpecialtyToDisplay(item.value);
                    setIsFocus(false);
                  } 
                }
                /> 
              </View>

            {/* <TextInput
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
            /> */}

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
              {map}
   

          {/* Creation Scrollview resultats medecins avec composants conditionné au clic sur rechercher */}
          <ScrollView>
          {textLimitedResults}
          {docResults}
          </ScrollView>

          <TouchableOpacity
            style={styles.mediumBtn}
            title="Add a doc"
            onPress={handlePress}
            >
            <Text style={styles.h3}>Rechercher</Text>
          </TouchableOpacity>
          </View>
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

    mediumBtn: {
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
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
      marginBottom: 20,
      marginTop: 20
    }, 

    boxContainer: {
      height: '100%',
      marginTop: 15
    },

    limitedResultText: {
      color: '#2D0861',
      fontFamily: 'Greycliff-Bold',
      fontSize: 16,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    }, 
    //DROPDOWN STYLE
dropdown: {
  height: 50,
  borderColor: 'black',
  borderWidth: 0.8,
  borderRadius: 4,  
  paddingHorizontal: 14,
  backgroundColor: '#fdfbfc',
  marginBottom: 14,
},
label: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 5,
  top: -7,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
  fontFamily: 'Greycliff-Regular',
},
placeholderStyle: {
  fontSize: 16,
},
selectedTextStyle: {
  fontFamily: 'Greycliff-Regular',
  fontSize: 16,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},
});
