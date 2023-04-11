import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';



export default function SignUpScreen({ navigation }) {
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

// Fonction lors du clic sur bouton
  const handlePress = () => {
    setIsPressed(true);
    navigation.navigate('QuizHome')
  };

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>
            <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}/>
            <Text style={styles.h1}>Inscription</Text>

            <View style={styles.inputContainer}>
                <TextInput
                style={[
                  styles.input,
                  userIsFocused && { borderColor: '#652CB3' } // Change la couleur du input quand il est focused
                ]}
                mode="outlined"
                label="Username"
                placeholder="Type your username"
                // right={<TextInput.Affix text="/100" />}
                onChangeText={(value) => setUsername(value)}
                value={username}
                onFocus={inputUsernameFocused}
                onBlur={inputUsernameNotFocused}
                />
    
                <TextInput
                style={[
                styles.input,
                passwordIsFocused && { borderColor: '#652CB3' } // Change la couleur du input quand il est focused
                      ]}
                mode="outlined"
                label="Password"
                placeholder="Type your password"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
                value={password}
                onFocus={inputPasswordFocused}
                onBlur={inputPasswordNotFocused}
                />

                <TextInput
                style={[
                  styles.input,
                  emailIsFocused && { borderColor: '#652CB3' } // Change la couleur du input quand il est focused
                        ]}
                mode="outlined"
                label="Email"
                placeholder="Type your email"
                onChangeText={(value) => setEmail(value)}
                value={email}
                onFocus={inputEmailFocused}
                onBlur={inputEmailNotFocused}
                />
            </View>

            <TouchableOpacity
            title="Go to Quiz"
            style={[
              styles.mediumbtn,
              { backgroundColor: isPressed ? '#2D0861' : '#652CB3' },
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
    // alignItems: 'center',
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
    marginTop: 100,
    fontFamily: 'GreycliffCF', 
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
  fontFamily: 'Greycliff CF',
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