import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import MultiSelectComponent from '../components/MultiselectComponent';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { addDocToReducer } from '../reducers/doctor';

export default function AddDocScreen({ navigation }) {

//FONCTIONS LIEES AU BOUTON ////////////////////////////////////////////////////////////////////////
// Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
const [isPressed, setIsPressed] = useState(false);

// Regex email
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
// Dispatch pour reducer login
const dispatch = useDispatch();

//récupération des infos doctor depuis le Reducer pour les compléter
const doctor = useSelector((state) => state.doctor.value);

//MULTISELECTION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ref = useRef(null);
const [selectedSpecialties, setSelectedSpecialties] = useState([]);
const [selectedLanguages, setSelectedLanguages] = useState([]);
  

// Local States pour les valeurs des docs a ajouter
  const [docLastName, setDocLastName] = useState(doctor.lastname);
  const [docFirstName, setDocFirstName] = useState(doctor.firstname);
  const [docEmail, setDocEmail] = useState(doctor.email);
  const [docPhoneNbr, setDocPhoneNbr] = useState('');
  const [docAdress, setDocAdress] = useState('');
  const [docLat, setDocLat] = useState (null);
  const [docLon, setDocLon] = useState (null)
  const [docSector, setDocSector] = useState('');

  const [newDoc, setNewDoc]=useState({});

  useEffect(() => {
    console.log('SECTOR DOC SECTOR IS', docSector)
    console.log('VALUE IS', value)
  }, [docSector]);

  //TEST DE LA MAJ DE DOCSECTOR
  // useEffect(() => {
  //   console.log('DOC SECTOR IS ',docSector)
  //   console.log('doc specialties are', newDoc.specialties)
  //   console.log('doc languages are', newDoc.languages)
  // }, [docSector]);
///////////////

// FONCTION POUR RECUPERER ADRESSE 



// const handleAdress = (value) => {
//   useEffect(() => { 
//     setDocAdress(value);
//       fetch(`https://safedoc-backend.vercel.app/doctors/search/${value}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 // body: JSON.stringify({ username: user.username, password: user.password, email: user.email }),
//               }).then(response => response.json())
//                 .then(data => {
//                   // if (data.result) {
//                   //   console.log(data.results)
//                   // }
//                   console.log('text changed')
//                 });
//         console.log('NEWDOC IS', newDoc)
//   }, [docAdress]);
  
// }

  const handleCreation = (key, value) => {
      setNewDoc({...newDoc, [key]: value})
  };

  useEffect(() => {
    console.log('NEWDOC IS', newDoc)
  }, [newDoc]);

// Fonction lors du clic sur bouton ajouter les infos supplémentaires au réducer
const handlePress = () => {
  console.log('click detected')
  if (PHONE_REGEX.test(docPhoneNbr)){
    dispatch(addDocToReducer(({
      firstname: docFirstName,
      lastname: docLastName,
      email: docEmail,
      phone: docPhoneNbr, 
      address: docAdress, 
      sector: docSector,
      specialties: newDoc.specialties,
      languages: newDoc.languages,
     })))
          setDocFirstName('');
          setDocLastName('');
          setDocEmail('');
          setDocPhoneNbr('');
          setDocAdress('');
          setDocSector('');
          setNewDoc({}); 
          navigation.navigate('QuizTags')
  } else {
    alert(`Le numéro de téléphone n'a pas le bon format`)
    setPhoneError(true);
  }
}

// États pour GET les tables de références et mapper 
const [sectorsList, setSectorsList] = useState([]);
const [specialtiesList, setSpecialtiesList] = useState([]);
const [languagesList, setLanguagesList] = useState([]);

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
      setSpecialtiesList([...data.specialties]);
      });
  //GET la table de référence LANGUAGES au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/languages`)
    .then((response) => response.json())
    .then((data) => {
      setLanguagesList([...data.languages]);
      });
}, []);

//  console.log('sectorsList',sectorsList)
//  console.log('specialtiesList',specialtiesList)
//  console.log('languagesList',languagesList)
 
//Map des SECTORS
const sectors = sectorsList.map((data, i) => {
  return (
    {label: data.description, value: data.value}
    //MAP qui renvoie les element du Picker
    // <Picker.Item style={styles.card} label={data.description} value={data.value} key={data.id}/>
  );
});
// console.log('Sectors are',sectors)

