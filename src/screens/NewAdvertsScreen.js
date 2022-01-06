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

export default function NewAdvertsScreen() {
  const [cities, setCities] = useState([]);
  const [adverts, setAdverts] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null)

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

  useEffect(() => {
    firestore()
      .collection('adverts')
      .where('status', '==', 'pending')
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

  function onError(error) {
    Alert.alert(error);
    console.error(error);
  }

  function renderItem({item}) {
    return (
      <Advert
        advert={item}
        buttonTitle="Take Order"
        handleAction={() => handleAction(item)}
      />
    );
  }

  function handleAction(advert) {
    firestore()
      .collection('adverts')
      .doc(advert.id).set({
        ...advert,
        status: 'progress',
        technicianId: auth().currentUser.uid
      })
  }

  return (
    <SafeAreaView>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onSelectItem={setSelectedItem}
        dataSet={cities}
      />
      <FlatList
        data={methods.filterByCity(adverts, selectedItem)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
