import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddSubjectScreen from '../screens/AddSubjectScreen';
import AddStudyHoursScreen from '../screens/AddStudyHoursScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#DC2626' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'StudyMate AI' }} />
        <Stack.Screen name="AddSubject" component={AddSubjectScreen} options={{ title: 'Add Subject' }} />
        <Stack.Screen name="AddStudyHours" component={AddStudyHoursScreen} options={{ title: 'Log Study Hours' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
