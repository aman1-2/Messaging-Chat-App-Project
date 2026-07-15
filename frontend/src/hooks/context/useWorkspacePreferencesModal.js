import { useContext } from 'react';

import WorkspacePreferenceModalContext from '@/context/WorkspacePreferencesModalContext';

const useWorkspacePreferencesModal = () => {
    return useContext(WorkspacePreferenceModalContext);
};

export default useWorkspacePreferencesModal;