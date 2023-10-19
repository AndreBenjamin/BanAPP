import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import TopBar from '../components/TopBar';

function ProfileScreen({navigation}) {

    const handleLogout = () => navigation.navigate('WelcomeScreen')

    return (
        <View style={{ flex: 1, backgroundColor: colors.light }}>
            <TopBar/>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, width: '100%', padding: 10 }}>
                <TouchableOpacity style={styles.icon}>
                    <Image
                        source={require('../assets/benjamin.png')}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                </TouchableOpacity>
                <View style={{ marginLeft: 20}}>
                    <Text style={{ fontSize: 24 }}>Benjamin ANDRE</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>benjamin4andre@gmail.com</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.listContainer}>
                    <View style={styles.icon}>
                        <MaterialCommunityIcons name="format-list-bulleted" size={24} color="white" />
                    </View>
                    <Text style={{ marginLeft: 20 }}>My Listings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listContainer}>
                    <View style={{borderRadius: 55, backgroundColor: colors.info, padding: 5}}>
                        <MaterialCommunityIcons name="message" size={24} color="white" />
                    </View>
                    <Text style={{ marginLeft: 20 }}>My Messages</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.pink,
                    borderRadius: 10,
                    paddingVertical: 10,
                    marginTop: 'auto',
                    alignItems: 'center',
                    marginHorizontal: '35%',
                    width: '30%',
                    marginBottom: 20,
                }}
                onPress={handleLogout}
            >
                <MaterialCommunityIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
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
    listContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: colors.white,
        padding: 10
    }
})

export default ProfileScreen;
