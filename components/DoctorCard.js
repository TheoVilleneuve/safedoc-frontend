import { TouchableOpacity, StyleSheet, Text, View, Image, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar, faTrashCan, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useState } from 'react';
import { separateWords } from "../utils/utils";


export default function DoctorCard(props) {
// Etat pour favoris
const [favorite, setFavorite] = useState(false);

const handleFavorite = () => {
  setFavorite(!favorite)
}

return (
<View style={styles.container}>
  <View style={styles.docContainer}>

    <FontAwesomeIcon  icon={ faUserDoctor } size={20} color={'black'} style={styles.iconDoc} />
    
    <View style={styles.docInfoContainer}>
      <Text style={styles.h3}>Dr {props.lastname} {props.firstname}</Text>
      <Text style={styles.h6}>{separateWords(props.specialties)}</Text>
      <Text style={styles.h6}>{props.address}</Text>
    </View>

  </View>

  <TouchableOpacity onPress={handleFavorite}>    
     <FontAwesomeIcon  icon={ faStar } size={20} color={favorite ? '#2D0861' : '#E9D3F1'}  />
  </TouchableOpacity>   

</View>
);
}

const styles = StyleSheet.create({
    container: {
      width: '103%',
      backgroundColor: 'white',
      borderColor: '#2D0861',
      borderWidth: 1 ,
      borderRadius: 15,
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 10,
      shadowColor: "#000000",
      shadowOffset: {
      width: 6,
      height: 6,
  },
      shadowOpacity:  0.10,
      elevation: 8
    },

    h3: {
      fontFamily: 'Greycliff-Bold',
      fontSize: 20,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
      marginBottom: 2
    },

    docContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    docInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 230,
    },

    iconDoc: {
        marginRight: 20,
    },

    h6: {
        fontFamily: 'Greycliff-Regular',
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: 0.25,
    },

  });