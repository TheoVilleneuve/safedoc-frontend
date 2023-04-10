import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'
import QuizHomeScreen from './screens/QuizHomeScreen';
import QuizGenderScreen from './screens/QuizGenderScreen';
import QuizOrientationScreen from './screens/QuizOrientationScreen';
import SignInScreen from './screens/SignInScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
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
    </Stack.Navigator>
  </NavigationContainer>
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
