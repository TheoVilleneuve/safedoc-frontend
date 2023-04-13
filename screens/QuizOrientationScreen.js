import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { TextInput, Avatar, Card, IconButton } from 'react-native-paper';



export default function QuizGenderScreen({ navigation }) {

const [dataList, setDataList] = useState([]);

//USEEFFECT Qui charge la table de référence Genres au chargement de la page pour afficher les cartes de genres
useEffect(() => {
  fetch(`https://safedoc-backend.vercel.app/orientations`)
    .then((response) => response.json())
    .then((data) => {
      setDataList(data.orientations);
      });
}, []);

  // Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
  const [isPressed, setIsPressed] = useState(false);

//Fonction clic pour passer le questionnaire
  const skipQuizz = () => {
    navigation.navigate('Home')
  };

  // Fonction clic qui ajoute le genre a l'objet user en BDD et passe a la carte quizz suivante
  // AJOUTER lien avec la route pour enregistrement en BDD
  const addOrientation = () => {
    console.log('click on card orientation')
    navigation.navigate('Home')
  };
  //création cartes de genre
  const orientations = dataList.map((data, i) => {
    return (
      <TouchableOpacity
        title="Go to QuizOrientation"
        style={styles.card}
        onPress={addOrientation}
        >
        <Text style={styles.h3purple}>{data.value}</Text>
        </TouchableOpacity>
    );
  });

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.keyContainer}>

            <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}/>
            <FontAwesome name={'angle-right'} size={40} color={'#652CB3'} style={styles.angleRight} title="Go back" onPress={skipQuizz}/>
            <Text style={styles.h5}>passer</Text>
            <Text style={styles.h1}>Questionnaire</Text>

            <View style={styles.quizPhrase}>
              <Text style={styles.h3}>Mon orientation :</Text>
            </View>
            

            <ScrollView contentContainerStyle={styles.scrollView}>
              {orientations}
            </ScrollView>

            <View style={styles.dotsProgressContainer}>
            <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
            <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
            <FontAwesome name={'circle'} size={15} color={'#2D0861'}/>
            </View>
            <View style={styles.bottomMargin}></View>

        </View>
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
    backgroundColor: 'white',
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
  width: 320,
  marginBottom: 10,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
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
});