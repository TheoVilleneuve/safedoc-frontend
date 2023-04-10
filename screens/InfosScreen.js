import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InfosScreen({ navigation }) {


    return (
        <View style={styles.container}>
            <FontAwesome name={'angle-left'} size={30} color={'#652CB3'} style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}/>
                <Text style={styles.textContainer}>
                Bienvenue sur SafeDoc.{'\n'}

                Nous contacter :{'\n'}
                Par mail : safedoc.contact@gmail.com{'\n'}{'\n'}

                BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla
                BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla
                BlaBlaBlaBlaBlaBlaBla
                BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla
                BlaBlaBlaBlaBlaBlaBlaBlaBlaBlaBla</Text>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    angleLeft: {
      position: 'absolute',
      top: 20,
      left: 30
    },
    textContainer: {
      textAlign:'justify',
      width: '70%',
      fontFamily: 'Graycliff-CF',
    },
  });