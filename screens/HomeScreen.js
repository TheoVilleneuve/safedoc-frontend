import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import { useDispatch, useSelector } from 'react-redux';


export default function HomeScreen({ navigation }) {
    // UseSelector pour recuperer user reducer
    const user = useSelector((state) => state.user.value);

  return (
<SafeAreaView style={styles.safeAreaView}>
  
  <ImageBackground 
  source={require('../assets/background-rainbowgradient.png')} 
  style={styles.background}
  >

    <View style={styles.container}>
      <HeaderHome navigation={navigation}/>
        <View style={styles.logoContainer}>
          <Text style={styles.h2}>Bienvenue {user.username}!</Text>
        </View>

        <View style={styles.btnContainer}>
          {/* bouton pour chercher un.e doc */}
          <TouchableOpacity
          style={styles.largeBtn}
          title="Go to FindDoc"
          onPress={() => navigation.navigate('FindDocHome')}
          >
          <Text style={styles.h3}>Trouver un.e doc</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.largeBtn}
          title="Add a doc"
          onPress={() => navigation.navigate('CheckAddDoc')}
          >
          <Text style={styles.h3}>Ajouter un.e doc</Text>
          </TouchableOpacity>

        </View>
      </View>


      <TouchableOpacity
      style={styles.contact}
      title="Go to infos"
      onPress={() => navigation.navigate('Infos')}
      >
      <Text style={styles.h5}>Qui sommes-nous ?</Text>
      </TouchableOpacity>

  </ImageBackground>        
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeAreaView: {
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
    },
    keyContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',

      },
    
    logoContainer: {
      position: 'absolute',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      top: 80,
    },
    
    logoSafeDoc: {
      objectFit: 'contain',
      width: '85%',
      height: 120,
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
    },

    btnContainer: {
      position: 'absolute',
      display: 'flex',
      height: '25%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      bottom: 250,
    },
    largeBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    contact: {
      bottom: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    h5: {
      color: '#2D0861',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 19,
      letterSpacing: 0.25,
      textDecorationLine: 'underline'
    },
    
    h3: {
      color: 'white',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },
  });