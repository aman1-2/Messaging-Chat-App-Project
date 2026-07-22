import Editor from '@/components/atoms/Editor/Editor';
import useAuth from '@/hooks/context/useAuth';
import useCurrentWorkspace from '@/hooks/context/useCurrentWorkspace';
import useSocket from '@/hooks/context/useSocket';

const ChatInput = () => {
    const { socket, currentChannel } = useSocket();
    const { auth } = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();

    console.log('channel: ', currentChannel);

    async function handleSubmit({ messageBody }) {
        console.log(messageBody);
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