import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PhotoThumbnail = ({ photo }) => {
    return (
        <>
        <View >
            <Image
                src={ photo }
                alt="Thumbnail"
                style={{ width: 100, height: 100, borderRadius: 10 }}
            />
        </View>
        </>
    );
};

export default PhotoThumbnail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

});

