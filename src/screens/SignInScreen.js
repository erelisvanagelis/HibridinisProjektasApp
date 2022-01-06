import React from 'react';
import * as constants from '../utils/constants';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useState} from 'react';
// import {Button} from 'react-native-elements/dist/buttons/Button';

import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-elements';

export default function SignInScreen({navigation}) {
  [values, setValues] = useState({
    email: 'testas@gmail.com',
    password: '123456',
  });

  async function handleAction(id) {
    console.log(values)
    switch (id) {
      case 0:
        try {
          response = await auth().signInWithEmailAndPassword(
            values.email,
            values.password,
          );
          navigation.navigate(constants.ROUTE_TABS)
        } catch (error) {
          Alert.alert(error);
        }
        break;
      case 1:
          navigation.navigate(constants.ROUTE_SIGN_UP)
        break;
      default:
        console.log('Case Unhandeled');
    }
  }
  return (
    <SafeAreaView>
      <Input
        placeholder="Email"
        onChangeText={value => setValues({...values, email: value})}
      />
      <Input
        placeholder="Password"
        onChangeText={value => setValues({...values, password: value})}
      />
      <Button title="Go to Sign Up" onPress={() => handleAction(1)} />
      <Button title="Sign In" onPress={() => handleAction(0)} />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button title="Go to Sign Up" onPress={() => handleAction(0)} />
        <Button title="Sign In" onPress={() => handleAction(1)} />
      </View>
    </SafeAreaView>
  );
}
