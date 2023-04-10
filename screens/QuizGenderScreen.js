import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function QuizGenderScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to Quiz Orientation"
            onPress={() => navigation.navigate('QuizOrientation')}
            >
                <Text>Quiz Gender Screen</Text>
            </TouchableOpacity>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });