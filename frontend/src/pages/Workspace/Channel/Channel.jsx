import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import ChatInput from '@/components/molecules/ChatInput/ChatInput';
import Message from '@/components/molecules/Message/Message';
import useGetChannelById from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import useSocket from '@/hooks/context/useSocket';

const Channel = () => {

    const { channelId } = useParams();
    const { channelDetails, isFetching, isError } = useGetChannelById(channelId);
    const { joinChannel } = useSocket();
    const { isFetching: isFetchingChannelMessages, channelMessages } = useGetChannelMessages(channelId);

    useEffect(() => {
        if(!isFetching && !isError) {
            joinChannel(channelId);
        }

    }, [isFetching, isError, joinChannel, channelId]);

    if(isFetching) {
        return (
            <div
                className='h-full flex-1 flex items-center justify-center'
            >
                <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
            </div>
        );
    }

    if(isError) {
        return (
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not found</span>
            </div>
        );
    }

    return (
         <div className='flex flex-col h-full'>
            <ChannelHeader name={channelDetails?.data?.name} />

            {
                !isFetchingChannelMessages && channelMessages?.data?.reverse()?.map((message) => {
                    return (
                        <Message key={message._id} messageBody={message?.body} authorImage={message?.senderId?.avatar} authorName={message?.senderId?.username} />
                    );
                }) 
            }

            <div className='flex-1' />
            <ChatInput />
        </div>
    );
};

export default Channel;