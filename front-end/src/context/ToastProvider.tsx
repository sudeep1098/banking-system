import { useCallback, useState } from 'react';
import { ToastContext, type ToastProps, type ToastVariant } from './ToastContext';
import Toaster from '@/components/common/ToastContainer';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const toast = useCallback((variant: ToastVariant = 'info', message: string) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, variant, message }]);
        setTimeout(() => removeToast(id), 4000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast, toasts, removeToast }}>
            {children}
            <Toaster />
        </ToastContext.Provider>
    );
};
