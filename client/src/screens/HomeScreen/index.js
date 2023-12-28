import React from "react";
import { View, Dimensions,ScrollView } from "react-native";
import HomeMap from "../../components/HomeMap";
import CovidMessage from "../../components/CovidMessage";
import HomeSearch from "../../components/HomeSearch";


const HomeScreen = (props) => {
  return (
       <View>
        <ScrollView bounces={false}> 
         <View style={{height: Dimensions.get('window').height - 520}}>
           <HomeMap/>
        </View>
        <CovidMessage/>
        <HomeSearch />
        </ScrollView>
       </View>
       
  );
};

export default HomeScreen;