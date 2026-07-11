import combineContext from '@/utils/combineContex';

import { AuthContextProvider } from './AuthContext';

const AppContextProvider = combineContext(
    AuthContextProvider
);

export default AppContextProvider;