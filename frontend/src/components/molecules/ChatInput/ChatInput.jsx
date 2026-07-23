// import { getPresignedUrlRequest, uploadeImageToAWSPresignedUrl } from '@/apis/s3';
import Editor from '@/components/atoms/Editor/Editor';
import useAuth from '@/hooks/context/useAuth';
import useCurrentWorkspace from '@/hooks/context/useCurrentWorkspace';
import useSocket from '@/hooks/context/useSocket';
// import { useQueryClient } from '@tanstack/react-query';

const ChatInput = () => {
    const { socket, currentChannel } = useSocket();
    const { auth } = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();

    // const queryClient = useQueryClient();

    console.log('channel: ', currentChannel);

    async function handleSubmit({ messageBody, image }) {
        console.log(messageBody, image);

        // if(image) {
        //     const presignedUrl = await queryClient.fetchQuery({
        //         queryKey: ['getPresignedUrl'],
        //         queryFn: () => getPresignedUrlRequest({ token: auth?.token })
        //     });

        //     console.log(presignedUrl);

        //     const AWSResponse = await uploadeImageToAWSPresignedUrl(presignedUrl, image);
        //     console.log('file upload success: ', AWSResponse);
        // }

        socket?.emit('NewMessage', {
            channelId: currentChannel,
            body: messageBody,
            senderId: auth?.user?._id,
            workspaceId: currentWorkspace?.data?._id
        }, (data) => {
            console.log('Message Sent: ', data);
        });
    }

    return (
        <div className="px-5 w-full">
            <Editor
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
            >
            </Editor>
        </div>
    );
};

export default ChatInput;