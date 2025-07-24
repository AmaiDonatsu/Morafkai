import axios from 'axios';
import generationReducer, { getNewImage } from "../redux/genImages";
import Constants from 'expo-constants'

export const sendImageAndPrompts = async (photoUri, prompts, callback) => {
  const filename = photoUri.split('/').pop();
  const formData = new FormData();

  formData.append('image', {
    uri: photoUri,
    name: filename,
    type: 'image/jpeg',
  });

  formData.append('prompt', prompts); 
  formData.append('negative_prompt', ''); 
  formData.append('strength', '0.75');

  try {
    const response = await axios.post(
      `${Constants.expoConfig.extra.API_URL}/generar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return callback(response);
  } catch (error) {
    console.log('Error sending image and prompts:', JSON.stringify(error));
  }
};
