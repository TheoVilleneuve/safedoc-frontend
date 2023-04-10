import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to SignUp"
            onPress={() => navigation.navigate('SignUp')}
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