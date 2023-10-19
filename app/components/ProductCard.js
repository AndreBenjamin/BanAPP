import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../config/colors';

const ProductCard = ({ image, name, price }) => {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'left',
        //margin: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        top: 10,
    },
    image: {
        width: '100%',
        height: 250,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: '5%',
    },
    price: {
        fontSize: 16,
        color: colors.secondary,
        marginBottom: 5,
        marginLeft: '5%',
    },
});

export default ProductCard;
