
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faTrashCan, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import user from '../reducers/user';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import Tag from '../components/Tag';

export default function DoctorInfoScreen({ navigation }) {

    const doctolibPress = () => {
        Linking.openURL('https://www.doctolib.fr');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.keyContainer}>
        <Header navigation={navigation}/>
          <View style={styles.userLogoContainer}>
            <FontAwesomeIcon  icon={ faUserDoctor } size={60} color={'black'}  />

            <View style={styles.userNameContainer}>
              <Text style={styles.h1}>$ Dr Domingay</Text>
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

          <View style={styles.textInfosContainer}>
            <View style={styles.textInfos}>
              <Text style={styles.h3}>Adresse:</Text>
              <Text style={styles.h3}>$69 rue du fou, 
                       75 001 Paris</Text>

            </View>

            <View style={styles.textInfos}>
              <Text style={styles.h3}>Téléphone:</Text>
              <Text style={styles.h3}>$066666666</Text>
            </View>

            <View style={styles.textInfos}>
              <Text style={styles.h3}>Email:</Text>
              <Text style={styles.h3}>$Walay@gmail.com</Text>
            </View>
            
          </View>

          <Button 
          icon="link" 
          mode="elevated" 
          onPress={doctolibPress}
          contentStyle={{width: 320, borderRadius: 20, }}
          labelStyle={{color: '#2D0861', fontFamily: 'Greycliff-Bold', fontSize: 16, letterSpacing: 0.25, fontWeight: 600
        }}
          >
          Lien Doctolib
          </Button>

          <Text style={styles.h5}>Recommandé.e par: $Nombre membres</Text>

          <View style={{flexDirection: 'row'}}>
            <ScrollView contentContainerStyle={styles.tagsContainer} horizontal={true}>
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <Tag />
              <Tag />
            </ScrollView>
          </View>

          <TouchableOpacity
            style={styles.mediumBtn}
            title="Go to Login"
            // onPress={logoutPress}
            >
            <Text style={styles.h3White} >Recommander</Text>
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
    marginBottom: 30,
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
    marginRight: 20,
  },

  tagsContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
  }
  });