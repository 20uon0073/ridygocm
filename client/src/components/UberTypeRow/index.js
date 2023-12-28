import { View, Image, Text,Pressable } from 'react-native'
import React from 'react'
import styles from './styles';

import Ionicons from "react-native-vector-icons/Ionicons";


const UberTypeRow=(props)=>{
   const {type, onPress,isSelected}=props;

   const getImage = () => {
    if (type.type === 'RidyX') {
      return require('../../assets/images/UberX.jpeg');
    }
    if (type.type === 'RidyMini') {
      return require('../../assets/images/Comfort.jpeg');
    }
    return require('../../assets/images/UberXL.jpeg');
  }
  return (
    <Pressable
     onPress={onPress}
     style={[styles.container, {backgroundColor: isSelected? '#efefefef':'white',
    }]}
     >
      <Image
      style={styles.image}
      source={getImage()}
      />
      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type.type}{''}
          <Ionicons name={'person'} size={16}/>
          3
        </Text>
        <Text style={styles.time}>
          8:30 PM Drop off
      </Text>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'pricetag'} size={18} color={'#42d742'}/> 
        <Text style={styles.price}>
          est.RS{type.price}
        </Text>

      </View>
    </Pressable>
  );
};
export default UberTypeRow;