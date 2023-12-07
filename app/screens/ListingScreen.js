import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import ProductCard from '../components/ProductCard';
import colors from '../config/colors';
import TopBar from '../components/TopBar';
import BottomBarNavigator from '../components/BottomBarNavigator';
import { FIREBASE_DB } from '../../FirebaseConfig';

const db = FIREBASE_DB;

import { collection, getDocs, addDoc } from "firebase/firestore"; 

const getDogs = async () => {
    const dogsArray = [];

    const querySnapshot = await getDocs(collection(db, "dogs"));
    querySnapshot.forEach((doc) => {
        const dog = doc.data();
        console.log(doc.id)
        dogsArray.push(
            {
                id: dog.id,
                name: dog.name,
                price: dog.price,
                image: dog.image,
        });
    });
    
    return dogsArray;
}

const ListingScreen = ({ navigation }) => {
    const [dogsArray, setDogsArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'dogs'));
                const fetchedDogs = [];
                querySnapshot.forEach((doc) => {
                    const dog = doc.data();
                    const dogImage = { uri: dog.image };
                    fetchedDogs.push({
                        id: dog.id,
                        name: dog.name,
                        price: dog.price,
                        image: dogImage,
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
    }, []); // Le tableau de dépendances vide signifie que cet effet s'exécutera une fois après le rendu initial.

    return (
        <SafeAreaView  style={{ flex: 1, backgroundColor: colors.light }}>
            <TopBar />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView style={{marginBottom: 60}}>
                    {dogsArray.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            onPress={() => {
                                navigation.navigate('ListingDetailsScreen', {
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                });
                            }}
                        >
                            <View style={styles.container}>
                                <ProductCard name={product.name} price={product.price} image={product.image} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('UploadImageScreen');}}>
                <Text><MaterialIcons name="create" size={35} color="black" /></Text>
            </TouchableOpacity>
            <BottomBarNavigator/>
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
        backgroundColor: colors.grey, // Assurez-vous d'avoir défini color.info dans votre thème ou utilisez une couleur directe comme 'blue'
        padding: 10,
        borderRadius: 25,
      },
});

export default ListingScreen;