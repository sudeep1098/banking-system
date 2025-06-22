import { Snackbar, Alert } from '@mui/material';
import { useToastContext } from '@/context/ToastContext';

const Toaster = () => {
    const { toasts, removeToast } = useToastContext();

    return (
        <>
            {toasts.map((toast) => (
                <Snackbar
                    key={toast.id}
                    open
                    autoHideDuration={4000}
                    onClose={() => removeToast(toast.id)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Alert
                        onClose={() => removeToast(toast.id)}
                        severity={toast.variant || 'info'}
                        sx={{ width: '100%' }}
                    >
                        {toast.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    );
};

export default Toaster;
