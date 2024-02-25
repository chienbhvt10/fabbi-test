import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RootProvider } from './contexts/RootContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NotificationProvider>
            <RootProvider>
                <App />
            </RootProvider>
        </NotificationProvider>
    </React.StrictMode>,
);
