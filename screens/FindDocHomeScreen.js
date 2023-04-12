import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function FindDocHomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
            >
                <Text>Find Doc Home Screen</Text>
            </TouchableOpacity>
            
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });