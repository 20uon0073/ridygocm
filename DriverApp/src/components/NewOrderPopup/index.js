import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import styles from './styles';
import AntDesign from  'react-native-vector-icons/AntDesign';
import FontAwesome from  'react-native-vector-icons/FontAwesome';

const NewOrderPopup = ({newOrder,onAccept,onDecline,duration,distance}) => {

  return (
    <View style={styles.root}>

      <Pressable onPress={onDecline} style={styles.declineButton}>
        <Text style={styles.declineText}>Decline</Text>

      </Pressable>
     <Pressable onPress={onAccept} style={styles.popupContainer}>

      <View style={styles.row}>
        <Text style={styles.uberType}> {newOrder.type}</Text>
        <View style={styles.userBg}>
            <FontAwesome name={"user"} color={"white"} size={35}/>
        </View>
        <Image source={{}}/>
        <Text style={styles.uberType}> 
            <AntDesign name={"star"} size={18}/>
            {newOrder.user.rating}
        </Text>
      </View>
      <Text style={styles.minutes}> {duration} min</Text>
      <Text style={styles.distance}> {distance} mi</Text>
      </Pressable>
    </View>
  )
}

export default NewOrderPopup;