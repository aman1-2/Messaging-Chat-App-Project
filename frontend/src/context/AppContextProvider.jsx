import combineContext from '@/utils/combineContex';

import { AuthContextProvider } from './AuthContext';
import { CreateChannelContextProvide } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { WorkspacePreferenceContextProvider } from './WorkspacePreferencesModalContext';
import { WorkspaceContextProvider } from './WorkspaceContext';

const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceContextProvider,
    CreateChannelContextProvide,
    WorkspaceContextProvider
);

export default AppContextProvider;