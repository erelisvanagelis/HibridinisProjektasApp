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
import {Button} from 'react-native-elements/dist/buttons/Button';

import auth from '@react-native-firebase/auth';

export default function SignUpScreen({navigation}) {
  [values, setValues] = useState({
    email: '',
    password: '',
  });

  async function handleAction() {
    try {
      response = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      console.log(response)
      navigation.goBack()
    } catch (error) {
      console.log(error)
      Alert.alert(error.code);
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
      <Button title="Sign Up" onPress={() => handleAction()} />
    </SafeAreaView>
  );
}
