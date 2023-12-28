import React,{useState} from 'react';
import { View, Dimensions, Text,ScrollView, Alert } from 'react-native';
import { API,graphqlOperation,Auth } from 'aws-amplify';
import RouteMap from '../../components/CovidMessage/RouteMap';
import UberTypes from '../../components/UberTypes';
import { useRoute,useNavigation } from '@react-navigation/native';
import {createOrder} from '../../graphql/mutations';

const SearchResults = (props) => {
  const typeState=useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  
  
  const { orginPlace, destinationPlace } = route.params;  
  const onSubmit=async()=>{
    const [type]=typeState;
    if (!type){
      return;
    }
    try {

      const userInfo =await Auth.currentAuthenticatedUser();
      const date =new Date();
      const input={
        createAt: date.toISOString(),
        type,
        orginLatitude:orginPlace.value.details.geometry.location.lat,
        orginlongitude:orginPlace.value.details.geometry.location.lng,

        destLatitude:destinationPlace.value.details.geometry.location.lat,
        destLongitude:destinationPlace.value.details.geometry.location.lng,

        userId:userInfo.attributes.Sub,
        carId:"",
      }
      const response = await API.graphql(
        graphqlOperation(createOrder, {
          input: input
        })
        
      );
      
      
   
    console.log(response);
    Alert.alert({
      title: " RidyGo",
      message: "Your order has been submitted",
      buttons: [{
        text: "Go Home",
        onPress: () => navigation.navigate('Home'),
      }]
    });
    
    }catch (e){
      console.error(e);
    }

  }
  console.log('Origin Place:', orginPlace);
  console.log('Destination Place:', destinationPlace);

  
  if (!orginPlace || !orginPlace.value || !orginPlace.value.data) {
    console.error('Invalid orginPlace:', orginPlace);
    return <Text>Error: Invalid orginPlace</Text>; 
  }

  return (
    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ScrollView bounces={false}> 
      <View style={{ height: Dimensions.get('window').height - 485 }}>
        
        <RouteMap originPlace={orginPlace} destinationPlace={destinationPlace} />
      </View>

      <View style={{ height: 400 }}>
        <UberTypes typeState={typeState} onSubmit={onSubmit} />
      </View>
      </ScrollView>
    </View>
  );
};

export default SearchResults;
