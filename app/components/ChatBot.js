import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, query, where, getDocs, onSnapshot} from "firebase/firestore";

const ChatBot = () => {

    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");

    const email = FIREBASE_AUTH.currentUser.email;

    const navigation = useNavigation();

    useEffect(() => {
        const user = async () => {
            console.log(email)
            const q = query(collection(db, "users"), where("email", "==", email));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    setUserPhoto(user.photo)
                    console.log(user.photo)
                });
            });
            
        };
        user();
    }, []);

    // ChatGPT API
    const [messages, setMessages] = useState([])
    const chatGptApiKey = '';

    const handleSend = async (newMessage = []) => {
        try{
            const userMessage = newMessage[0];

            setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
            const messageText = userMessage.text.toLowerCase();
            const keywords = ['dog', 'dogs', 'chien', 'chiens', 'doggo', 'doggos', 'puppy', 'puppies', 'pup', 'pups', 'eat', 'food', 'manger', 'nourriture', 'malade', 'sick', 'sickness', 'sicknesses', 'maladie', 'maladies', 'mal', 'ill', 'jouer', 'play'];
            if (!keywords.some(keyword => messageText.includes(keyword))) {
                const botMessage = {
                    _id: new Date().getTime() + 1,
                    text: "I only can answer questions about dogs. Sorry!",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Doggy Bot',
                        avatar: 'https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/dogsImage%2Fdog.png?alt=media&token=0563835c-7d45-46a6-952f-182e01a4886a',
                    }
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
                return ;
            }

            const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                prompt: `Hello, you are my assistant for my dog, and i have some questions about him: ${messageText}`,
                max_tokens: 150,
                temperature: 0.2,
                n: 1,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${chatGptApiKey}`,
                }
            });
            console.log(response.data);

            const dogsResponse = response.data.choices[0].text.trim();
            const botMessage = {
                _id: new Date().getTime() + 1,
                text: dogsResponse,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Doggy Bot',
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/dogsImage%2Fdog.png?alt=media&token=0563835c-7d45-46a6-952f-182e01a4886a',
                }   
            };

            setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: colors.white, padding: 10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, marginBottom: 5}}>
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                    Doggy Bot
                </Text>
            </View>            
            <GiftedChat 
                messages={messages}
                onSend={newMessage => handleSend(newMessage)}
                user={{ 
                    _id: 1,
                    avatar: userPhoto
                }}
            />
        </View>
    )
}

export default ChatBot;
