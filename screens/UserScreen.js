import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';


export default function UserScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
        <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyContainer}>
        <Header navigation={navigation}/>

            <TouchableOpacity
            title="Go to Quiz Orientation"
            onPress={() => navigation.navigate('QuizOrientation')}
            >
                <Text>User Screen</Text>
            </TouchableOpacity>

        </View>
        </SafeAreaView>
      );

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2D0861',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      // alignItems: 'center',
    },

    keyContainer: {
      backgroundColor: 'white',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
  });