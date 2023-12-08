import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import AppText from '../components/AppText';
import TopBar from '../components/TopBar';
import BottomBarNavigator from '../components/BottomBarNavigator';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig';

const db = FIREBASE_DB;

const seller = require('../assets/benjamin.png');

function ListingDetailsScreen({route}) {

    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");
    const [userName, setName] = useState("");

    const { name, price, image, email } = route.params;
    console.log(email)

    useEffect(() => {
        const user = async () => {
            console.log(email)
            const q = query(collection(db, "users"), where("email", "==", email));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                setUserPhoto(user.photo)
                setName(user.name)
                console.log(user.photo)
            });
        };
        user();
    }, []);

    return (
        <View style={styles.container}>
            <TopBar/>
            <ProductCard name={name} price={price} image={image}/>
            <View style={styles.sellerContainer}>
                <Image style={styles.image} source={{uri: userPhoto}}></Image>
                <View style={styles.infoContainer}>
                    <Text style={styles.sellerName}>{userName}</Text>
                    <Text style={styles.sellerName}>{email}</Text>
                </View>
            </View>
            <BottomBarNavigator/>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    sellerContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
        marginTop: 10,
    },
    infoContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column',
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 55,
        backgroundColor: colors.pink,
        marginLeft: 20,
    },
    sellerName: {
        fontSize: 15,
        left: 20,
        top: 10,
    },
});

export default ListingDetailsScreen;
