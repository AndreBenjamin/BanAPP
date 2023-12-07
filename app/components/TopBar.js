import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleGoProfile = () => navigation.navigate('ProfileScreen');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={handleGoBack}>
                <MaterialCommunityIcons name="arrow-left-bold-circle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CameraScreen')}>
                <Image source={require('../assets/dog.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profile} onPress={handleGoProfile}>
                <Image source={require('../assets/benjamin.png')} style={styles.imageProfile}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        height: 60,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
    },
    logo: {
        width: 50,
        height: 50,
        marginLeft: '45%',
    },
    imageProfile: {
        width: 50,
        height: 50,
        marginLeft: '250%',
        backgroundColor: colors.grey,
        borderRadius: 55,
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    profile: {
        width: 10,
        height: 10,
        bottom: 20,
    },
});

export default TopBar;
