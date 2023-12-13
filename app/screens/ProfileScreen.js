import React, { useState, useEffect, cloneElement } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import TopBar from '../components/TopBar';
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import Loading from '../components/Loading';

import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';
const PlaceholderImage = require('../assets/dog.png');
const db = FIREBASE_DB;

function ProfileScreen({ navigation }) {

    const email = FIREBASE_AUTH.currentUser.email;


    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [boneCount, setBoneCount] = useState(0)

    const [selectedImage, setSelectedImage] = useState(null);

    const storage = getStorage();
    const [loading, setLoading] = useState(false)
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
        console.log('pickImageAsync');
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setUserPhoto(result.assets[0].uri);
        } else {
            alert("You did not select any image.");
        }
    };


    const handleUpload = async () => {
        if (selectedImage) {
            setLoading(true)
            const uuid = generateRandomId();
            console.log('uuid', uuid);
            const dogsRef = ref(storage, "userImage/" + uuid);
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            console.log('blob', blob);

            await uploadBytes(dogsRef, blob);

            const url = await getDownloadURL(dogsRef);
            try {
                const docRef = await setDoc(doc(db, "users", id), {
                    photo: url,
                    email: email,
                    name: name,
                    lastConnection: new Date(),
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            finally{
                setLoading(false)
            }
            navigation.navigate('ListingScreen');
        } else {
            console.log('Veuillez remplir tous les champs');
            if (!photo) {
                setErrorPhoto("Photo not valid. Please try again.")
            }
            alert('Veuillez remplir tous les champs');
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = async () => {
            // TODO BEN : change the query to get with uuid instead of email
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                console.log("name", user.name)
                setUserPhoto(user.photo)
                setName(user.name)
                setId(doc.id)
            });
        };
        user();
    }, []);

    useEffect(() => {
        const dog = async () => {
            const q = query(collection(db, "dogsPhoto"), where("userEmail", "==", email));
            var boneCounter = 0;
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const dog = doc.data();
                boneCounter += dog.bone;
            });
            setBoneCount(boneCounter);
        };
        dog();
    }, []);



    const handleLogout = () => navigation.navigate('WelcomeScreen')

    return (
        <View style={{ flex: 1, backgroundColor: colors.light }}>
            <TopBar />
            {loading ? (
        <Loading />
      ) : (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, width: '100%', padding: 10 }}>
                <TouchableOpacity style={styles.icon} onPress={pickImageAsync}>
                    <ImageViewer placeholderImageSource={{ uri: userPhoto }} selectedImage={selectedImage} style={{ width: 80, height: 80, borderRadius: 40 }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 24 }}>{name}</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>{email}</Text>
                    <Text style={{ fontSize: 25, color: 'gray' }}>{boneCount}<MaterialCommunityIcons name="bone" size={45} color="pink" /></Text>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleUpload}
                    >
                        <Text style={{ fontSize: 25, color: 'gray' }}>Save change</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <View style={{ backgroundColor: colors.pink, borderRadius: 15, top: 15, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: 'bold' }}>My veterinary</Text>
                    <View style={styles.listContainer}>
                        <MaterialCommunityIcons name="phone" size={24} color="black" />
                        <Text onPress={() => Linking.openURL('tel:06 12 13 14 15')} style={{ fontSize: 20, marginLeft: 20 }}>06 12 13 14 15</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => { navigation.navigate('UploadImageScreen'); }}>
                            <Text><MaterialCommunityIcons name="square-edit-outline" size={24} color="black" /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listContainer}>
                        <MaterialCommunityIcons name="email" size={24} color="black" />
                        <Text onPress={() => Linking.openURL('mailto:lal@gmail.com')} style={{ fontSize: 20, marginLeft: 20 }}>lal@gmail.com</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => { navigation.navigate('UploadImageScreen'); }}>
                            <Text><MaterialCommunityIcons name="square-edit-outline" size={24} color="black" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <MaterialCommunityIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
            </>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    icon:
    {
        borderRadius: 55,
        backgroundColor: colors.pink,
        padding: 5
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.pink,
        padding: 20,
        width: '90%',
    },
    logoutButton: {
        backgroundColor: colors.pink,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 'auto',
        alignItems: 'center',
        marginHorizontal: '35%',
        width: '30%',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: colors.success,
        borderRadius: 10,
        paddingVertical: 10,
        width: '30%',
    },
    editButton: {
        backgroundColor: colors.pink,
        borderRadius: 10,
        paddingVertical: 10,
        left: 20,
        width: '30%',
    },
})

export default ProfileScreen;
