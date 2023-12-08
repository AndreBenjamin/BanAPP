import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Text, SafeAreaView, Image } from 'react-native';
import ProductCard from '../components/ProductCard';
import colors from '../config/colors';
import TopBar from '../components/TopBar';
import { FIREBASE_DB } from '../../FirebaseConfig';

const db = FIREBASE_DB;

import { collection, getDocs, addDoc } from "firebase/firestore"; 

const ListingScreen = ({ navigation }) => {
    const [dogsArray, setDogsArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(() => {
        
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'dogsPhoto'));
                const fetchedDogs = [];
                querySnapshot.forEach((doc) => {
                    const dog = doc.data();
                    const dogImage = { uri: dog.image };
                    fetchedDogs.push({
                        id: doc.id,
                        name: dog.dogName,
                        status: dog.status,
                        image: dogImage,
                        userEmail: dog.userEmail,
                    });
                });
                setDogsArray(fetchedDogs);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    });

    return (
        <SafeAreaView  style={{ flex: 1, backgroundColor: colors.light}}>
            <TopBar />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Image source={require('../assets/gif/Loading.gif')} style={styles.loadingGif} />
                </View>
            ) : (
                <ScrollView>
                    {dogsArray.map((dog) => (
                        <TouchableOpacity
                            key={dog.id}
                            onPress={() => {
                                navigation.navigate('ListingDetailsScreen', {
                                    name: dog.name,
                                    price: dog.status,
                                    image: dog.image,
                                    email: dog.userEmail,
                                });
                            }}
                        >
                            <View style={styles.container}>
                                <ProductCard name={dog.name} price={dog.status} image={dog.image}/>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('UploadImageScreen');}}>
                <Text><MaterialIcons name="add" size={35} color="black" /></Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'left',
        margin: 10,
    },
    button: {
        position: 'absolute',
        bottom: "10%",
        right: 20,
        backgroundColor: colors.info,
        padding: 10,
        borderRadius: 25,
      },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingGif: {
        width: 100,
        height: 100,
    },
});

export default ListingScreen;