import {useEffect, useState} from 'react';
import React from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

export default function CameraView() {
  const devices = useCameraDevices()
  // console.log(devices)
  const device = devices.back
  // console.log(devices.back)
  useEffect(() => {
    dealWithPermissions()
  }, []);

  if (device == null) return <LoadingView />;
  return <Camera style={{flex: 1}} device={device} isActive={true} />;
}

function LoadingView() {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}

async function dealWithPermissions() {
  const newCameraPermission = await Camera.requestCameraPermission();
  const newMicrophonePermission = await Camera.requestMicrophonePermission();
}
