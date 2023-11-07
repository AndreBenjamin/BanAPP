import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image} from 'react-native';
import AppText from '../components/AppText';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';
//import { checkUser } from '../config/route';

const windowWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
    // Import Images
    const image = require('../assets/tiny.jpg');
    const logo = require('../assets/dog.png');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email && password) {
          navigation.navigate('ListingScreen');
        } else {
            console.log('Veuillez remplir tous les champs');
            alert('Veuillez remplir tous les champs');
        }
    };

    const handleCreateAccount = () => {
        navigation.navigate('SignInScreen')
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
                </View>
            </View>
            <View style={styles.loginContainer}>
                <LoginButton text="Login" color="pink" onPress={handleLogin}/>
                <TouchableOpacity onPress={handleCreateAccount} style={{bottom:20}}>
                    <Text style={{color: colors.primary}}>Create your account right now!</Text>
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
        marginTop: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 50,
        marginVertical: 20,
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
        marginBottom: 20,
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

export default LoginScreen;
