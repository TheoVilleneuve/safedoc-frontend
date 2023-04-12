import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function HeaderHome({ navigation }) {
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name={'angle-left'} size={40} color={'white'} title="Go back" />
            </TouchableOpacity> */}
            <View></View>

            <TouchableOpacity
            >
            <Image style={styles.image} source={require('../assets/homeButton.png')} />
            </TouchableOpacity>

            {/* Changer pour rediriger vers User */}
            <TouchableOpacity title="Go to User" onPress={() => navigation.navigate('User')}>
            <FontAwesome name={'user'} size={28} color={'white'}  />
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