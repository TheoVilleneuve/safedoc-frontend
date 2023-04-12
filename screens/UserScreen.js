import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import user from '../reducers/user';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-native-paper';


export default function UserScreen({ navigation }) {
  
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.keyContainer}>
        <Header navigation={navigation}/>
          <View style={styles.userLogoContainer}>
            <FontAwesome name={ 'user' } size={60} color={'black'}  />

            <View style={styles.userNameContainer}>
              <Text style={styles.h1}>$John .Ex</Text>
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
              <Text style={styles.h3}>$email user</Text>

            </View>

            <View style={styles.textInfos}>
              <Text style={styles.h3}>Genre:</Text>
              <Text style={styles.h3}>$genre user</Text>
            </View>

            <View style={styles.textInfos}>
              <Text style={styles.h3}>Orientation:</Text>
              <Text style={styles.h3}>$orientation user</Text>
            </View>
            
          </View>


          <View style={styles.deleteContainer}>
            <TouchableOpacity
            // title="Go to Quiz Orientation"
            // onPress={() => navigation.navigate('QuizOrientation')}
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
          
            <TouchableOpacity
            style={styles.largeBtn}
            title="Go to Deconnection"
            // onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.h3White} >Me Déconnecter</Text>
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
   },

   largeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,

    /* Purple */
    backgroundColor: '#652CB3',
    width: 320,
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