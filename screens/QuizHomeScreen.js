import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function QuizHomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to Quiz Gender"
            onPress={() => navigation.navigate('QuizGender')}
            >
                <Text>Quiz Home Screen</Text>
            </TouchableOpacity>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'purple',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });