import React, { useState, createContext, useContext } from 'react';

interface WithChildProps {
    children : JSX.Element
}

const chatContext = createContext(null);

export const ChatContextProvider = ({ children }: WithChildProps)=>{
    const [ user, setUser ] = useState('');
    const [ view, setView ] = useState('page');
    const [ firstMessage, setFirstMessage ] = useState('');
    const [ userDetails, setUserDetails ] = useState({});

    const values = {
        user,
        setUser,
        view,
        setView,
        firstMessage,
        setFirstMessage,
        userDetails,
        setUserDetails,
    };
    
    return <chatContext.Provider value={values}>{children}</chatContext.Provider> ;
};

export const useChatContext = ()=>{
    return useContext(chatContext);
};