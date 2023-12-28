import React from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import styles from './styles.js';
import UberTypeRow from '../UberTypeRow';
import typesData from '../../assets/data/types';

const UberTypes = ({ typeState, onSubmit }) => {
    const [selectedType, setSelectedType] = typeState;

    return (
        <View>
            {typesData.map((type) => (
                <UberTypeRow
                    type={type}
                    key={type.id}
                    isSelected={type.type === selectedType}
                    onPress={() => setSelectedType(type.type)}
                />
            ))}
            <Pressable onPress={onSubmit} style={{
                backgroundColor: 'green',
                padding: 10,
                margin: 10,
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Confirm Ridy
                </Text>
            </Pressable>
        </View>
    );
};

export default UberTypes;
