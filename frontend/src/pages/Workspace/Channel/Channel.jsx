import { useParams } from 'react-router-dom';

const Channel = () => {
    const {channelId} = useParams();
    return (
        <div>
            Channel - {channelId}
        </div>
    );
};

export default Channel;