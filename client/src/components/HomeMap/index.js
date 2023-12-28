import React ,{useState, useEffect}from 'react';
import { Image } from 'react-native'
import MapView ,{PROVIDER_GOOGLE, Marker}from 'react-native-maps';
import { API,graphqlOperation } from 'aws-amplify';
import {listcars} from '../../graphql/queries';

//  import cars from '../../assets/data/cars';


const HomeMap = (props) =>{
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(
            listcars
          )
        );
        setCars(response.data.listcars.items);
      } catch (e) {
        
      }
    };
  
    fetchCars();
  }, []);
  

  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
    
  };

  return (
  
       <MapView
        style={{width: '100%',height: '100%'}}
       provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 32.099641,
          longitude: 74.876527,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
  }}>
    {cars.map((car)=>(
     <Marker
     key={car.id}
     coordinate={{latitude: car.latitude, longitude: car.longitude}}
     
     > 
       <Image 
       style={{
        width:70,
        height:70, 
        resizeMode:'contain',
        transform:[{
          rotate: `${car.heading}deg`
        }]
      }} 
       source={getImage(car.type)}
       />
     </Marker>
    ))}
  </MapView>
  );
};

export default HomeMap;
