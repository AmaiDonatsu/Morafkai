import Reac, { useRef, useState } from 'react';
import { CameraView, Camera, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';

import CamZoomSlider from '../components/CamZoomSlider';
import PhotoThumbnail from '../components/PhotoThumbnail';

const CameraScreen = ()  => {
  const navigation = useNavigation();

  const [facing, setFacing] = useState('back');
  const [settingsCamOpen, setSettingsCamOpen] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  };

  const takePhoto = async () => {
    console.log('Taking photo...');
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
        console.log('Photo taken:', photo.uri);
      } catch (error) {
        console.error('Error taking photo:', error);
      };
      
    } else {
      console.error('Camera reference is not set: ', cameraRef.current);
    };
  };

  const toggleCameraFacing = () =>{
    setFacing(prevFacing =>
      prevFacing === "back" ? "front" : "back"
    );
    console.log(`Camera facing: ${facing}`);
  };

  const existAPhoto = true;
  //'https://i.pinimg.com/736x/4a/e2/4b/4ae24b82a4abb7ac06c1a085fec5ca54.jpg' //{ photoUri }
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        zoom={zoom}
        ref={cameraRef}
      > 
        {existAPhoto ? (
        <View style={styles.PhotoThumbnailContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('EditPhoto', { photoUri })}> 
            <PhotoThumbnail photo={ photoUri } />
          </TouchableOpacity>
        </View>  ) : null}

        <View style={styles.zoomSliderContainer}>
          <CamZoomSlider 
            zoomLevel={zoom} 
            onZoomChange={(zoom) => setZoom(zoom)} />
            <Text style={styles.text}>Zoom: {zoom.toFixed(1)}</Text>
        </View>
        
        <View testID='navBarCam' style={styles.navBarCam}>
          
          <TouchableOpacity onPress={() => setSettingsCamOpen(!settingsCamOpen)}>
            <Text style={styles.text}> Settings </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => takePhoto()}>
            <Text style={styles.text}> Shoot </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}> Flip Camera </Text>
          </TouchableOpacity>
        </View>

      </CameraView>

      
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  PhotoThumbnailContainer: {
    position: 'absolute',
    top: 5,  
    right: 20,
    zIndex: 10,
  },
  zoomSliderContainer: {
    position: 'absolute',
    bottom: 80,
    marginBottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  navBarCam: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
    borderTopWidth: 1,
    borderColor: '#fff',
  },
});