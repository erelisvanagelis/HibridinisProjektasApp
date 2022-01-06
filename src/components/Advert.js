import {Link} from '@react-navigation/native';
import React from 'react';
import {Button, Card} from 'react-native-elements';
import {Text} from 'react-native-elements';
import { Alert, Linking, StyleSheet, View } from "react-native";
// import {Button} from 'react-native-elements/dist/buttons/Button';

export default function Advert({advert, buttonTitle, handleAction}) {
  loadInBrowser = () => {
    Linking.openURL(advert.url).catch(err =>
      console.error("Couldn't load page", err),
    );
  };
  return (
    <Card>
      <Card.Title>
        <Button title="Link To Advert" onPress={loadInBrowser} />
      </Card.Title>
      <Card.Divider />
      <Text>Comment: {advert.comment}</Text>
      <Card.Divider />
      <Text>Price: {advert.price}</Text>
      <Card.Divider />
      <Button title={buttonTitle} onPress={handleAction} />
    </Card>
  );
}
