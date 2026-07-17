import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

const WorkspacePanelSection = ({ children, label, onIconClick}) => {
    const [open, setOpen] = useState();

    return(
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
                <Button
                    onClick={() => setOpen(!open)}
                    variant="transparent"
                    className='p-0.5 text-sm size-6 text-[#f9edffcc]'
                >
                    { open ? (
                        <FaCaretDown className="size-4"></FaCaretDown>
                    ) : (
                        <FaCaretRight className="size-4"></FaCaretRight>
                    )}
                </Button>

                <Button
                    variant="transparent"
                    size="sm"
                    className="group px-1.5 text-sm text-[#f9edffcc] h-[30px] justify-start items-center overflow-hidden"
                >
                    <span> {label} </span>
                </Button>

                {onIconClick && (
                    <Button
                        variant="transparent"
                        size="iconSm"
                        className='hover:bg-slack-dark transition opacity ml-auto p-0.5 text-sm size-6 text-[#f9edffcc]'
                        onClick={onIconClick}
                    >
                        <PlusIcon className="size-4"></PlusIcon>
                    </Button>
                )}
            </div>

            {open && children}
        </div>
    );
};

export default WorkspacePanelSection;