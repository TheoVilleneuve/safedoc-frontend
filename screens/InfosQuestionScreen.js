import { TouchableOpacity, StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InfosQuestionScreen({ navigation }) {
  
  //ENVOI DE MAIL A l'ADRESSE DE CONTACT
    const handleEmailLink = () => {
      Linking.openURL('mailto:safedoc.contact@gmail.com');
    }

    const handleClick = () => {
      navigation.goBack()
    }

    return (
      <SafeAreaView 
      style={styles.container}
      >
        <ImageBackground 
        source={require('../assets/background-rainbowgradient.png')} 
        style={styles.background}
        >
            <TouchableOpacity style={styles.angleLeft} title="Go back" onPress={handleClick}>
              <FontAwesome name={'angle-left'} size={30} color={'#652CB3'}/>
            </TouchableOpacity>

              <ScrollView>
                <Text style={styles.textContainer}>
                  
                <Text style={styles.textTitle}>
                  Bienvenue sur SafeDoc
                </Text> 
              
                {'\n'}
              

                  Pour nous contacter :{'\n'}{'\n'}
                  Par mail :
                  </Text>
                  <TouchableOpacity 
                  onPress={handleEmailLink}
                  style={styles.linkContainer}>
                  <Text style={styles.linkToEmail}>safedoc.contact@gmail.com</Text>
                  </TouchableOpacity>

                  <View style={styles.invisibleView}></View>

                </ScrollView>
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
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

    angleLeft: {
      zIndex: 99,
      position: 'absolute',
      left: 30
    },

    textContainer: {
      paddingTop: '30%',
      textAlign:'justify',
      width: 320,
      fontFamily: 'Greycliff-Light',
    },
    textTitle: {
      textAlign:'center',
      width: 320,
      fontSize: 20,
      fontFamily: 'Greycliff-Bold',
    },

    regards: {
      textAlign: 'left',
      width: 320,
      fontSize: 20,
      fontFamily: 'Greycliff-Bold',
    },

    linkToEmail: {
      textDecorationLine: 'underline'
    },

    linkContainer: {
      height: 20
    },

    invisibleView: {
      height: 80,
    },
});