import { createContext, useState } from 'react';
import { io } from 'socket.io-client';

import useChannelMessage from '@/hooks/context/useChannelMessages';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [currentChannel, setCurrentChannel] = useState(null);
    const { messageList, setMessageList } = useChannelMessage();

    const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

    socket.on('NewMessageReceived', (data) => {
        console.log('New Message Received', data);
        setMessageList([...messageList, data]);
    });

    async function joinChannel(channelId) {
        socket.emit('JoinChannel', { channelId }, (data) => {
            console.log('Successfully Joined the Channel', data);
            setCurrentChannel(data?.data);
        });
    }

    return(
        <SocketContext.Provider value={{ socket, joinChannel, currentChannel }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;