//Map des SPECIALTIES
const specialties = specialtiesList.map((data, i) => {
  return (
    { label: data.value, value: i }
  );
});
// console.log('Specialties are',specialties)

//Map des LANGUAGES
const languages = languagesList.map((data, i) => {
  return (
    { label: data.value, value: i }
  );
});
// console.log('languages are',languages)

//DROPDOWN////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);

//Fonction style des Dropdown
    const renderLabelSector = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#652CB3' }]}>
            Conventionnement
          </Text>
        );
      }
      return null;
    };
  



    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground 
        source={require('../assets/background-pinkgradient.png')} 
        style={styles.gradientContainer}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>

            <TouchableOpacity style={styles.angleLeft} onPress={() => navigation.goBack()}>
              <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} title="Go back" />
            </TouchableOpacity>

              <Text style={styles.h1}>Enregister un.e doc</Text>

              <View style={styles.scrollContain}>
                <ScrollView>
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

                  {/* INPUT EMAIL */}
                  <TextInput
                    style={styles.TextInput}
                    mode="outlined"
                    label="E-mail"
                    placeholder="E-mail"
                    onChangeText={(value) => setDocEmail(value)}
                    value={docEmail}
                    //test css
                    textColor= 'black'
                    activeOutlineColor= '#652CB3'
                    selectionColor= '#652CB3'
                    keyboardType="email-address"
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
                    keyboardType="phone-pad"
                  />

                  {/* INPUT ADRESS */}
                  <TextInput
                    style={styles.TextInput}
                    mode="outlined"
                    label="Adresse"
                    placeholder="Entrez l'adresse"
                    onChangeText={(value) => set(value)}
                    // onChangeText={(value) => handleAdress(value)}
                    value={docAdress}
                    //test css
                    textColor= 'black'
                    activeOutlineColor= '#652CB3'
                    selectionColor= '#652CB3'
                  />
                  {/* DROPDOWN SECTOR */}
                  <View style={styles.dropdownContainer}>
                        {renderLabelSector()}
                        <Dropdown
                          style={[styles.dropdown, isFocus && { borderColor: '#2D0861' }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          activeColor= '#E9D3F1'
                          data={sectors}
                          search
                          maxHeight={300}
                          value = {docSector}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocus ? 'Conventionnement' : '...'}
                          searchPlaceholder="Niveau de conventionnement :"
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setDocSector(item.value);
                            setIsFocus(false);
                          } }
                        /> 
                  </View>

                  {/* MULTISELECT COMPONENT : SPECIALTIES*/}
                  <MultiSelectComponent 
                    data = {specialties} 
                    placeholder = {"Spécialité(s)"} 
                    labelField ={"label"}
                    valueField ={"value"}
                    searchPlaceholder= {"Spécialité(s)"}
                    handleCreation = {handleCreation}
                    dataKey = {'specialties'}
                  />

                  {/* MULTISELECT COMPONENT : LANGUAGES*/}
                  <MultiSelectComponent 
                    data = {languages} 
                    placeholder = {"Langue(s)"} 
                    labelField ={"label"}
                    valueField ={"value"}
                    searchPlaceholder= {"Langue(s)"}
                    handleCreation = {handleCreation}
                    dataKey = {'languages'}
                  />

              </ScrollView>   
              </View>
              <TouchableOpacity
              title="Go to Quiz"
              style={[
                styles.mediumbtn,
                isPressed && { marginBottom: 0 }
              ]}
              onPress={handlePress}
              >
              <Text style={styles.h3white}>Continuer</Text>
              </TouchableOpacity>          
          </KeyboardAvoidingView>
          </ImageBackground>

        </SafeAreaView>
            );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D0861',
  },

  gradientContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  keyContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  angleLeft: {
    position: 'absolute',
    left: 30
  },

  h1: {
    color: '#2D0861',
    marginTop: 50,
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
},
scrollContain: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 320,
    paddingTop: '5%',
    paddingBottom: '5%',
    height: '50%',
    marginTop: '5%',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
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
dropdownContainer: {
  marginTop: 9,
  marginBottom: 9,
},
//DROPDOWN STYLE
dropdown: {
  height: 50,
  borderColor: 'black',
  borderWidth: 0.8,
  borderRadius: 4,  
  paddingHorizontal: 14,
  backgroundColor: '#fdfbfc',
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