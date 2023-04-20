//A FAIRE Et IMPORTER DANS APP.JS (pas certains que Julien allait avoir touché le fichier pour éviter conflits)
import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { TextInput, Avatar, Card, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addDocToReducer } from '../reducers/doctor';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function ThankYouScreen({ navigation }) {

return (
<SafeAreaView 
style={styles.container}
>
    
    <ImageBackground 
    source={require('../assets/background-bluegradient.png')} 
    style={styles.keyContainer}
    >
      <ConfettiCannon 
      count={200} 
      origin={{x: -10, y: 0}} 
      />
        <TouchableOpacity
        style={styles.background}
        onPress={() => navigation.navigate('Home')}>

            <View style={styles.thankYouPhrase}>
                <Text style={styles.h2}>MERCI{'\n'}</Text> 
                <Text style={styles.h5}>POUR VOTRE RECOMMANDATION !</Text>
            </View>

        </TouchableOpacity>

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
  background: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyContainer: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  thankYouPhrase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  angleLeft: {
    position: 'absolute',
    left: 30
  },

  h2: {
    color: '#2D0861',
    fontFamily: 'Greycliff-Bold',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: 20,
    lineHeight: 19,  
    letterSpacing: 0.25,
  },

h3:{
  fontFamily: 'Greycliff-Bold',
  fontWeight: 600,
  fontSize: 20,
  textAlign:'center',
},

h5: {
    color: '#652CB3',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
  },

});