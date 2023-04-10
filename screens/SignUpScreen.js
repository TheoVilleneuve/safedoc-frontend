import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';


export default function SignUpScreen({ navigation }) {

// Local States pour les 3 Input de SignUp
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <FontAwesome name={'angle-left'} size={24} color={'#652CB3'} />

            <Text style={styles.h1}>Inscription</Text>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(value) => setUsername(value)}
                value={username}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                value={password}
                />
                <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
                value={email}
                />
            </View>

            <TouchableOpacity
            title="Go to Quiz"
            style={styles.mediumbtn}
            onPress={() => navigation.navigate('QuizHome')}
            >
            <Text style={styles.h3white}>Continuer</Text>
            </TouchableOpacity>

        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    h1: {
      fontFamily: 'Greycliff CF', 
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 34,
      lineHeight: 41,
      letterSpeccer: 0.25,
    },

    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      height: '30%',
      justifyContent: 'space-between'
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
      display: 'flex',
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
        width: 0,
        height: 11,
      },
      shadowOpacity:  0.23,
      shadowRadius: 11.78,
      elevation: 15
    },

    h3white: {
      color: 'white',
      fontFamily: 'Greycliff CF',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 24,
    }
  });