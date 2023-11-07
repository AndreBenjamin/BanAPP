import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import colors from '../config/colors';
import TopBar from '../components/TopBar';

const products = [
    { id: 1, name: 'Tiny le Méchant', price: '120€', image: require('../assets/tiny.jpg') },
    { id: 2, name: 'Roxy la chuky', price: '121€', image: require('../assets/roxy.jpg') },
    { id: 3, name: 'Yanis la saucisse', price: '3€', image: require('../assets/saucisse.jpg') },
    { id: 4, name: 'Ramy le rempli', price: '60€', image: require('../assets/ramy.jpg') },
    { id: 5, name: 'Donia le chihuahua', price: '50€', image: require('../assets/donia.jpg') },
    { id: 6, name: 'Benoit le malinois', price: '12€', image: require('../assets/benoit.jpg') },
    { id: 7, name: 'Romains les chiens', price: '67€', image: require('../assets/romain.jpg') },
    { id: 8, name: 'Lucas le shiba', price: '42€', image: require('../assets/micka.jpeg') },
    { id: 9, name: 'Hamed le samoyéde', price: '37€', image: require('../assets/hamed.jpg') },
];

const ListingScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.light }}>
            <TopBar/>
            <ScrollView>
                {products.map((product) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ListingDetailsScreen', {
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        });
                    }}>
                        <View style={styles.container}>
                            <ProductCard name={product.name} price={product.price} image={product.image}/>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
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
});

export default ListingScreen;
