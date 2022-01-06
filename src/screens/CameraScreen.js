/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
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
 
 export default function CameraScreen() {
   return (
    <SafeAreaView>
        <Text>Camera Screen</Text>
    </SafeAreaView>
   );
 }
 

// const cameraPermission = await Camera.getCameraPermissionStatus()
// const microphonePermission = await Camera.getMicrophonePermissionStatus()

// if(cameraPermission == 'not-determined')
