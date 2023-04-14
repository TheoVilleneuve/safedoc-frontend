// REPRENDRE BOUTON QUI OVERLAP ET ENLEVER LES ETATS LIES AUX COULEURS SI PAS BESOIN


import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { Button } from 'react-native-paper';



export default function SignUpScreen({ navigation }) {
// Dispatch pour reducer login
  const dispatch = useDispatch();

// Local States pour les valeurs des 3 Input de SignUp
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

// Fonction lors du clic sur bouton
const handlePress = () => {
  console.log('click detected')
  fetch('https://safedoc-backend.vercel.app/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      }).then(response => response.json())
        .then(data => {
          console.log('data is', data)
          if (data.result) {
            dispatch(login(({ token: data.token, username: data.username, email: data.email, orientation: data.orientation, gender: data.gender })))
            setUsernameOrEmail('');
            setPassword('');
            navigation.navigate('Home')
          } else {
            alert(``)
          }
        });
};

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>

          <TouchableOpacity style={styles.angleLeft} onPress={() => navigation.goBack()}>
            <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} title="Go back" />
          </TouchableOpacity>

            <Text style={styles.h1}>Connexion</Text>

            <View style={styles.inputContainer}>

              {/* INPUT Username or Email */}
              <TextInput
                style={styles.TextInput}
                mode="outlined"
                label="Username or Email"
                placeholder="Type your username or email"
                onChangeText={(value) => setUsernameOrEmail(value)}
                value={usernameOrEmail}
                //test css
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
              />

              {/* INPUT Password */}
              <TextInput
                style={styles.TextInput}
                mode="outlined"
                label="Password"
                placeholder="Type your password"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
                value={password}
                //test css
                textColor= 'black'
                activeOutlineColor= '#652CB3'
                selectionColor= '#652CB3'
              />
            </View>

            <TouchableOpacity
            title="Go to Home"
            style={styles.mediumbtn}
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

inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    height: '30%',
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