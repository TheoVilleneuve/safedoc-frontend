import { TouchableOpacity, StyleSheet, Text, View, Image, Modal, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function HeaderHome({ navigation }) {
   // Dispatch pour reducer 
    const dispatch = useDispatch();

    // Etat local pour Modal
    const [modalVisible, setModalVisible] = useState(false);

    // UseSelector pour recuperer user reducer pour conditionner affichage different du header si user is logged ou pas logged
    const user = useSelector((state) => state.user.value);

    // Fonction Retour page Login
    const handlePressLogin = () => {
      setModalVisible(!modalVisible)
      navigation.navigate('SignUp')
    }

    // modal contenu
    let modalContent
    if (modalVisible){
      modalContent = 
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>L'accès à la page Profil Utilisateur.rice est reservé aux membres enregistré.e.s.</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Continuer sans s'enregistrer</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handlePressLogin}>
            <Text style={styles.textStyle}>Aller à la page 'M'enregister'</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    }

    // Fonction press conditionné au reducer et au token (pour le clic sur bouton user)
    const handlePress = () => {
      if (user.token){
        navigation.navigate('User')
      } else {
        setModalVisible(true)
      }
    }

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
            <TouchableOpacity title="Go to User" onPress={handlePress}>
            <FontAwesome name={'user'} size={28} color={'white'}  />
            </TouchableOpacity>
            {modalContent}
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
    },

    // Style Modal
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2D0861',
      marginBottom: 20
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Greycliff-Bold',
      fontWeight: 600,
      fontSize: 14,
    },
    modalText: {
      fontFamily: 'Greycliff-Bold',
      fontSize: 14,
      marginBottom: 20,
      textAlign: 'center',
  }, 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },


});