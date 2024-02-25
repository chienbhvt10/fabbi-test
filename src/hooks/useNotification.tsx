import { useContext } from 'react';
import NotificationContext, {
    NotificationContextValue,
} from '../contexts/NotificationContext';

const useNotification = (): NotificationContextValue => {
    const notificationContext = useContext(NotificationContext);

    if (!notificationContext) {
        throw new Error('Forgot to wrap component in NotificationProvider');
    }

    return notificationContext;
};

export default useNotification;
