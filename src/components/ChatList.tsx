import React, { useEffect, useState } from 'react';
import '../assets/css/chatList.css';
import { User } from '../interfaces/user';
import { getUsers } from '../services/user';
import { getAbbreviation } from '../helpers/helper';
import { useChatContext } from '../contexts/chat';
import '../i18n';
import { useTranslation } from 'react-i18next';

const ChatList = () => {

    const [ users, setUsers ] = useState<User[] | []>([]);
    const { setUser, setView, userDetails } = useChatContext();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers(userDetails);
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleChat = (user) => {
        setUser(user);
        setView('chat');
    };
    
    return (
        <div className='main-container'>
            <div className='frame'>
                <div className='frame-1' onClick={()=>setView('page')}>
                    <div className='icons'>
                        <div className='mdi-chevron-left'/>
                    </div>
                    <div className='label'>
                        <span className='task-assign'>{t('all conversations')}</span>
                    </div>
                </div>
            </div>
            <div className='chat-list-frame-2'>
                {
                    users.map((user, index)=>{
                        return (
                            <div className='chat-list-frame-3' key={index} onClick={()=>handleChat(user)}>
                                <div className='chat-list-frame-4'>
                                    <span className='date'>Feb. 2, 2024</span>
                                    <div className='frame-5'>
                                        <div className='avatar'>
                                            <div className='avatars-img'>
                                                <span className='rb'>{getAbbreviation(user.firstName, user.lastName)}</span>
                                            </div>
                                        </div>
                                        <div className='frame-6'>
                                            <span className='robert-bagares'>{user.firstName}</span>
                                            <div className='frame-7'>
                                                <div className='frame-8'>
                                                    <div className='motivator-icon' />
                                                    <div className='motivator-icon-9' />
                                                    <div className='motivator-icon-a' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className='design-slide-sed'>
                        Design a slide Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem for
                                    </span>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default ChatList;
