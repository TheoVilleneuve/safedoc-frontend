import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';


export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
          {/* bouton connection */}
            <TouchableOpacity
            title="Go to SignIn"
            onPress={() => navigation.navigate('SignIn')}
            >
                <Text>Me connecter</Text>
            </TouchableOpacity>

            {/* bouton insription */}
            <TouchableOpacity
            title="Go to SignUp"
            onPress={() => navigation.navigate('SignUp')}
            >
                <Text>M'inscrire</Text>
            </TouchableOpacity>

            {/* Accès sans compte */}
            <TouchableOpacity
            title="Go with no account"
            onPress={() => navigation.navigate('NoAccount')}
            >
                <Text>Login Screen</Text>
            </TouchableOpacity>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });