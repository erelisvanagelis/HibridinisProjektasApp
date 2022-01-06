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
import CameraView from '../components/CameraView';

export default function ProcessAdvertScreen({route}) {
  const {advert} = route.params;
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [image, setImage] = useState(null);
  const [option, setOption] = useState(null);

  useEffect(() => {
    const array = []
    firestore()
      .collection('services')
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
        setServices(array)
        setCurrentService(services[0])
        console.log('services');
        console.log(services);
      });
  }, []);

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
      {currentService !== null ? <CameraView />: null }
    </SafeAreaView>
  );
}
