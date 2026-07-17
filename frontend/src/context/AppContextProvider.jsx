import combineContext from '@/utils/combineContex';

import { AuthContextProvider } from './AuthContext';
import { CreateChannelContextProvide } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { WorkspaceContextProvider } from './WorkspaceContext';
import { WorkspacePreferenceContextProvider } from './WorkspacePreferencesModalContext';

const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceContextProvider,
    CreateChannelContextProvide,
    WorkspaceContextProvider
);

export default AppContextProvider;