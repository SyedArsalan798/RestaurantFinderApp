import React, {useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {Text, View, StyleSheet, Image, Pressable, Alert, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from './Colors';
const Profile = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        loadProfilePic();
    }, []);

    const loadProfilePic = async () => {
        try {
            const profilePicUri = await AsyncStorage.getItem('profilePicUri');
            if (profilePicUri) {
                setSelectedImage(profilePicUri);
            }
        } catch (error) {
            console.error('Failed to load profile pic:', error);
        }
    };

    const saveProfilePic = async (uri) => {
        try {
            await AsyncStorage.setItem('profilePicUri', uri);
            Alert.alert('Success', 'Profile picture saved successfully!');
        } catch (error) {
            console.error('Failed to save profile pic:', error);
        }
    };

    
    const pickImageAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission required', 'Please grant access to your photo library to upload photos.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
          });
      
          if (!result.canceled) {
            setSelectedImage(result['assets'][0].uri);
        } else {
            alert('You did not select any image.');
          }
    };

    const takePictureAsync = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission required', 'Please grant access to your camera to take photos.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result['assets'][0].uri);
        } else {
            Alert.alert('Warning', 'You did not take any photo.');
        }
    }

    
    const downloadPic = async () => {
        if (selectedImage){
        try {
            // Request permission to save to the media library
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission not granted to access media library');
                return;
            }

            const albumName = "FoodieApp";

            const asset = await MediaLibrary.createAssetAsync(selectedImage);
            await MediaLibrary.createAlbumAsync(albumName, asset, false);
            Alert.alert('Success', `File Saved Successfully in '${albumName}' Folder`);
    
        } catch (error) {
            Alert.alert('Error', `Error Downloading Image`);
        }
        }
      };
      

    const placeholderImageSource = 'https://docs.expo.dev/static/images/tutorial/background-image.png'
    const imageSource = selectedImage  ? { uri: selectedImage } : {uri: placeholderImageSource};

    return (
        <View style={styles.fullContainer}>
            <Text style={styles.uploadText}>Upload Photo</Text>
            <Text style={{marginHorizontal: 50, color: 'grey'}}>Once you save, you've to reload the app to see the profile pic on Main page</Text>
            <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={pickImageAsync}>
                        <Text style={styles.buttonLabel}>Choose a photo</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={takePictureAsync}>
                            <Text style={styles.buttonLabel}>Take a photo</Text>
                        </Pressable>
                    <View style={styles.saveAndDownload}>
                    <TouchableOpacity style={styles.buttonSave} activeOpacity={0.8} onPress={() => saveProfilePic(selectedImage)}>
                        <Text style={styles.buttonLabelSave}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.6} onPress={downloadPic}>
                        <Text><Feather name="download" size={24} color={COLORS.dark} /></Text>
                    </TouchableOpacity>
                    </View>
                    {/* <Text>{selectedImage}</Text> */}
                </View>
            </View>
            {/* <StatusBar style="auto" /> */}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    saveAndDownload: {
        flexDirection: 'row',
        gap: 5,
        width: '100%'
    },
    downloadBtn: {
        width: '19%',
        height: 50,
        // width: '100%',
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        marginHorizontal: 50, 
        marginTop: 80,
        color: COLORS.dark,
        fontWeight: '900',
        fontSize: 20
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    fullContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      text: {
        color: 'white'
      },
      imageContainer: {
        flex: 1,
        paddingTop: 10,
        
      },
        footerContainer: {
          flex: 1,
          alignItems: 'center',
          marginTop: 290
        //   justifyContent: 'center'
        },
        buttonContainer: {
            width: 320,
            height: 68,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
          },
          button: {
            borderWidth: 1,
            borderColor: '#ccc',
            height: 50,
            width: '100%',
            backgroundColor: COLORS.white,
            marginTop: 10,
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
          },
          buttonSave: {
            height: 50,
            width: '79%',
            backgroundColor: COLORS.primary,
            marginTop: 10,
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
          },
          buttonIcon: {
            paddingRight: 8,
            
          },
          buttonLabel: {
            color: COLORS.dark,
            fontSize: 16,
          },
          buttonLabelSave: {
            color: COLORS.light,
            fontSize: 16,
          },
  });

export default Profile;
