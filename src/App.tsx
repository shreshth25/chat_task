import React from 'react';
import Button from './components/Button';
import { ChatContextProvider } from './contexts/chat';

const App = ({ data }: any) => {
    return (
        <ChatContextProvider>
            <Button data= {data}/>
        </ChatContextProvider>
    );
};

export default App;
