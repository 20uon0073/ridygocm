import React from "react";
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDeJpCLAWlRgFul8TvXGiLP8lp1p5Mf0HQ'; 

const RouteMap = ({ originPlace, destinationPlace }) => {
 
  console.log('Received Origin:', originPlace);
  console.log('Received Destination:', destinationPlace);

 
  const getCoordinates = (place) => {
    if (!place || !place.value || !place.value.details || !place.value.details.geometry || !place.value.details.geometry.location) {
      console.error('Invalid origin or destination data:', place);
      return null;
    }

    return {
      latitude: place.value.details.geometry.location.lat,
      longitude: place.value.details.geometry.location.lng,
    };
  };


  const originLoc = getCoordinates(originPlace);
  const destinationLoc = getCoordinates(destinationPlace);

  
  console.log('Origin Coordinates:', originLoc);
  console.log('Destination Coordinates:', destinationLoc);


  if (!originLoc || !destinationLoc) {
    return (
      <View>
        <Text>Error: Invalid origin or destination data.</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 32.101406,
        longitude: 74.879951,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={9}
        strokeColor="black"
      />
      <Marker
        coordinate={originLoc}
        title={'Origin'}
      />
      <Marker
        coordinate={destinationLoc}
        title={"Destination"}
      />
    </MapView>
  );
};

export default RouteMap;
