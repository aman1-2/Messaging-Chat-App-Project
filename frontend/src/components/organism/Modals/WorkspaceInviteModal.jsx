import { CopyIcon, Link2Icon, RefreshCcwIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useResetJoinCode from '@/hooks/apis/workspaces/useResetJoinCode';
// import useCurrentWorkspace from '@/hooks/context/useCurrentWorkspace';

const WorkspaceInviteModal = ({ openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId }) => {
    // const { currentWorkspace } = useCurrentWorkspace(); // another way of accessing data one we are applying.
    const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);
    // console.log(currentWorkspace?.data?.name);
    // console.log(currentWorkspace?.data?.joinCode);

    async function handleCopyCode() {
        const inviteCode = `${joinCode}`;
        await navigator.clipboard.writeText(inviteCode);
        toast.info('Invite Code copied in Clipboard');
    }

    async function handleCopyLink() {
        const inviteLink = `${window.origin}/workspaces/join/${workspaceId}`;
        await navigator.clipboard.writeText(inviteLink);
        toast.info('Invite Link copied to Clipboard');
    }

    async function handleResetCode() {
        try {
            await resetJoinCodeMutation();
        } catch(error) {
            console.log('Error faced in reseting join code while calling: ', error);
        }
    }

    return(
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite People to { workspaceName }
                    </DialogTitle>
                    <DialogDescription>
                        Use the code or link shown below to intvite people to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-10 gap-y-4">
                    <p className='font-bold text-3xl uppercase'>
                        { joinCode }
                    </p>

                    <div className='flex gap-x-2'>
                        <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={handleCopyCode}
                        >
                            Copy Code
                            <CopyIcon className="size-4 ml-2" />
                        </Button>

                        <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={handleCopyLink}
                        >
                            Copy Link
                            <Link2Icon className="size-4 ml-2" />
                        </Button>
                    </div>

                    <Link 
                        className='flex items-center gap-1.5' 
                        to={`/workspaces/join/${workspaceId}`}
                    >
                        <span className='text-blue-600'>Redirect to Join Page</span>
                    </Link>
                </div>

                <div className="flex items-center justify-center w-full">
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handleResetCode}
                    >
                        Reset Join Code
                        <RefreshCcwIcon className="size-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceInviteModal;