// REPRENDRE BOUTON QUI OVERLAP ET ENLEVER LES ETATS LIES AUX COULEURS SI PAS BESOIN

import { Dimensions, TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { login } from '../reducers/user';



export default function SignUpScreen({ navigation }) {
// Dispatch pour reducer login
const dispatch = useDispatch();

// Local States pour les valeurs des 3 Input de SignUp
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

// Local States pour changer couleurs de la border et label de l'input quand il est selectionné
const [userIsFocused, setUserIsFocused] = useState(false);
const [passwordIsFocused, setPasswordIsFocused] = useState(false);
const [emailIsFocused, setEmailIsFocused] = useState(false);


// Fonctions pour changer les etats Focused sur chaque input independemment (pour changer la couleur et texte de la border lorsque selectionné)
  const inputUsernameFocused = () => setUserIsFocused(true);
  const inputUsernameNotFocused = () => setUserIsFocused(false);
  const inputPasswordFocused = () => setPasswordIsFocused(true);
  const inputPasswordNotFocused = () => setPasswordIsFocused(false);
  const inputEmailFocused = () => setEmailIsFocused(true);
  const inputEmailNotFocused = () => setEmailIsFocused(false);

  // Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
  const [isPressed, setIsPressed] = useState(false);

  // Etat pour error email
  const [emailError, setEmailError] = useState(false);

  // Regex email
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Fonction lors du clic sur bouton
  // const handlePress = () => {
  //   console.log('click detected')
  //   if (EMAIL_REGEX.test(email)){
  //     dispatch(login(({ username, password, email })))
  //     setUsername('');
  //     setPassword('');
  //     setEmail(''); 
  //     navigation.navigate('QuizHome')
  //   } else {
  //     setEmailError(true);
  //   }
  // };


  const handlePress = () => {
    console.log('click detected')
    if (EMAIL_REGEX.test(email)){
      fetch('https://safedoc-backend.vercel.app/users/signup/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      }).then(response => response.json())
        .then(data => {
          console.log('data log up is', data)
          if (data.result) {
            dispatch(login(({ username, password, email })))
            setUsername('');
            setPassword('');
            setEmail(''); 
            navigation.navigate('QuizHome')
          } else {
            alert(`L'email ou le pseudo est déjà utilisé`)
          }
        });
    } else {
      alert(`L'email n'a pas le bon format`)
      // setEmailError(true);
    }
  };
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>
          
        <TouchableOpacity style={styles.angleLeft} onPress={() => navigation.goBack()}>
            <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} title="Go back" />
          </TouchableOpacity>            
          
        <Text style={styles.h1}>Inscription</Text>

            <View style={styles.inputContainer}>
                
              <TextInput
              style={styles.TextInput}
              mode="outlined"
              label="Pseudo de l'utilisateur.ice"
              placeholder="Entrez votre pseudo"
              onChangeText={(value) => setUsername(value)}
                  value={username}
              //test css
              textColor= 'black'
              activeOutlineColor= '#652CB3'
              selectionColor= '#652CB3'
              />
              
            <TextInput
            style={styles.TextInput}
            mode="outlined"
            label="E-mail"
            placeholder="Entrez votre E-mail"
            onChangeText={(value) => setEmail(value)}
            value={email}
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
            />

            {emailError && <Text style={styles.error}>Le format de l'E-mail est invalide</Text>}


            <TextInput
            style={styles.TextInput}
            mode="outlined"
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
            //test css
            textColor= 'black'
            activeOutlineColor= '#652CB3'
            selectionColor= '#652CB3'
            />

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
      backgroundColor: '#652CB3',
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

  h1: {
    marginTop: 30,
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

error: {
  fontFamily: 'Greycliff-Light', 
  color: 'red',
  fontSize: 16
},
});

