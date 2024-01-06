/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import  Amplify,{
  Auth,
  API,
  graphqlOperation,
}  from 'aws-amplify';
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { getCarId } from './src/graphql/queries';


Amplify.configure(config);

const App: React.FC = () => {

  useEffect(()=>{
    const updateUserCar=async()=>{
      // get Authenicated User


      // check if the user has already a car 


      // if not ,create a new car for the user

    };

   updateUserCar();
  },[])
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <HomeScreen />
      </SafeAreaView>
    </>
  );
};

export default  withAuthenticator(App);
