import { useContext } from 'react';
import RootContext, { RootContextValue } from '../contexts/RootContext';

// tracking context for wrap application, check context exists
const useRootContext = (): RootContextValue => {
    const rootContext = useContext(RootContext);

    if (!rootContext) {
        throw new Error('Forgot to wrap component in RootContext');
    }

    return rootContext;
};

export default useRootContext;
