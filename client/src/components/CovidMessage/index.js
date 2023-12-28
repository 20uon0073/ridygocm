import React from "react";
import { View, Text } from "react-native";

import styles from './styles';

const CovidMessage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel only if necessary</Text>
      <Text style={styles.text}>
      For your safety and well-being, Ridy Go  advises users to stay informed about current weather conditions, especially in areas prone to fog or smog. Be cautious while traveling in adverse weather, and consider postponing non-essential trips. Your safety is our priority.
      </Text>
      <Text style={styles.learnMore}>Learn more</Text>
    </View>
  );
};

export default CovidMessage;