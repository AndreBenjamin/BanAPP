import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, Image} from 'react-native';
import AppText from '../components/AppText';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';
import * as ImagePicker from "expo-image-picker";
import TopBar from '../components/TopBar';

// Import Firebase
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { FIREBASE_DB } from '../../FirebaseConfig';
const db = FIREBASE_DB;
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from '../components/Loading';
import ImageViewer from '../components/ImageViewer';
const PlaceholderImage = require('../assets/dog.png');

const UploadImageScreen = ({ navigation }) => {
  // Import Images
  const image = require('../assets/french-bulldog.jpg');
  const logo = require('../assets/logo.png');

  const storage = getStorage();

  // Import auth
  const auth = FIREBASE_AUTH;

  const [loading, setLoading] = useState(false);

  const [dogName, setDogName] = useState('');
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState('');
  const [errorDogName, setErrorDogName] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [errorPhoto, setErrorPhoto] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10;

    let randomId = '';
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  };

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
      setLoading(true);
      const uuid = generateRandomId();
      console.log('uuid', uuid);
      const dogsRef = ref(storage, "dogsImage/" + uuid);
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      console.log('blob', blob);

      await uploadBytes(dogsRef, blob);

      const url = await getDownloadURL(dogsRef);
      try {
        const docRef = await addDoc(collection(db, "dogsPhoto"), {
          dogName: dogName,
          status: status,
          image: url,
          userEmail: auth.currentUser.email,
          date: new Date(),
          bone: 0,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        setLoading(false);
      }
      navigation.navigate('ListingScreen');
    } else {
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

    <ImageBackground source={image} resizeMode="cover" style={styles.imageContainer}>
      <TopBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.logoView}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>

          <View style={styles.inputContainer}>
            <View style={{ marginBottom: 30 }}>
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
            <LoginButton text="Upload" color="purple" onPress={handleUpload} />
          </View>
        </>
      )}
    </ImageBackground>
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
    marginTop: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    flex: 1,
  },
  footerContainer: {
    alignItems: 'center',
    padding: 20,
    bottom: "15%",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: 'center',
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
  
  // logo part
  logo: {
    width: 200,
    height: 200,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});


export default UploadImageScreen;
