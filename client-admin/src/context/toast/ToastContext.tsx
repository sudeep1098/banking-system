import { createContext, useContext } from 'react';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: number;
  variant?: ToastVariant;
  message: string;
}

interface ToastContextType {
  toast: (variant: ToastVariant, message: string) => void;
  toasts: ToastProps[];
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToastContext must be used within a ToastProvider');
  return context;
};
