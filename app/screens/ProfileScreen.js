import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import TopBar from '../components/TopBar';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const db = FIREBASE_DB;

function ProfileScreen({navigation}) {

    const email = FIREBASE_AUTH.currentUser.email;


    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");
    const [name, setName] = useState("");
    const [boneCount, setBoneCount] = useState(0)
    useEffect(() => {
        const user = async () => {
            console.log(email)
            const q = query(collection(db, "users"), where("email", "==", email));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                setUserPhoto(user.photo)
                setName(user.name)
                //console.log(user.photo)
                //console.log(user.email)
                //console.log(user.name)
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
                console.log('boneCount:', boneCounter);
            });
            setBoneCount(boneCounter);
            console.log(boneCount)
        };
        dog();
    }, []);

    

    const handleLogout = () => navigation.navigate('WelcomeScreen')

    return (
        <View style={{ flex: 1, backgroundColor: colors.light }}>
            <TopBar/>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, width: '100%', padding: 10 }}>
                <TouchableOpacity style={styles.icon}>
                    <Image
                        source={{uri: userPhoto}}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                </TouchableOpacity>
                <View style={{ marginLeft: 20}}>
                    <Text style={{ fontSize: 24 }}>{name}</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>{email}</Text>
                </View>
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
