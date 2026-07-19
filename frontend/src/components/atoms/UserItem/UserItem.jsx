import { cva } from 'class-variance-authority';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useCurrentWorkspace from '@/hooks/context/useCurrentWorkspace';
import { cn } from '@/lib/utils';

const userItemVariants = cva(
    'flex items-center gap-1.5 justify-start font-normal h-7 px-4 mt-2 text-sm',
    {
      variants: {
        variant: {
            default: 'text-[#f9edffcc] ',
            active: 'text-[#481350] bg-white/90 hover:bg-white/80',
        }
      },
      defaultVariants: {
        variant: 'default'
      }
    }
);

const UserItem = ({ userId, label = 'Member', imageSrc, variant }) => {
    const { currentWorkspace } = useCurrentWorkspace();

    return (
        <Button 
            className={cn(userItemVariants({ variant }))} 
            variant="transparent"
            size="sm"
            asChild
        >
            <Link 
                className='flex gap-x-2'
                to={currentWorkspace ? (`/workspaces/${currentWorkspace?.data?._id}/members/${userId}`) : ('#')}
            >
                <Avatar className="size-5 rounded-md">
                    <AvatarImage src={imageSrc} className='rounded-md' />
                    <AvatarFallback className='rounded-md bg-sky-500 text-white'>
                        {label?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                </Avatar>

                <span className="text-sm truncate">
                    {label}
                </span>
            </Link>
        </Button>
    );
};

export default UserItem;