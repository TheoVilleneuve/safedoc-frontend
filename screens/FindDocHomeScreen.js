import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Keyboard, Modal, Pressable, ImageBackground} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDownWideShort, faLocationCrosshairs, faMap, faMapPin, faPen, faTrashCan, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../components/Header';
import DoctorCard from '../components/DoctorCard';
import DoctorCardTags from '../components/DoctorCardTags';
import MultiSelectComponent from '../components/MultiselectComponent';
import * as Location from 'expo-location';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextInput, Button, useTheme } from 'react-native-paper';

// Import pour reducer doctor
import { useDispatch, useSelector } from 'react-redux';
import {addDocToReducer } from '../reducers/doctor'

// Import pour reducer docplaces pour geoloc
import { addDocPlacesToReducer, deleteDocPlacesFromReducer } from '../reducers/docplaces'

export default function FindDocHomeScreen({ navigation }) {

//USEEFFECT pour récuperer la table de référence des spécialités
useEffect(() => {
  //GET la table de référence SPECIALTIES au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/specialties`)
    .then((response) => response.json())
    .then((data) => {
      setSpecialtiesList([...data.specialties]);
      });
  //GET la table de référence TAGS au chargement de la page
  fetch(`https://safedoc-backend.vercel.app/tags`)
  .then((response) => response.json())
  .then((data) => {
    setTagsList(data.tags);
    });
}, []);

    // UseSelector pour recuperer user reducer
    const user = useSelector((state) => state.user.value);
    
  // Dispatch pour reducer doctor
  const dispatch = useDispatch();
  // Ajouter dispatch quand clique sur fiche // Verifier qu'il ne faut pas ajouter .doctors (data.doctors._id)

  // UseSelector pour recuperer user reducer
  const doctor = useSelector((state) => state.doctor.value);

  //TRI PAR TAGS
  //Etat pour stocker les TAGS pour trier les Docs
  const [sortTag, setSortTag] = useState([]);
  

  const [tagsList, setTagsList] = useState([])
  //MAP Pour afficher les tags
  const tags = tagsList.map((data, i) => {
    return (
      {label: data.value, value: i}
      //MAP qui renvoie les element du Picker
      // <Picker.Item style={styles.card} label={data.description} value={data.value} key={data.id}/>
    );
  });

  const handleCreation = (key, value) => {
    setSortTag(value);
};

// useEffect(() => {
//   console.log('SORTTAG IS', sortTag)
// }, [sortTag]);

  //Etat pour geolocalisation
  const [currentPosition, setCurrentPosition] = useState(null);

  // console.log('current position in docSearch page is', currentPosition);

  // Etat pour afficher filtres
  const [filterVisible, setFilterVisible] = useState(false);

  // locat state pour recuperer liste doctor
  const [doctorsList, setdoctorsList] = useState([]);

  //gestion de l'etat filtres et apparition resultats docteurs au clic des boutons
  const [selected, setSelected] = useState(false);

    //gestion de l'etat si pas de resultats docteurs au clic des boutons
  const [noResult, setNoResult] = useState(false);

  //gestion de l'etat si pas resultats limitées au clic des boutons
  const [limitedResult, setLimitedResult] = useState(false);


    //gestion de l'etat si pas resultats limitées au clic des boutons
    const [proximityResult, setProximityResult] = useState(false);

  // Local States pour les valeurs des 3 Inputs de recherche de Doc
  const [docName, setDocName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialtyToDisplay, setSpecialtyToDisplay] = useState('');
  const [location, setLocation] = useState('');

  // Faire apparaitre resultats docs et boutons filtre, modal
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

  // Usefect geolocalisation afin de filtrer distance par proximité
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
 
    if (status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 },
        (location) => {
          setCurrentPosition(location.coords);
        });
    }
  })
  ();
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
    // console.log('click detected');
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
            // console.log('data result', data.doctors)
            dispatch(addDocPlacesToReducer( data.doctors ));
            setdoctorsList(data.doctors)
            setSelected(true)
            setNoResult(false)
          } else {
            // Filter pour que les user non loggués ne voient que les docs à confidentiality level 0
            const doctorsNoFiltered = data.doctors
            const filteredDocByConfitiendality = doctorsNoFiltered.filter(doctorsNoFiltered => doctorsNoFiltered.confidentiality.value < 1);
            // console.log('filtered docs', filteredDocByConfitiendality)
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
      // console.log('doctorsList is',doctorsList )
      // console.log('doctorsList is',doctorsList )
      // console.log('data map doctors are', data)

      function handleDocPress() {
        navigation.navigate('Doctor', {...data})
        }
          if (sortTag.length > 0){
            return (
              <TouchableOpacity onPress={handleDocPress} key={i}>
                  {/* <DoctorCard  lastname={data.lastname} firstname={data.firstname} specialties={data.specialties} address={data.address} /> */}
                  <DoctorCardTags  lastname={data.lastname} firstname={data.firstname} specialties={data.specialties} address={data.address} tags={data.tags}/>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity onPress={handleDocPress} key={i}>
                  <DoctorCard  lastname={data.lastname} firstname={data.firstname} specialties={data.specialties} address={data.address} />
                  {/* <DoctorCardTags  lastname={data.lastname} firstname={data.firstname} specialties={data.specialties} address={data.address} tags={data.tags}/> */}
              </TouchableOpacity>
            );
          }
    });


  
