import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useAddChannelToWorkspace from '@/hooks/apis/workspaces/useAddChannelToWorkspace';
import useCreateChannelModal from '@/hooks/context/useCreateChannelModal';
import useCurrentWorkspace from '@/hooks/context/useCurrentWorkspace';

const CreateChannelModal = () => {
    
    const [channelName, setChannelName] = useState('');

    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();
    const { currentWorkspace } = useCurrentWorkspace();
    const { addChannelToWorkspaceMutation } = useAddChannelToWorkspace(currentWorkspace?.data?._id);

    function handleClose() {
        setOpenCreateChannelModal(false);
    }

    async function handleFormSubmit(event) {
        console.log('Triggering the create workspace');
        event.preventDefault();
        await addChannelToWorkspaceMutation({
            channelName: channelName
        });
        handleClose();
    }

    return(
        <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a Channel
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input
                        required
                        placeholder='Channel Name e.g - Announcement-channel'
                        value={channelName}
                        onChange={(e)=> setChannelName(e.target.value)}
                    />

                    <div className="flex justify-end mt-4">
                        <Button type='submit'>
                            Create Channel
                        </Button>
                    </div>
                    
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannelModal;