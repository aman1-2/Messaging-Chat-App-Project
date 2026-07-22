import { useContext } from 'react';

import SocketContex from '@/context/SocketContext';

const useSocket = () => {
    return useContext(SocketContex);
};

export default useSocket;