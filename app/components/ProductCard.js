import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const ProductCard = ({ image, name, price, boneCount }) => {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.price}><MaterialCommunityIcons name="bone" size={18} color="pink" /> {boneCount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'left',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 450,
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
