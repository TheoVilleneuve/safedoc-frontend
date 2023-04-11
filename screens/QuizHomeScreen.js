import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';



export default function QuizzHomeScreen({ navigation }) {

  // Etat pour changer couleur du bouton Touchable Opacity quand on clique dessus
  const [isPressed, setIsPressed] = useState(false);

//Fonction clic pour passer le questionnaire
  const skipQuizz = () => {
    navigation.navigate('Home')
  };

// Fonction lors du clic sur bouton
  const handlePress = () => {
    setIsPressed(true);
    navigation.navigate('QuizGender')
  };

    return (
      <SafeAreaView style={styles.container}>
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>

            <FontAwesome name={'angle-left'} size={40} color={'#652CB3'} style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}/>
            <FontAwesome name={'angle-right'} size={40} color={'#652CB3'} style={styles.angleRight} title="Go back" onPress={skipQuizz}/>
            <Text style={styles.h5}>passer</Text>
            <Text style={styles.h1}>Questionnaire</Text>

            <View style={styles.textContainer}>
              <Text style={styles.h2}>
              Voilà un petit questionnaire facultatif qui nous permettra de cibler au mieux vos besoins.
              </Text>  
            </View>

            <View style={styles.dotsProgressContainer}>
            <FontAwesome name={'circle'} size={15} color={'#2D0861'}/>
            <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
            <FontAwesome name={'circle-thin'} size={15} color={'#2D0861'}/>
            </View>

            <TouchableOpacity
            title="Go on"
            style={styles.mediumbtn}
            onPress={handlePress}
            >
            <Text style={styles.h3white}>Continuer</Text>
            </TouchableOpacity>

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

textContainer: {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'grey',
  width: '70%',
  height: '50%',
  justifyContent: 'center',
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
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
},
h2: {
  marginTop: 30,
  position: 'absolute',
  color: '#2D0861',
  fontFamily: 'Greycliff-Bold',
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: 20,
  lineHeight: 19,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: 0.25,
  top: 100,
  textAlign: 'left',
},
dotsProgressContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 80,
  position: 'absolute',
  bottom: 60
},
});