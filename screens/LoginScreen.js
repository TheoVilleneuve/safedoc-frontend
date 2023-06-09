import { TouchableOpacity, StyleSheet, Text, View, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

export default function LoginScreen({ navigation }) {
// Dispatch pour reducer login
const dispatch = useDispatch();

const handlePressNoAccount = () => {
dispatch(login({token: null, username: null}))
navigation.navigate('Home')
}

return (
<SafeAreaView style={styles.safeAreaView}>
  <ImageBackground 
  source={require('../assets/background-rainbowgradient.jpeg')} 
  style={styles.background}
  >

    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image style={styles.logoSafeDoc} source={require('../assets/logoSafeDoc.png')} />
        <Text style={styles.h2}>La santé pour tous.tes!</Text>
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
      onPress={handlePressNoAccount}
      >


        <Text style={styles.h3}>Accès sans compte</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity
    style={styles.contact}
    title="Go to infos"
    // onPress={() => navigation.navigate('Infos')}
    onPress={() => navigation.navigate('TabNavigator')}

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
container: {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',

  },

  background: {
    width: '100%',
    height: '100%',
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
  marginTop: 22,
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
contact: {
  position: 'absolute',
  bottom: 60,
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