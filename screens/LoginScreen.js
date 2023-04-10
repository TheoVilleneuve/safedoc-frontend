import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';


export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>

          <Image style={styles.logoSafeDoc} source={require('../assets/logoSafeDoc.png')} />

          <View style={styles.btnContainer}>
          {/* bouton connection */}
            <TouchableOpacity
            style={styles.largeButton}
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

            {/* Accès sans compte */}
            <TouchableOpacity
            style={styles.mediumBtn}
            title="Go with no account"
            onPress={() => navigation.navigate('NoAccount')}
            >
                <Text style={styles.h3}>Accès sans compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    btnContainer: {
      backgroundColor: 'red',
      width: '70%',
    },
    logoSafeDoc: {
      objectFit: 'contain',
      width: '70%',
      top: 20,
    },
    largeBtn: {
      color: 'white',
      backgroundColor: '#2D0861',
      width: '100%',
      height: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mediumBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* Purple /
        backgroundColor: '#652CB3',
        width: 182,
        height: 68,
        borderRadius: 20,
        / Shadow Boutons */
      },
    h3: {
      color: 'white',
    }
  });