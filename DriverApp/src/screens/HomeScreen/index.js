import React, { useEffect, useState } from 'react';
import { View ,Text, Dimensions,Pressable,onGoPress, Image} from 'react-native';  
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Entypo from'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles  from './styles';
import NewOrderPopup from '../../components/NewOrderPopup';

import {Auth, API,graphqlOperation } from 'aws-amplify';
import { getCar,listOrders } from '../../graphql/queries';
import { updateCar, updateOrder } from '../../graphql/mutations';



const origin = {latitude: 32.1014067, longitude: 74.8799518};
const destination = {latitude: 32.101606, longitude: 74.860951};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDeJpCLAWlRgFul8TvXGiLP8lp1p5Mf0HQ';

const HomeScreen = () => {
  const [car, setCar] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null)
  const [newOrders, setNewOrders] = useState([]);

  const fetchCar = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const carData = await API.graphql(
        graphqlOperation(getCar, { id: userData.attributes.sub }),
      );
      setCar(carData.data.getCar);
    } catch (e) {
      console.error(e);
    }
  }

  const fetchOrders = async () => {
    try {
        const ordersData = await API.graphql(
          graphqlOperation(
            listOrders,
            { filter: { status: { eq: 'NEW'}}}
            )
        );
        setNewOrders(ordersData.data.listOrders.items);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCar();
    fetchOrders();
  }, []);

  const onDecline = () => {
    setNewOrders(newOrders.slice(1));
  }

  const onAccept = async (newOrder) => {
    try {
      const input = {
        id: newOrder.id,
        status: "PICKING_UP_CLIENT",
        carId: car.id
      }
      const orderData = await API.graphql(
        graphqlOperation(updateOrder, { input })
      )
      setOrder(orderData.data.updateOrder);
    } catch (e) {

    }

    setNewOrders(newOrders.slice(1));
  }

  const onGoPress = async () => {
    // Update the car and set it to active
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        isActive: !car.isActive,
      }
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, { input })
      )
      setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  }

  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate
    // Update the car and set it to active
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        latitude,
        longitude,
        heading,
      }
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, { input })
      )
      setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  }

  const onDirectionFound = (event) => {
    console.log("Direction found: ", event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      })
    }
  }

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      }
    }
    return {
      latitude: order.originLatitude,
      longitude: order.oreiginLongitude,
    }
  }

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center', backgroundColor: '#cb1a1a', width: 200, padding: 10,  }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>COMPLETE {order.type}</Text>
          </View>
          <Text style={styles.bottomText}>{order.user.username}</Text>
        </View>
      )
    }

    if (order && order.pickedUp) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={{ backgroundColor: '#235536', marginHorizontal: 10, width: 30, height: 30, alignItems:'center', justifyContent: 'center', borderRadius: 20}}>
              <FontAwesome name={"user"} color={"Yellow"} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Dropping off {order?.user?.username}</Text>
        </View>
      )
    }

    if (order) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={{ backgroundColor: '#235536', marginHorizontal: 10, width: 30, height: 30, alignItems:'center', justifyContent: 'center', borderRadius: 20}}>
              <FontAwesome name={"user"} color={"white"} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order?.user?.username}</Text>
        </View>
      )
    }
    if (car?.isActive) {
      return (
        <Text style={styles.bottomText}>You're online</Text>
      )
    }
    return (<Text style={styles.bottomText}>You're offline</Text>);
  }

  return (
    <View>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
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
            origin={{
              latitude: car?.latitude,
              longitude: car?.longitude,
            }}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={8}
            strokeColor="black"
          />
        )}
      </MapView>

      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{ color: 'whit' }}>Rs</Text>
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
          {car?.isActive ? 'END' : 'GO'}
        </Text>
      </Pressable>

      <View style={styles.bottomContainer}>
      <FontAwesome name={"sliders"}size={30} color="#4a4a4a" />
          {renderBottomTitle()}
          <Octicons name={"multi-select"} size={30} color="#4a4a4a" />
      </View>

      {newOrders.length > 0 && !order && <NewOrderPopup
        newOrder={newOrders[0]}
        duration={2}
        distance={0.5}
        onDecline={onDecline}
        onAccept={() => onAccept(newOrders[0])}
      />}
    </View>
  );
};

export default HomeScreen;