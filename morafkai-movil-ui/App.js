import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CameraScreen from './src/screens/CameraScreen';
import EditPhotoScreen from './src/screens/EditPhotoScreen';

import { Provider } from 'react-redux';
import store from './src/store';

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: CameraScreen,
    EditPhoto: EditPhotoScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);


export default function App() {
  return (
    <Provider store={ store }>
      <View style={styles.container}>
        <Navigation />
      </View> 
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
