//A FAIRE
import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { TextInput, Avatar, Card, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addDocToReducer } from '../reducers/doctor';


export default function QuizTagsScreen({ navigation }) {
  // Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
  const [isPressed, setIsPressed] = useState(false);

  // Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
  // const [isSelected, setIsSelected] = useState([]);

  // Dispatch pour reducer login
  const dispatch = useDispatch();

  const [tagsList, setTagsList] = useState([]);
  const doctor = useSelector((state) => state.doctor.value);
  //useEffet des tags du docteur
  const [doctorTags,setDoctorTags] = useState([]);

  //USEEFFECT Qui charge la table de référence TAGS au chargement de la page pour afficher les cartes de Tags
  useEffect(() => {
    fetch(`https://safedoc-backend.vercel.app/tags`)
      .then((response) => response.json())
      .then((data) => {
        setTagsList(data.tags);
        });
  }, []);

  useEffect(() => {
    console.log('DOCTOR TAGS ARE', doctorTags)
  }, [doctorTags]);

  //création cartes de tags
  const tags = tagsList.map((data, i) => {
    const handlePressTag = () => {
      if (doctorTags.includes(data)) {
        setDoctorTags(doctorTags.filter(tag => tag !== data));
      } else {
        setDoctorTags([...doctorTags, data]);
      }
    }
    return (
      <TouchableOpacity
        title="Go to ThankYou"
        style={[styles.card, doctorTags.includes(data) && { backgroundColor: '#2D0861', color: 'white' }]}
        onPress={handlePressTag}
        key={i}
        id={data.id}
        >
        <Text style={[styles.h3purple, doctorTags.includes(data) && { color: 'white' }]}>{data.value}</Text>
        </TouchableOpacity>
    );
  });

//Fonction au clic pour ajout de doc en BDD 
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
    // setPhoneError(true);
  }
}

return (
<SafeAreaView style={styles.container}>
    <ImageBackground 
    source={require('../assets/background-bluegradient.png')} 
    style={styles.keyContainer}
    >
        <View style={styles.keyContainer}>

        <TouchableOpacity style={styles.angleLeft} title="add to tags" onPress={() => navigation.goBack()}>
        <FontAwesome name={'angle-left'} size={40} color={'#652CB3'}/>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.angleRight} title="Skip Quizz" onPress={skipQuizz}>
        <FontAwesome name={'angle-right'} size={40} color={'#652CB3'}/>
        </TouchableOpacity> */}


        <Text style={styles.h1}>Je recommande</Text>

        

        <View style={styles.scrollContainer}>
          <View style={styles.quizPhrase}>
              <Text style={styles.h3}>Sélectionner au moins 3 tags :</Text>
          </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
            {tags}
            </ScrollView>
        </View>
        

        <View style={styles.dotsProgressContainer}>
        {/* <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
        <FontAwesome name={'circle'} size={15} color={'#2D0861'}/>
        <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/> */}
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

        </View>
    </ImageBackground>
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

  keyContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  angleLeft: {
    position: 'absolute',
    left: 30
  },

  angleRight: {
    position: 'absolute',
    right: 30,
  },

  h5: {
    color: '#652CB3',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
    position: 'absolute',
    right: 20,
    top: 34,
  },

  h1: {
    marginTop: 100,
    marginBottom: 15,
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
},

inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '30%',
    paddingLeft: 30,
    paddingRight: 30,
},

h3:{
  fontFamily: 'Greycliff-Bold',
  fontWeight: 600,
  fontSize: 20,
},

input: {
    borderColor: '#263238',
    borderStyle: 'solid',
    // borderRadius: 8,
    // borderLeftWidth: 1.5,
    // borderTopWidth: 1.5,
    // borderRightWidth: 1.5,
    // borderBottomWidth: 1.5,
    height: 56,
    marginBottom: 10,
    paddingLeft: 10,
},

quizPhrase: {
  marginBottom: 10,
  width: 320,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
},
scrollContainer: {
  height: '58%'
},

h3white: {
    color: 'white',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
},
dotsProgressContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 80,
  position: 'absolute',
  bottom: 60
},

//cartes map pour les genres 
scrollView: {
  width: 320,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
},

card: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 60,
  width: '100%',
  backgroundColor: '#E9D3F1',
  marginBottom: 20,
  borderRadius: 10,
},
h3purple: {
  color: '#652CB3',
  fontFamily: 'Greycliff-Regular',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: 24,
  textAlign: 'center'
},
bottomMargin: {
    height: 100,
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

});