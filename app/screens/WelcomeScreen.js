import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, Button, Alert, View, ImageBackground, Dimensions, StatusBar } from 'react-native';
import colors from '../config/colors';
import AppText from '../components/AppText';
import LoginButton from '../components/LoginButton';


const windowWidth = Dimensions.get('window').width;

function WelcomeScreen({ navigation }) {
    const image = { uri: "https://cdn.discordapp.com/attachments/763467509759475813/1163397716374716469/Snapchat-1340042168.jpg?ex=653f6d8e&is=652cf88e&hm=f4f4e16968c2c6ff6c31a49fca9b3055a9584b98f02cbbb43454ca3ecaf1a47d&" };
    const logo = require('../assets/dog.png');
    const thanks = () => Alert.alert("Merci copain");
    const handlePressButton = () => Alert.alert("OUAF", "Tu as du fromage pour moi!", [
      {
        text: 'Oui',
        onPress: (thanks),
        style: 'cancel',
      },
      { text: 'Non', onPress: (handlePressButton) },
    ]);
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
            <View style={styles.buttonContainer}>
                <LoginButton text="Sign In" color="danger" onPress={() => navigation.navigate('SignUpScreen')}/>
                <LoginButton text="Sign Up" color="success"  onPress={() => navigation.navigate('SignInScreen')}/>
            </View>
            
            <StatusBar style="auto" />
        </ImageBackground>


    );
}

const styles = StyleSheet.create({
    // Button Part  
      imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
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
        bottom: windowWidth * 1.5,
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

      button: {
        width: windowWidth * 0.2,
        marginHorizontal: 5,
      },
      buttonContainer: {
        alignItems: 'center',
      }
})
export default WelcomeScreen;