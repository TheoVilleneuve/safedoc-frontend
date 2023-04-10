import { TouchableOpacity, StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';


export default function SignUpScreen({ navigation }) {
// Local States pour les 3 Input de SignUp
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

// Local State pour changer couleur de TextInputColor quand il est selectionné
const [userIsFocused, setUserIsFocused] = useState(false);
const [passwordIsFocused, setPasswordIsFocused] = useState(false);
const [emailIsFocused, setEmailIsFocused] = useState(false);


// Fonctions pour changer etats Focused sur chaque input independemment (pour changer la couleur de la border lorsque selectionné)
  const inputUsernameFocused = () => setUserIsFocused(true);
  const inputUsernamenotFocused = () => setUserIsFocused(false);
  const inputPasswordFocused = () => setPasswordIsFocused(true);
  const inputPasswordnotFocused = () => setPasswordIsFocused(false);
  const inputEmailFocused = () => setEmailIsFocused(true);
  const inputEmailnotFocused = () => setEmailIsFocused(false);
  

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <FontAwesome name={'angle-left'} size={30} color={'#652CB3'} style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}/>
            <Text style={styles.h1}>Inscription</Text>

            <View style={styles.inputContainer}>
                <TextInput
                style={[
                  styles.input,
                  userIsFocused && { borderColor: '#652CB3' } // Change la couleur du input quand il est focused
                ]}
                placeholder="Username"
                onChangeText={(value) => setUsername(value)}
                value={username}
                onFocus={inputUsernameFocused}
                onBlur={inputUsernamenotFocused}
                />
                <TextInput
                style={[
                styles.input,
                passwordIsFocused && { borderColor: '#652CB3' } // Change la couleur du input quand il est focused
                      ]}
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                value={password}
                onFocus={inputPasswordFocused}
                onBlur={inputPasswordnotFocused}
                />
                <TextInput
                style={[
                  styles.input,
                  emailIsFocused && { borderColor: '#652CB3' } // Change la couleur du input quand il est focused
                        ]}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
                value={email}
                onFocus={inputEmailFocused}
                onBlur={inputEmailnotFocused}
                />
            </View>

            <TouchableOpacity
            title="Go to Quiz"
            style={styles.mediumbtn}
            onPress={() => navigation.navigate('QuizHome')}
            >
            <Text style={styles.h3white}>Continuer</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
      );

}

const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    angleLeft: {
      position: 'absolute',
      top: 20,
      left: 30
    },

    h1: {
      fontFamily: 'Greycliff CF', 
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
      justifyContent: 'space-between',
      paddingLeft: 30,
      paddingRight: 30
    },

    input: {
      borderColor: '#263238',
      borderStyle: 'solid',
      borderRadius: 8,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      height: 56
    },

    mediumbtn: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 100,
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
      fontFamily: 'Greycliff CF',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 24,
    }
  });