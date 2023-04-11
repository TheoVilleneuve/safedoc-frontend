import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function FindDocResultsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
            >
                <Text>Find Doc Result Screen</Text>
            </TouchableOpacity>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'turquoise',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });