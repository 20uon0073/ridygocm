import React, { useEffect, useState } from 'react';
import { View ,Text, Dimensions,Pressable,onGoPress} from 'react-native';  
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Entypo from'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles  from './styles';
import NewOrderPopup from '../../components/NewOrderPopup';

const origin = {latitude: 32.101406, longitude: 74.879951};
const destination = {latitude: 32.101606, longitude: 74.860951};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDeJpCLAWlRgFul8TvXGiLP8lp1p5Mf0HQ';

const HomeScreen = () => {
   const [isOnline,setIsOnline]=useState(false);
   const [myPosition, setMyPosition ]=useState(null);

   const [order, setOrder]=useState(null)
   const [newOrder,setNewOrder]=useState({
    id:'1',
    type:'RidyX',
    originLatitude: 32.0951163,
    originLongitude: 74.8827961,

    destLatitude: 32.0960264,
    destLongitude: 74.8678878,

   user:{
    rating :4.8,
    name: 'Ali',
   }
   })
   const onDecline=()=>{
    setNewOrder(null);
   }
   
   const onAccept=(newOrder)=>{
    setOrder(newOrder);
    setNewOrder(null);

   }

   const onGoPress =()=>{
    setIsOnline(!isOnline);
   }
   const onUserLocationChange=(event)=>{
  
    setMyPosition(event.nativeEvent.coordinate);
   }
   const onDirectionFound=(event)=>{
    console.log("Direction Found",event);
    if (order){
      setOrder({
        ...order,
        distance:  event.distance,
        duration:  event.duration,
        pickedUp:order.pickedUp || event.distance <0.2,
        isFinished:order.pickedUp && event.distance <0.2,
      })
    }
   }

 const getDestination =()=>{
  if (order && order.pickedUp){
    return {
      latitude: order.destLatitude,
      longitude: order.destLongitude,
    }
  }
  return{
    latitude: order.originLatitude,
    longitude: order.originLongitude,
  }
 }



 const renderBottomTitle = () => {
  if (order && order.isFinished) {
    return (
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#cb1a1a',
            width: 200,
            padding: 10,
          }}>
          <Text style={{color:'white',fontWeight:'bold'}}> Complete {order.type}</Text>
        </View>
        <Text style={styles.bottomText}>{order.user.name} </Text>
      </View>
    );
  }

  if (order && order.pickedUp) {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text> {order.duration ? order.duration.toFixed(1) : '?'} </Text>
          <View
            style={{
              backgroundColor: '#235536',
              marginHorizontal: 10,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <FontAwesome name={'user'} color={'Yellow'} size={20} />
          </View>
          <Text>{order.distance ? order.distance.toFixed(1) : '?'} Km</Text>
        </View>
        <Text style={styles.bottomText}> Dropping off {order.user.name} </Text>
      </View>
    );
  }

  if (order) {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text> {order.duration ? order.duration.toFixed(1) : '?'} </Text>
          <View
            style={{
              backgroundColor: '#235536',
              marginHorizontal: 10,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <FontAwesome name={'user'} color={'white'} size={20} />
          </View>
          <Text>{order.distance ? order.distance.toFixed(1) : '?'} Km</Text>
        </View>
        <Text style={styles.bottomText}> Picking Up {order.user.name} </Text>
      </View>
    );
  }

  if (isOnline) {
    return <Text style={styles.bottomText}> You are Online </Text>;
  }

  return <Text style={styles.bottomText}> You are Offline </Text>;
};

   
  return (
    <View>
      <MapView
        style={{width:'100%' ,height:Dimensions.get('window').height-150}}
        provider={PROVIDER_GOOGLE} 
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 32.101406,
          longitude: 74.879951,
          latitudeDelta: 0.025,
          longitudeDelta: 0.035,
        }}
      > 
      {order && (
                  <MapViewDirections
                  origin={myPosition}
                  onReady={onDirectionFound}
                  destination={getDestination()}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={9}
                  strokeColor="black"
              />
      )}

        </MapView>
        <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{ color: 'white' }}>Rs</Text>
          {' '}
          0.00
        </Text>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 10, right: 10}]}>
        <Octicons name={"search"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 110, left: 10}]}>
        <MaterialIcons name={"safety-check"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 110, right: 10}]}>
        <Ionicons name={"chatbox-ellipses"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={onGoPress}
        style={styles.goButton}>
        <Text style={styles.goText}>
          {
            isOnline ? 'END' :'GO'
          }
          </Text>
        </Pressable>
        <View style={styles.bottomContainer}>
          <FontAwesome name={"sliders"}size={30} color="#4a4a4a" />

               {renderBottomTitle()}
          <Octicons name={"multi-select"} size={30} color="#4a4a4a"  />
        </View>
       {newOrder && <NewOrderPopup 
        newOrder={newOrder}
        duration={2}
        distance={0.5}
        onDecline={onDecline}
        onAccept={()=>onAccept(newOrder)}
        />}
    </View>
  );
};

export default HomeScreen;
