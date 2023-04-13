import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function GeolocalisationScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to Quiz"
            onPress={() => navigation.navigate('QuizHome')}
            >
                <Text>Geolocalisation Screen</Text>
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