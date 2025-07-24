import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from "@react-native-community/slider";

const CamSettings = ({ onSliderChange, sliderValue }) => {
    return (
        <View>
            <Slider
                style={{ width: 100, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#000000"
                value={sliderValue}
                onValueChange={(value) => onSliderChange(value)} />
        </View>
    );
};

export default CamSettings;
