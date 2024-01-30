import React from 'react'
import Chatbot from 'react-chatbot-kit'

import ActionProvider from './Chatbot/ActionProvider.jsx';
import MessageParser from './Chatbot/MessageParser.jsx';
import config from './Chatbot/config.jsx';
import './ChatbotPage.css';

const ChatbotPage = () => {
    return (
        <div className="ChatbotPage">
            <div style={{ maxWidth: "300px" }}>
                <Chatbot 
                config={config} 
                actionProvider={ActionProvider}
                messageParser={MessageParser} 
                />
            </div>
        </div>
    );
}

export default ChatbotPage