// If pour montrer resultats et le plus de filtres
  if(selected){
    const filterPress = () => {
      // console.log('clic filtre')
      setFilterVisible(!filterVisible)
    }

    docResults =  
    <View style={styles.scrollDoc}>
          {doctors}
    </View>;

    filter = 
    <TouchableOpacity style={styles.filter} onPress={filterPress}>
    <Text style={styles.textFilter}>Plus de filtres</Text>
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

  // Algoritme pour classer par distance
        // User's current location
        // const userLat = 48.89267;
        // const userLng = 2.241131;

        const userLat = currentPosition?.latitude;
        const userLng = currentPosition?.longitude;  

      // Calculate distance between two points using the Haversine formula
      function getDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lng2 - lng1) * Math.PI / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance; // distance in km
      }

      // Sort results by proximity to user's current location
      const sortedResultsMaps = [... doctorsList].sort((a, b) => {
        // console.log('a is', a.latitude)
        // console.log('a is', a.latitude)
      const distanceA = getDistance(userLat, userLng, a.latitude, a.longitude);
        const distanceB = getDistance(userLat, userLng, b.latitude, b.longitude);
        return distanceA - distanceB;
      });
      
      // console.log('resultats classés apr distance', sortedResultsMaps)


      // Fonction HandleProximity
      const handleProximity = () => {

        // console.log('CLIC PROXIMITY')
        setdoctorsList(sortedResultsMaps)
      }


  // useEffect(() => {
  //   console.log('SPECIALTY IS', specialty)
  // }, [specialty]);
  // console.log('SPECIALTY IS (OUE)', specialty)

  // ALGO POUR TRIER PAR TAGS //

  
// const docResultByTags = [... doctorsList].sort((a, b) => {
//   // const aHasTag = a.tags.includes(commun);
//   // const bHasTag = b.tags.includes(commun);

//   const aHasTag = a.tags.filter(tag => commun.includes(tag));
//   const bHasTag = b.tags.filter(tag => commun.includes(tag));

  
//   if (aHasTag && !bHasTag) {
//     return -1; // a comes first
//   } else if (!aHasTag && bHasTag) {
//     return 1; // b comes first
//   } else {
//     return 0; // no change in order
//   }
// });



// Custom comparator function to sort doctors based on number of matching tags in the 'commun' array
// function compareDoctors(a, b) {
//   const aMatches = a.tags.filter(tag => commun.includes(tag));
//   const bMatches = b.tags.filter(tag => commun.includes(tag));
//   return bMatches.length - aMatches.length;
// }

// // Sort the doctors list based on the 'compareDoctors' function
// const docResultByTags = [... doctorsList].sort(compareDoctors);



// La fonction pour compter le nombre de tags en commun
// function countCommonTags(doctor, tags) {
//   let count = 0;
//   for (let i = 0; i < doctor.tags.length; i++) {
//     if (tags.includes(doctor.tags[i])) {
//       count++;
//     }
//   }
//   return count;
// }

// // Les données de départ
// const commun = ["Accessibilité PMR", "Trans-Friendly"];


// Trier les objets doctors en fonction du nombre de tags en commun avec le tableau de tags
// const docResultByTags = [... doctorsList].sort((a, b) => {
//   console.log('A tags is', a.tags, a.lastname)
//   const aCount = countCommonTags(a, sortTag);
//   const bCount = countCommonTags(b, sortTag);
//   return bCount - aCount; // trier par ordre décroissant
// });

const docResultByTags = [... doctorsList].sort((a, b) => {
  const aTagsInCommon = a.tags.filter(tag => sortTag.includes(tag)).length;
  const bTagsInCommon = b.tags.filter(tag => sortTag.includes(tag)).length;
  return bTagsInCommon - aTagsInCommon;
});

useEffect(() => {
  console.log('docs classés par tags', docResultByTags)
}, [docResultByTags]);
console.log('OUT OF USEEFFECT docs classés par tags', docResultByTags)

  // if pour lancer resultats recherche par tags

  useEffect(() => {
    if (sortTag.length > 0){
      setdoctorsList([...docResultByTags])
      }
  }, [sortTag]);
  
