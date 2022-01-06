/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import * as constants from './src/utils/constants';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewAdvertsScreen from './src/screens/NewAdvertsScreen';
import TakenAdvertsScreen from './src/screens/TakenAdvertsScreen';
import CompletedAdvertsScreen from './src/screens/CompletedAdvertsScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import CameraScreen from './src/screens/CameraScreen';
import ProcessAdvertScreen from './src/screens/ProcessAdvertScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function tabs() {
    return (
      <Tab.Navigator initialRouteName={constants.ROUTE_TAKEN_ADVERTS}>
        <Tab.Screen
          name={constants.ROUTE_NEW_ADVERTS}
          component={NewAdvertsScreen}
        />
        <Tab.Screen
          name={constants.ROUTE_TAKEN_ADVERTS}
          component={TakenAdvertsScreen}
        />
        <Tab.Screen
          name={constants.ROUTE_COMPLETED_ADVERTS}
          component={CompletedAdvertsScreen}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={constants.ROUTE_SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={constants.ROUTE_SIGN_UP} component={SignUpScreen} />
        <Stack.Screen name={constants.ROUTE_CAMERA} component={CameraScreen} />
        <Stack.Screen
          name={constants.ROUTE_PROCESS_ADVERTS}
          component={ProcessAdvertScreen}
        />
        <Stack.Screen name={constants.ROUTE_TABS} component={tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
