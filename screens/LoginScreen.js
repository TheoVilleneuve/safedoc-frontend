import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';


export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image style={styles.logoSafeDoc} source={require('../assets/logoSafeDoc.png')} />
        <Text style={styles.h2}>Niquez-vous les cis-hét !</Text>
      </View>

        <View style={styles.btnContainer}>
          {/* bouton connection */}
          <TouchableOpacity
          style={styles.largeBtn}
          title="Go to SignIn"
          onPress={() => navigation.navigate('SignIn')}
          >
              <Text style={styles.h3}>Me connecter</Text>
          </TouchableOpacity>

          {/* bouton insription */}
          <TouchableOpacity
          style={styles.largeBtn}
          title="Go to SignUp"
          onPress={() => navigation.navigate('SignUp')}
          >
              <Text style={styles.h3}>M'inscrire</Text>
          </TouchableOpacity>

        </View>

          {/* Accès sans compte */}
          <TouchableOpacity
          style={styles.mediumBtn}
          title="Go with no account"
          onPress={() => navigation.navigate('NoAccount')}
          >
              <Text style={styles.h3}>Accès sans compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.contact}
          title="Go to infos"
          onPress={() => navigation.navigate('Infos')}
          >
          <Text style={styles.h5}>Qui sommes-nous ?</Text>
          </TouchableOpacity>        
    </View>
  );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      },
    
    logoContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      top: 100,
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
      fontFamily: 'Greycliff CF',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: 16,
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
      backgroundColor: '#2D0861',
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
    mediumBtn: {
      position: 'absolute',
      bottom: 100,
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
    contact: {
      bottom: 60,
    },
    h5: {
      color: '#2D0861',
      fontFamily: 'Greycliff CF',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 19,
      letterSpacing: 0.25,
      textDecorationLine: 'underline'
    },
    
    h3: {
      color: 'white',
      fontFamily: 'Greycliff CF',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 19,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
    },
  });