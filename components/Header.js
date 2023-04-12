import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Header({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity title="Go back"  onPress={() => navigation.goBack()}>
            <FontAwesome name={'angle-left'} size={40} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity
            title="Go to Home Orientation"
            onPress={() => navigation.navigate('Home')}
            >
            <Image style={styles.image} source={require('../assets/homeButton.png')} />
            </TouchableOpacity>

            {/* Changer pour rediriger vers User */}
            <TouchableOpacity onPress={() => navigation.navigate('User')}>
            <FontAwesome name={'user'} size={28} color={'white'} title="Go to User" />
            </TouchableOpacity>

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
      height: 65,
      width: '100%',
      paddingLeft: 30,
      paddingRight: 30
    },

    image: {
      height: 55,
      width: 55,
      borderRadius: 10
    }
  });