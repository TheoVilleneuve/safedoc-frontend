import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function SignUpScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to Quiz"
            onPress={() => navigation.navigate('QuizHome')}
            >
                <Text>SignUp Screen</Text>
            </TouchableOpacity>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });