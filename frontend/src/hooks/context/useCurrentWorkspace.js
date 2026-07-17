import { useContext } from 'react';

import WorkspaceContext from '@/context/WorkspaceContext';

const useCurrentWorkspace = () => {
    return useContext(WorkspaceContext);
};

export default useCurrentWorkspace;