// Pour customiser theme des inputs react native paper (fonfamily)
  const theme = useTheme();	


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground 
    source={require('../assets/background-pinkgradient.jpeg')} 
    style={styles.gradientContainer}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

          <Header navigation={navigation}/>

          <View style={styles.logoContainer}>
              <Text style={styles.h2}>Je recherche :</Text>
            </View>

          <View style={styles.inputsContainer}>
            
            {/* ajout des input dans ce cadre */}
          
            {/* INPUT Recherche par médecin*/}
            <ScrollView style={styles.boxContainer}>
              <TextInput
              theme={{
               fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
               }}
              contentStyle={styles.contentStyle}
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
            <View>
                {renderLabelSector()}
                <Dropdown
                  style={[styles.dropdown, isFocus && { fontFamily: "Greycliff-Regular" , borderColor: '#2D0861' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.inputTextStyle}
                  activeColor= '#E9D3F1'
                  data={specialties}
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
                theme={{
                  fonts: { bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: "Greycliff-Regular" } },
                }}
              style={styles.TextInput}
              mode="outlined"
              label="Département (optionnel)"
              placeholder="Département (optionnel)"
              onChangeText={(value) => setLocation(value)}
              value={location}
              //test css
              textColor= '#fdfbfc'
              activeOutlineColor= '#652CB3'
              selectionColor= '#652CB3'
            /> 
              {/* Apparition tri par filtres conditionné au clic sur rechercher */}
              {filter}

              {filterVisible && 
            <View>
            <MultiSelectComponent 
            data = {tags} 
            placeholder = {"Tag(s)"}  
            labelField ={"label"}
            valueField ={"value"}
            searchPlaceholder= {"Tag(s)"}
            handleCreation = {handleCreation}
            dataKey = {'Tag(s)'}
            />

              <TouchableOpacity style={styles.proximityContainer} onPress={handleProximity}>
              <Text style={styles.textProximity}>Trier par proximité</Text>
              <FontAwesomeIcon  icon={ faLocationCrosshairs } size={20} color={'black'}  />
              </TouchableOpacity>
              </View>
              }      
            </View>
              {map}
   

          {/* Creation Scrollview resultats medecins avec composants conditionné au clic sur rechercher */}
          <ScrollView>
          {textLimitedResults}
          {docResults}
          </ScrollView>

          </ScrollView>

          
          </View>
          <TouchableOpacity
            style={styles.mediumBtn}
            title="Add a doc"
            onPress={handlePress}
            >
            <Text style={styles.h3White}>Rechercher</Text>
          </TouchableOpacity>

      </KeyboardAvoidingView> 
      </ImageBackground>    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeAreaView: {
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
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      },

    logoContainer: {
      width: 320,
      marginBottom: '5%',
      marginTop: '5%',
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
      backgroundColor: 'white',
      display: 'flex',
      bottom: 55,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      height: '70%',
      paddingTop: '5%',
      paddingBottom: '5%',
      borderRadius: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    
    h3White: {
      color: 'white',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },

    mediumBtn: {
      position: 'absolute',
      bottom: 40,
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

    TextInput: {
      width: '100%',
      marginBottom: 20,
      fontFamily: "Greycliff-Regular",
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
      width: '100%',
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
    
label: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 5,
  top: -7,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
  fontFamily: 'Greycliff-Regular',  
  color: '#262626' 
},

h3Justify:{
  fontFamily: 'Greycliff-Bold',
  fontWeight: 600,
  fontSize: 16,
  display: 'flex',
  alignContent: 'flex-end',
  alignItems: 'center',
  width: 180,
  textAlign: 'right'
},

proximityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
},
textProximity: {
  color: 'black',
  fontFamily: 'Greycliff-Bold',
  fontWeight: 600,
  fontSize: 16,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: 0.25,
  marginRight: 10,
},

//DROPDOWN STYLE
dropdown: {
  fontFamily: "Greycliff-Regular",
  width: '100%',
  height: 50,
  borderColor: 'black',
  borderWidth: 0.84,
  borderRadius: 4,  
  paddingHorizontal: 14,
  backgroundColor: '#fdfbfc',
  marginBottom: 14,
},

placeholderStyle: {
  fontSize: 16,
  fontFamily: "Greycliff-Regular",
  color: '#262626' 
},
selectedTextStyle: {
  fontFamily: 'Greycliff-Regular',
  fontSize: 16,
},
itemTextStyle: {
  fontFamily: "Greycliff-Regular",
},
inputTextStyle: {
  fontFamily: "Greycliff-Regular",
},

});
