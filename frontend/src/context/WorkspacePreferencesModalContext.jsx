import { createContext, useState } from 'react';

const WorkspacePreferenceModalContext = createContext();

export const WorkspacePreferenceContextProvider = ({ children }) => {
    const [openWorkspacePreferenceModal, setOpenWorkspacePreferenceModal] = useState(false);

    const [initialValue, setInitialValue] = useState('Edit Workspace');

    const [workspace, setWorkspace] = useState(null);

    return(
        <WorkspacePreferenceModalContext.Provider 
            value={{
                openWorkspacePreferenceModal, 
                setOpenWorkspacePreferenceModal, 
                initialValue, 
                setInitialValue,
                workspace,
                setWorkspace
            }}
        >
            { children }
        </WorkspacePreferenceModalContext.Provider>
    );
};

export default WorkspacePreferenceModalContext;