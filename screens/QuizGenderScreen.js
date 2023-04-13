import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { TextInput, Avatar, Card, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';


export default function QuizGenderScreen({ navigation }) {

  const [genderList, setGenderList] = useState([]);
  const user = useSelector((state) => state.user.value);

  //USEEFFECT Qui charge la table de référence Genres au chargement de la page pour afficher les cartes de genres
  useEffect(() => {
    fetch(`https://safedoc-backend.vercel.app/genders`)
      .then((response) => response.json())
      .then((data) => {
        setGenderList(data.genders);
        });
  }, []);

  // Fonction clic qui ajoute le genre a l'objet user en BDD et passe a la carte quizz suivante
  const handleGenderPress = (id) => {
    console.log('clicked gender id', id);
    addGender(id);
  };
  
  const addGender = (id) => {
    // Envoie une requête POST pour ajouter l'identifiant du genre sélectionné à l'utilisateur
    // fetch(`https://safedoc-backend.vercel.app/users/THEOVILLENEUVE`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ genderId: id }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // Passe à l'écran suivant une fois que la mise à jour a été effectuée
    //     navigation.navigate('QuizOrientation');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

    //ajout POST en BDD
    // fetch('https://safedoc-backend.vercel.app/users/:token', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token: user.token, tweetId: props._id }),
    // }).then(response => response.json())
    //   .then(data => {
    //     data.result && dispatch(likeTweet({ tweetId: props._id, username: user.username }));
    //   });
//fin
  

  //création cartes de genre
  const genders = genderList.map((data, i) => {
    return (
      <TouchableOpacity
        title="Go to QuizOrientation"
        style={styles.card}
        onPress={() => handleGenderPress(data.id)}
        key={data.id}
        >
        <Text style={styles.h3purple}>{data.value}</Text>
        </TouchableOpacity>
    );
  });

//Fonction clic pour passer le questionnaire
  const skipQuizz = () => {
    navigation.navigate('Home')
  };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.keyContainer}>

            <TouchableOpacity style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}>
              <FontAwesome name={'angle-left'} size={40} color={'#652CB3'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.angleRight} title="Skip Quizz" onPress={skipQuizz}>
              <FontAwesome name={'angle-right'} size={40} color={'#652CB3'}/>
            </TouchableOpacity>
            
            <Text style={styles.h5}>passer</Text>
            <Text style={styles.h1}>Questionnaire</Text>

            <View style={styles.quizPhrase}>
              <Text style={styles.h3}>Je me définis comme :</Text>
            </View>
            

            <ScrollView contentContainerStyle={styles.scrollView}>
              {genders}
            </ScrollView>

            <View style={styles.dotsProgressContainer}>
            <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
            <FontAwesome name={'circle'} size={15} color={'#2D0861'}/>
            <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
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