import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const MessageImageThumbnail = ({ imageUrl }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="relative overflow-hidden cursor-zoom-in border rounded-lg max-w-92.5">
                    <img src={imageUrl} className="rounded-md object-cover size-full" />
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-212.5 border-none bg-transparent p-0 shadow-none">
                <img src={imageUrl} className="rounded-md object-cover size-full" />
            </DialogContent>
        </Dialog>
    );
};

export default MessageImageThumbnail;