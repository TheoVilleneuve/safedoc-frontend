import { TouchableOpacity, StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InfosScreen({ navigation }) {
  
  //ENVOI DE MAIL A l'ADRESSE DE CONTACT
    const handleEmailLink = () => {
      Linking.openURL('mailto:safedoc.contact@gmail.com');
    }

    return (
      <SafeAreaView 
      style={styles.container}
      >
        <ImageBackground 
        source={require('../assets/background-rainbowgradient.png')} 
        style={styles.background}
        >
            <FontAwesome name={'angle-left'} size={30} color={'#652CB3'} style={styles.angleLeft} title="Go back" onPress={() => navigation.goBack()}/>
                
              <ScrollView>
                <Text style={styles.textContainer}>
                  
                <Text style={styles.textTitle}>
                  Bienvenue sur SafeDoc
                </Text> 
              
                {'\n'}
                {'\n'}L’application mobile dédiée à la recherche de médecins friendly pour la communauté LGBTQIA+. Nous avons créé cette application afin de fournir à notre communauté des informations précises et fiables pour trouver des médecins et des professionnel.les de santé qui sont inclusif.ve.s et respectueux.ses de l'identité de genre et de l'orientation sexuelle de chacun.e.
  Malheureusement, la communauté subit encore de nombreuses discriminations dans de nombreux aspects de la vie, y compris dans le domaine de la santé. Selon une étude de l'Institut national de la santé et de la recherche médicale (INSERM), ces personnes sont plus susceptibles d'éviter les soins de santé en raison de la peur d'être maltraité.es ou discriminé.es. Les statistiques montrent que 1 personne LGBTQIA+ sur 5 a déjà été discriminée dans le domaine de la santé.
  C'est pourquoi notre application mobile est là pour aider la communauté à trouver facilement des médecins qui sont formés et informés sur les questions LGBTQIA+. Grâce à notre base de données, les utilisateur.ice.s peuvent recommander des médecins inclusif.ve.s et partager leurs expériences avec la communauté. Cette application a pour but de faciliter l'accès aux soins pour tou.te.s, indépendamment de l'identité de genre et de l'orientation sexuelle.
  Nous sommes convaincus que SafeDoc peut faire une réelle différence dans la vie des personnes LGBTQIA+. Nous espérons que vous apprécierez l'expérience utilisateur de notre application et que vous trouverez des médecins qui vous respectent et vous soutiennent tout au long de votre parcours de soins.
    
  {'\n'}{'\n'}
  <Text style={styles.textTitle}>Notre politique de confidentialité des médecins</Text> 
  {'\n'}{'\n'}
  Nous souhaitons vous informer que les médecins référencé.e.s sur notre application seront trié.e.s sur plusieurs niveaux de référencement en fonction de leur souhait d'apparaître à plus ou moins grande échelle.{'\n'}
  Certains médecins seront accessibles à tout le monde, y compris les personnes sans compte sur l'application. D'autres seront exclusivement réservé.e.s aux membres inscrits sur l'application. Enfin, certains médecins ne s'afficheront pas publiquement sur notre application, mais pourront être partagé.e.s par e-mail.{'\n'}
  Nous avons mis en place ces différents niveaux de référencement pour répondre aux besoins et aux préférences de chacun. Nous respectons la volonté de certain.e.s médecins de ne pas être largement référencé.e.s, mais nous souhaitons également offrir une liste exhaustive de professionnels de santé pour répondre aux besoins de notre communauté.{'\n'}
  Nous tenons à souligner que tous.tes les médecins référencé.e.s sur notre application ont été recommandé.e.s par la communauté LGBTQIA+ et ont été évalué.e.s pour leur respect et leur soutien envers la communauté. Nous espérons que vous trouverez les informations que vous cherchez et que notre application vous sera utile.{'\n'}{'\n'}
  N'hésitez pas à nous contacter si vous avez des questions ou des commentaires.{'\n'}{'\n'}
  <Text style={styles.regards}>Cordialement,</Text>{'\n'}{'\n'}
  L'équipe de notre application mobile pour la communauté LGBTQIA+.{'\n'}{'\n'}

                  Pour nous contacter :{'\n'}{'\n'}
                  Par mail :
                  </Text>
                  <TouchableOpacity 
                  onPress={handleEmailLink}
                  style={styles.linkContainer}>
                  <Text style={styles.linkToEmail}>safedoc.contact@gmail.com</Text>
                  </TouchableOpacity>

                  <View style={styles.invisibleView}></View>

                </ScrollView>
            </ImageBackground>         
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
      alignItems: 'center',   
  },
  background: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    angleLeft: {
      position: 'absolute',
      top: 20,
      left: 30
    },
    textContainer: {
      paddingTop: '30%',
      textAlign:'justify',
      width: 320,
      fontFamily: 'Greycliff-Thin',
    },
    textTitle: {
      textAlign:'center',
      width: 320,
      fontSize: 20,
      fontFamily: 'Greycliff-Bold',
    },
    regards: {
      textAlign: 'left',
      width: 320,
      fontSize: 20,
      fontFamily: 'Greycliff-Bold',
    },
    linkToEmail: {
      textDecorationLine: 'underline'
    },
    linkContainer: {
      height: 20
    },
    invisibleView: {
      height: 80,
    },
});