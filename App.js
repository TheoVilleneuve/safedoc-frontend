import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'
import QuizHomeScreen from './screens/QuizHomeScreen';
import QuizGenderScreen from './screens/QuizGenderScreen';
import QuizOrientationScreen from './screens/QuizOrientationScreen';
import SignInScreen from './screens/SignInScreen';
import InfosScreen from './screens/InfosScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NoAccountScreen from './screens/NoAccountScreen';
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

// Mise en place du reducer
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
 reducer: { user },
});

export default function App() {
  return (
  <Provider store={store}>
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
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>

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
