import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function SignInScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
            >
                <Text>SignIn Screen</Text>
            </TouchableOpacity>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });