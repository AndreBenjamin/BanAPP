import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image, ActivityIndicator, Modal, Alert} from 'react-native';
import AppText from '../components/AppText';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';
import * as ImagePicker from "expo-image-picker"; 


// Import Firebase
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { FIREBASE_DB } from '../../FirebaseConfig';
const db = FIREBASE_DB;
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes } from "firebase/storage";

import ImageViewer from '../components/ImageViewer';
const PlaceholderImage =  require('../assets/dog.png');

const UploadImageScreen = ({navigation}) => {
    // Import Images
    const image = require('../assets/tiny.jpg');
    const logo = require('../assets/dog.png');

    const storage = getStorage();

    // Import auth
    const auth = FIREBASE_AUTH;

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [dogName, setDogName] = useState('');
    const [status, setStatus] = useState('');
    const [photo, setPhoto] = useState('');
    const [errorDogName, setErrorDogName] = useState("");
    const [errorStatus, setErrorStatus] = useState("");
    const [errorPhoto, setErrorPhoto] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };


    const handleUpload = async () => {
        if (dogName && status && selectedImage) {

          const dogsRef = ref(storage, "dogsImage/"+selectedImage);

          uploadBytes(dogsRef, selectedImage).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
          try {
              const docRef = await addDoc(collection(db, "dogsPhoto"), {
                  dogName: dogName,
                  status: status,
                  image: photo,
                  todayDate: new Date(),
              });
              console.log("Document written with ID: ", docRef.id);
          } catch (e) {
          console.error("Error adding document: ", e);
          }
          navigation.navigate('ListingScreen');
        }else {
            console.log('Veuillez remplir tous les champs');
            if (!dogName) {
                setErrorDogName("Dog name not valid. Please try again.")
            }
            if (!status) {
                setErrorStatus("Status not valid. Please try again.")
            }
            if (!photo) {
                setErrorPhoto("Photo not valid. Please try again.")
            }
            alert('Veuillez remplir tous les champs');
            setLoading(false);
        }
    };

    return (
       
        <View blurRadius={5} resizeMode="cover" style={styles.imageContainer}>
            <View style={styles.logoTextContainer}>
                <Text style={styles.text}>Pick Your DOG!</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <View style={{marginBottom: 30}}>
                    <AppText>Dog name:</AppText>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Set the name of your dog"
                        value={dogName}
                        onChangeText={setDogName}
                    />
                    <Text style={styles.error}>{errorDogName}</Text>
                    <AppText>Status:</AppText>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Set your status"
                        value={status}
                        onChangeText={setStatus}
                    />
                    <Text style={styles.error}>{errorStatus}</Text>

                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
                        </View>
                        <View style={styles.footerContainer}>
                            <LoginButton color="grey" text="Choose a photo" onPress={pickImageAsync} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.loginContainer}>
                <LoginButton text="Upload" color="pink" onPress={handleUpload}/>
            </View>
            
        </View>
    );
};


const styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      justifyContent: 'flex-top',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: colors.light,
    },
    inputContainer: {
      alignItems: 'center',
      marginTop: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 50,
      marginVertical: 20,
      marginHorizontal: 30,
    },
    inputText: {
      backgroundColor: "white",
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
      paddingHorizontal: 50,
    },
    loginContainer: {
      alignItems: 'center',
      marginVertical: 20,
      bottom: '12%',
    },
    
    // Modal
    modalView: {
      margin: 20,
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 22,
    },
    inputResetPwd: {
      backgroundColor: "white",
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      bottom: 20,
      paddingHorizontal: 50,
    },
    imageContainer: {
      flex:1, 
    },
    footerContainer: {
      alignItems: 'center',
      padding: 20,
      bottom: "15%"
    },
    container: {
        flex: 1,
        alignItems: 'center',
      },
      logoTextContainer: {
        borderRadius: 25,
        width: 250,
        top: "12%",
      },
      text: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: 30,
        left: "10%",
      },
      error: {
        color: 'red',
        alignSelf: 'center'
      },
});


export default UploadImageScreen;