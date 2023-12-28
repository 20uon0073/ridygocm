/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {StatusBar,PermissionsAndroid,Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { withAuthenticator } from 'aws-amplify-react-native';



import Router from './src/navigation/Root';

navigator.geolocation = require('@react-native-community/geolocation');

import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);


const App: ()=> React$Node =()=>{ 

const androidPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Ridy Go  App location  Permission',
        message:
          'Ridy  Go App needs access to your location ' +
          'so you can take awesome rides.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

useEffect(() => {
  if (Platform.OS==='android'){
    androidPermission();
  } else{
     //ios
     Geolocation.requestAuthorization();
  }

}, []);

  return (
    <> 
      <StatusBar barStyle= 'dark-content'/>  
      <Router />
      </>
  );
};

export default withAuthenticator(App); 
