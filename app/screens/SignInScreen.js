import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image} from 'react-native';
import AppText from '../components/AppText';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';

const windowWidth = Dimensions.get('window').width;

const SignInScreen = ({navigation}) => {
    // Import Images
    const image = require('../assets/tiny.jpg');
    const logo = require('../assets/dog.png');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = () => {
        if (email && password && confirmPassword && name) {
            if (password = confirmPassword){
                console.log('Connecté avec succès');
                navigation.navigate('ListingScreen')
            }else {
                console.log('Les mots de passe ne correspondent pas');
                alert('Les mots de passe ne correspondent pas');
            }
        } else {
            console.log('Veuillez remplir tous les champs');
            alert('Veuillez remplir tous les champs');
        }
    };

    const handleConnectAccount = () => {
        navigation.navigate('SignUpScreen')
    };

    return (
       
        <ImageBackground source={image} blurRadius={5} resizeMode="cover" style={styles.imageContainer}>

            <View style={styles.logoView}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
                <View style={styles.logoTextContainer}>
                    <AppText>Pick Your DOG!</AppText>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={{marginBottom: 30}}>
                    <AppText>Profile Name:</AppText>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Set your profile Name"
                            value={name}
                            onChangeText={setName}
                        />
                    <AppText>Email:</AppText>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <AppText>Password:</AppText>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <AppText>Confirm Password:</AppText>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={styles.loginContainer}>
                <LoginButton text="Create account" color="pink" onPress={handleLogin}/>
                <TouchableOpacity onPress={handleConnectAccount} style={{bottom:20}}>
                    <Text style={{color: colors.primary}}>Connect yourself!</Text>
                </TouchableOpacity>
            </View>
            
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
      imageContainer: {
        flex: 1,
        justifyContent: 'flex-top',
        position: 'absolute',
        width: '100%',
      },
      inputContainer: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 50,
        marginHorizontal: 30,
      },
      inputText: {
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        paddingHorizontal: 50,
      },
      loginContainer: {
        alignItems: 'center',
        marginTop: '50%',
        marginVertical: 20,
      },

       // logo part
      logo: {
        width: 100,
        height: 100,
        borderRadius: 25,
      },
      logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      logoText: {
        fontSize: 30,
        color: 'black',
        fontWeight: '300',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      logoTextContainer: {
        backgroundColor: 'rgba(255, 196, 248, 0.3)',
        borderRadius: 25,
        width: 250,
        top: 10,
      },
});

export default SignInScreen;
