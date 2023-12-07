import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import AppText from '../components/AppText';
import TopBar from '../components/TopBar';
import BottomBarNavigator from '../components/BottomBarNavigator';

const image = { uri: "https://cdn.discordapp.com/attachments/763467509759475813/1163397716374716469/Snapchat-1340042168.jpg?ex=653f6d8e&is=652cf88e&hm=f4f4e16968c2c6ff6c31a49fca9b3055a9584b98f02cbbb43454ca3ecaf1a47d&" };
const seller = require('../assets/benjamin.png');

function ListingDetailsScreen({route}) {
    const { name, price, image } = route.params;


    return (
        <View style={styles.container}>
            <TopBar/>
            <ProductCard name={name} price={price} image={image}/>
            <View style={styles.sellerContainer}>
                <Image style={styles.image} source={seller}></Image>
                <View style={styles.infoContainer}>
                    <Text style={styles.sellerName}>Benjamin ANDRE</Text>
                    <Text style={styles.sellerName}>6 Rue de Lille</Text>
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
        fontSize: 20,
        left: 20,
        top: 10,
    },
});

export default ListingDetailsScreen;
