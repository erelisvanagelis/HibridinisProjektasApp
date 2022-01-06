import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import * as constants from '../utils/constants';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import * as methods from '../utils/methods';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Advert from '../components/Advert';

export default function TakenAdvertsScreen({navigation}) {
  const [cities, setCities] = useState([]);
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    firestore()
      .collection('adverts')
      .where('technicianId', '==', auth().currentUser.uid)
      .where('status', '==', 'progress')
      .onSnapshot(onResult, onError);
  }, []);

  useEffect(() => {
    const array = [];
    firestore()
      .collection('cities')
      .get()
      .then(callback => {
        callback.docs.map(document => {
          const obj = {
            ...document.data(),
            id: document.id,
          };
          console.log(obj);
          array.push({
            ...obj,
          });
        });
        console.log(array);
        setCities(array);
        console.log('cities');
        console.log(cities);
      });
  }, []);

  function onResult(querySnapshot) {
    const array = [];
    querySnapshot.forEach(documentSnapshot => {
      console.log('Advert ID: ', documentSnapshot.id, documentSnapshot.data());
      array.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });
    console.log('Got Users collection result.');
    setAdverts(array);
    console.log(array);
  }

  function onError(error) {
    Alert.alert(error);
    console.error(error);
  }

  function handleAction(item) {
    navigation.navigate(constants.ROUTE_PROCESS_ADVERTS, {advert: item});
  }

  function renderItem({item}) {
    return (
      <Advert
        advert={item}
        buttonTitle="Review"
        handleAction={() => handleAction(item)}
      />
    );
  }

  return (
    <SafeAreaView>
      {adverts.length == 0 ? (
        <Text>None Selected</Text>
      ) : (
        <FlatList
          data={adverts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}
