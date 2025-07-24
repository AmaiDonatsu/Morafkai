import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, FlatList } from 'react-native';

const CamZoomSlider = ({ zoomLevel, onZoomChange }) => {
    const zoomScale = 1;
    const zoomStep = 0.1;
    const zoomLevels = Array.from({ length: 11 }, (_, i) => i * zoomStep);
   

    return (
        <View>
            <FlatList
                data={zoomLevels}
                keyExtractor={(item) => item.toString()}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.zoomButton, { opacity: item === zoomLevel ? 1 : 0.5 }]}
                        onPress={() => onZoomChange(item)}
                    >
                        <Text style={styles.zoomText}>{item.toFixed(1)}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text>ZoomLevel {zoomLevel}</Text>
        </View>
    );
};

export default CamZoomSlider;

const styles = StyleSheet.create({
    zoomButton: {},
});

