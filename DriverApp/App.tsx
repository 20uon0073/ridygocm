/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { API, Amplify, Auth ,graphqlOperation, Hub } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Authenticator } from 'aws-amplify-react-native';
import { getCarId } from './src/graphql/queries';
import { createCar } from './src/graphql/mutations';


Amplify.configure(awsconfig);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const updateUserCar=async()=>{
      // get authenticated User

      const authenticatedUser=await Auth.currentAuthenticatedUser({bypassCache:true});
      if (!authenticatedUser){
        return;
      }


      // check if the user has already a car 
        const carData=await API.graphql(
          graphqlOperation(
            getCarId,
            {id: authenticatedUser.attributes.sub }
          )
        )

        if (!!carData.data.getCar){
          console.log("user already has a car assigned ");
          return;
        }
 
      // if not ,create a new car for the user

      const newCar={
        id:authenticatedUser.attributes.sub,
        type:'RidyX',
        userId:authenticatedUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(
        createCar,{input:newCar}

      ))

    };

   updateUserCar();
  },[])
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        {isAuthenticated ? (
          <HomeScreen />
        ) : (
          <Authenticator />
        )}
      </SafeAreaView>
    </>
  );
};

export default App;
