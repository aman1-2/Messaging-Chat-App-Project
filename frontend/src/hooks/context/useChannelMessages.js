import { useContext } from 'react';

import ChannelMessage from '@/context/ChannelMessage';

const useChannelMessage = () => {
    return useContext(ChannelMessage);
};

export default useChannelMessage;