import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import MultiSelectComponent from '../components/MultiselectComponent';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

export default function AddDocScreen({ navigation }) {

//FONCTIONS LIEES AU BOUTON ////////////////////////////////////////////////////////////////////////
// Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
const [isPressed, setIsPressed] = useState(false);
// Fonction lors du clic sur bouton
const handlePress = () => {
  console.log('click detected')
  if (EMAIL_REGEX.test(email)){
    dispatch(login(({ username, password, email })))
    setUsername('');
    setPassword('');
    setEmail(''); 
    navigation.navigate('QuizHome')
  } else {
    setEmailError(true);
  }
};


// Dispatch pour reducer login
  const dispatch = useDispatch();

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

//MULTISELECTION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ref = useRef(null);
const [selectedSpecialties, setSelectedSpecialties] = useState([]);
const [selectedLanguages, setSelectedLanguages] = useState([]);
  

// Local States pour les valeurs des docs a ajouter
  const [docLastName, setDocLastName] = useState('');
  const [docFirstName, setDocFirstName] = useState('');
  const [docPhoneNbr, setDocPhoneNbr] = useState('');
  const [docAdress, setDocAdress] = useState('');
  const [newDoc, setNewDoc]=useState({});
  
  const handleCreation = (key, value) => {

      setNewDoc({...newDoc, [key]: value})


  };

  useEffect(() => {
    console.log('NEWDOC IS', newDoc)
  }, [newDoc]);

    return (
      <SafeAreaView style={styles.container}>
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
                  onChangeText={(value) => setDocAdress(value)}
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
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Conventionnement' : '...'}
                        searchPlaceholder="Niveau de conventionnement :"
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setValue(item.value);
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
scrollContain: {
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    height: '55%',
    marginTop: '5%',
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