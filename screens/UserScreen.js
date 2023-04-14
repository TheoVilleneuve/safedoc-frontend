// DOUTE SUR LE DISPATCH LOGOUT ET AJOUTER ROUTE SUPPRESSION COMPTE

import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import user from '../reducers/user';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { logout } from '../reducers/user';
import { login } from '../reducers/user';


export default function UserScreen({ navigation }) {
  // UseSelector pour recuperer user reducer
  const user = useSelector((state) => state.user.value);

// Dispatch pour reducer logout
const dispatch = useDispatch();  

// Fonction pour se logout
const logoutPress = () => {
  dispatch(logout())
  navigation.navigate('Login')
}

// Fonction pour supprimer son compte a completer
const deleteAccountPress = () => {
  console.log('clic delete')
  dispatch(logout())
  fetch(`https://safedoc-backend.vercel.app/users/${user.token}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: user.token }),
  }).then(response => response.json())
    .then(data => {
      console.log('data delete is', data)
      if (data.result) {
        navigation.navigate('Login')
      }
    });
}

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.keyContainer}>
        <Header navigation={navigation}/>
          <View style={styles.userLogoContainer}>
            <FontAwesome name={ 'user' } size={60} color={'black'}  />

            <View style={styles.userNameContainer}>
              <Text style={styles.h1}>{user.username}</Text>
              <TouchableOpacity>
                <FontAwesomeIcon 
                icon={ faPenToSquare }  
                size={20} 
                color={'black'}
                // title="Go to Modifier"
                // onPress={() => navigation.navigate('Modifier')}  
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button 
          icon="star" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          contentStyle={{width: 320, borderRadius: 20, }}
          labelStyle={{color: '#2D0861', fontFamily: 'Greycliff-Bold', fontSize: 16, letterSpacing: 0.25, fontWeight: 600
        }}
          >
          Mes Favoris
          </Button>

          <View style={styles.textInfosContainer}>
            <View style={styles.textInfos}>
              <Text style={styles.h3}>Email:</Text>
              <Text style={styles.h3}>{user.email}</Text>

            </View>

            <View style={styles.textInfos}>
              <Text style={styles.h3}>Genre:</Text>
              <Text style={styles.h3}>{user.gender}</Text>
            </View>

            <View style={styles.textInfos}>
              <Text style={styles.h3}>Orientation:</Text>
              <Text style={styles.h3}>{user.orientation}</Text>
            </View>
            
          </View>

          <TouchableOpacity
            style={styles.mediumBtn}
            title="Go to Login"
            onPress={logoutPress}
            >
                <Text style={styles.h3White} >Me Déconnecter</Text>
            </TouchableOpacity>

          <View style={styles.deleteContainer}>
            <TouchableOpacity
            // title="Go to Quiz Orientation"
            onPress={deleteAccountPress}
            >
                <Text style={styles.h5}>Supprimer mon compte</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <FontAwesomeIcon 
                icon={ faTrashCan }  
                size={14} 
                color={'#2D0861'}
                // title="Go to Modifier"
                // onPress={() => navigation.navigate('Modifier')}  
                />
              </TouchableOpacity>

          </View>
          
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
      // alignItems: 'center',
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
  
    userLogoContainer: {
      alignItems: 'center'
    },

    userNameContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
      marginTop: 10
    },

    textInfosContainer: {
      width: '100%',
      paddingLeft: 30,
      paddingRight: 30,
    },

    textInfos: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15
   },

   deleteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
   },

   mediumBtn: {
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
    width: 6,
    height: 6,
    },
    shadowOpacity:  0.25,
    shadowRadius: 12,
    elevation: 12
  },

  h1: {
    fontFamily: 'Greycliff-Bold', 
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 34,
    lineHeight: 41,
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
},

  h3: {
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.25,
  },

  h3White: {
    color: 'white',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.25,
  },

  h5: {
    color: '#2D0861',
    fontFamily: 'Greycliff-Bold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
    textDecorationLine: 'underline',
    marginRight: 20,
  },

  });