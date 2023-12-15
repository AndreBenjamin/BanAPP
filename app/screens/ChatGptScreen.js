import React, { useState } from 'react';
import { View} from 'react-native';
import ChatBot from '../components/ChatBot';
import colors from '../config/colors';
import TopBar from '../components/TopBar';

const ChatGptScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <TopBar />
            <ChatBot />
        </View>
    );
};

export default ChatGptScreen;
