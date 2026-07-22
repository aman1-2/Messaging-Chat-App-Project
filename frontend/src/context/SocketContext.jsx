import { createContext, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContex = createContext();

export const SocketContextProvider = ({ children }) => {
    // Need to store the channel detail inside this context as we want to send the message to the particular channel itself.
    const [currentChannel, setCurrentChannel] = useState(null);

    const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

    async function joinChannel(channelId) {
        socket.emit('JoinChannel', { channelId }, (data) => {
            console.log('Successfully Joined the Channel', data);
            setCurrentChannel(data?.data);
        });
    }

    return(
        <SocketContex.Provider value={{ socket, joinChannel, currentChannel }}>
            {children}
        </SocketContex.Provider>
    );
};

export default SocketContex;