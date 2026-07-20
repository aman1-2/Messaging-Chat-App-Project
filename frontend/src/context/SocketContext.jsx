import { createContext } from 'react';
import { io } from 'socket.io-client';

const SocketContex = createContext();

export const SocketContextProvider = ({ children }) => {
    const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);


    return(
        <SocketContex.Provider value={{ socket }}>
            {children}
        </SocketContex.Provider>
    );
};

export default SocketContex;