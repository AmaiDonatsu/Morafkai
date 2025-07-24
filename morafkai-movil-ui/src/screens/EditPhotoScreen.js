import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";
import { getNewImage, sendingRequest } from "../redux/genImages";
import { sendImageAndPrompts } from "../api/server";

const DARK = true;

const EditPhotoScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { photoUri } = route.params || {};
  const [prompts, setPropmts] = useState("");
  const photoAIdata = useSelector((state) => state.generation.image_data);
  const loading = useSelector((state) => state.generation.loading);

  const Img2Img = () => {
    dispatch(sendingRequest(true));
    sendImageAndPrompts(photoUri, prompts, (response) => {
      if (response.status === 200) {
        const data = response.data;
        dispatch(getNewImage(data));
      } else {
        dispatch(sendingRequest(false));
      }
    });
  };

  return (
    <SafeAreaProvider>
      <View style={[styles.container, DARK && styles.containerDark]}>
        <View style={styles.imageContainer}>
          {loading ? (
            <SafeAreaView style={styles.activityContainer}>
              <ActivityIndicator size="large" color={DARK ? "#fff" : "#333"} />
            </SafeAreaView>
          ) : photoUri ? (
            <Image
              source={{
                uri: photoAIdata
                  ? `${Constants.expoConfig.extra.API_URL}/images/${photoAIdata.file_url}`
                  : photoUri,
              }}
              style={styles.image}
            />
          ) : (
            <Text style={[styles.text, DARK && styles.textDark]}>
              No photo selected for editing
            </Text>
          )}
        </View>

        <Text style={[styles.title, DARK && styles.titleDark]}>Edit Photo</Text>
        <TextInput
          value={prompts}
          onChangeText={setPropmts}
          style={[styles.textInput, DARK && styles.textInputDark]}
          placeholder="Describe your edit (e.g. 'make it brighter')"
          placeholderTextColor={DARK ? "#aaa" : "#888"}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={[styles.button, DARK && styles.buttonDark]}
          onPress={Img2Img}
        >
          <Text style={[styles.buttonText, DARK && styles.buttonTextDark]}>
            Edit with AI
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default EditPhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  containerDark: {
    backgroundColor: "#181A20",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#444",
    backgroundColor: "#222",
  },
  activityContainer: {
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  titleDark: {
    color: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#222",
    textAlign: "center",
  },
  textDark: {
    color: "#eee",
  },
  textInput: {
    width: "100%",
    minHeight: 60,
    maxHeight: 120,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: "#fff",
    color: "#222",
    marginBottom: 20,
    marginTop: 8,
    textAlignVertical: "top",
  },
  textInputDark: {
    backgroundColor: "#23262F",
    color: "#fff",
    borderColor: "#444",
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#007AFF",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  buttonDark: {
    backgroundColor: "#3B71F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  buttonTextDark: {
    color: "#fff",
  },
});