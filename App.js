import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
//IMPORTATION DES SCREENS : 
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'
import QuizHomeScreen from './screens/QuizHomeScreen';
import QuizGenderScreen from './screens/QuizGenderScreen';
import QuizOrientationScreen from './screens/QuizOrientationScreen';
import SignInScreen from './screens/SignInScreen';
import InfosScreen from './screens/InfosScreen';
import NoAccountScreen from './screens/NoAccountScreen';
import HomeScreen from './screens/HomeScreen';
import FindDocHomeScreen from './screens/FindDocHomeScreen';
import UserScreen from './screens/UserScreen';
import DoctorInfoScreen from './screens/DoctorInfoScreen';
import GeolocalisationScreen from './screens/GeolocalisationScreen';
import CheckAddDocScreen from './screens/CheckAddDocScreen';
import AddDocScreen from './screens/AddDocScreen';
import QuizTagsScreen from './screens/QuizTagsScreen';
import QuizTagRecoScreen from './screens/QuizTagRecoScreen';
import ThankYouScreen from './screens/ThankYouScreen';

// IMPORTATION COMPOSANTS :
import Header from './components/Header';

//ajout de la typo Graycliff-CT
import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// Mise en place du reducer
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import doctor from './reducers/doctor';
import docplaces from './reducers/docplaces';

const store = configureStore({
 reducer: { user, doctor, docplaces },
});

export default function App() {

  //Ajout de la typo Graycliff-CT 
  const [fontsLoaded] = useFonts({
    'Greycliff-Bold': require('./assets/fonts/GreycliffCF-Bold.ttf'),
    'Greycliff-Regular': require('./assets/fonts/GreycliffCF-Regular.ttf'),
    'Greycliff-Light': require('./assets/fonts/GreycliffCF-Light.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
  <StoreProvider store={store}>
          <PaperProvider>
    <View onLayout={onLayoutRootView}></View>

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Page Login */}
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Parcours SignUp */}
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="QuizHome" component={QuizHomeScreen} />
      <Stack.Screen name="QuizGender" component={QuizGenderScreen} />
      <Stack.Screen name="QuizOrientation" component={QuizOrientationScreen} />
      {/* Parcours SignIn */}
      <Stack.Screen name="SignIn" component={SignInScreen} />
      {/* Parcours NoAccount */}
      <Stack.Screen name="NoAccount" component={NoAccountScreen} />
      {/* Parcours SignIn */}
      <Stack.Screen name="Infos" component={InfosScreen} />
      {/* Home : Écran d'accueil */}
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* User */}
      <Stack.Screen name="User" component={UserScreen} />
      {/* FindDoc */}
      <Stack.Screen name="FindDocHome" component={FindDocHomeScreen} />
      {/* Doctor */}
      <Stack.Screen name="Doctor" component={DoctorInfoScreen} />
      <Stack.Screen name="Geolocalisation" component={GeolocalisationScreen} />
      <Stack.Screen name="CheckAddDoc" component={CheckAddDocScreen} />
      <Stack.Screen name="AddDoc" component={AddDocScreen} />
      <Stack.Screen name="QuizTags" component={QuizTagsScreen} />
      <Stack.Screen name="QuizRecoTags" component={QuizTagRecoScreen} />
      <Stack.Screen name="ThankYou" component={ThankYouScreen} />
      {/* Import composants */}
      
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>

   </StoreProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
