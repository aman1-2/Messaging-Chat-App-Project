import { WorkspaceNavbar } from '@/components/organism/Workspace/WorkspaceNavbar';
import { WorkspaceSidebar } from '@/components/organism/Workspace/WorkspaceSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';


export const WorkspaceLayout = ({ children }) => {
    return(
        <div className="h-screen">
            <WorkspaceNavbar />
            <div className="flex h-[calc(100vh-40px)]">
                <WorkspaceSidebar />
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel
                        id="left-navigation-panel"
                        defaultSize="20%"
                        minSize="11%"
                        className="bg-slack-medium"
                    >
                        <div>
                            Sidebar
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel
                        id="right-navigation-panel"
                        minSize = "20%"
                    >
                        { children }
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};