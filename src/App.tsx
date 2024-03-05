import React from 'react';
import Button from './components/Button';
import { ChatContextProvider } from './contexts/chatContext';

const App = ({ data }: any) => {
    return (
        <ChatContextProvider>
            <Button/>
        </ChatContextProvider>
    );
};

export default App;
