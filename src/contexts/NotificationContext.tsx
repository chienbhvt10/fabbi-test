import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import type { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import type { ReactNode, SyntheticEvent } from 'react';
import { createContext, forwardRef, useCallback, useState } from 'react';

const AlertMessage = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <Alert ref={ref} {...props} />
));

export interface Settings {
    message: string | null | JSX.Element;
    severity?: AlertProps['severity'];
}

export type NotificationContextValue = (config: Settings) => void;

export const NotificationContext =
    createContext<NotificationContextValue | null>(null);

const initialSettings: Settings = {
    message: null,
};

interface Props {
    children: ReactNode;
}

const NotificationProvider = (props: Props) => {
    const { children } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [settings, setSettings] = useState<Settings>(initialSettings);

    const { message, severity = 'success' } = settings;

    const handleClose = async (
        _event: SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const setNotification = useCallback((settings: Settings) => {
        setSettings((state) => ({
            ...state,
            ...settings,
        }));
        setOpen(true);
    }, []);

    return (
        <NotificationContext.Provider value={setNotification}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
                <AlertMessage
                    onClose={handleClose}
                    severity={severity}
                    action={
                        <IconButton color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {message}
                </AlertMessage>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export { NotificationProvider, NotificationContext as default };
