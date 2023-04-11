import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Header({ navigation }) {
    return (
        <View style={styles.container}>
            <FontAwesome name={'angle-left'} size={40} color={'white'} title="Go back" onPress={() => navigation.goBack()}/>

            <TouchableOpacity
            title="Go to Home Orientation"
            onPress={() => navigation.navigate('Home')}
            >
            <Text>Home Screen</Text>
            </TouchableOpacity>

            <FontAwesome name={'user'} size={30} color={'white'} title="Go back" onPress={() => navigation.navigate('Home')}/>

        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2D0861',
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      width: '100%',
      paddingLeft: 30,
      paddingRight: 30
    },
  });