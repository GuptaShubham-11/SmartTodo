import { CheckCheck } from 'lucide-react';
import './Toast.css';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
}

const Toast = ({ message, type }: ToastProps) => {
    return (
        <div className={`toast ${type}`}>
            <span className="toast-icon">{type === 'success' ? <CheckCheck /> : '🔴'}</span>
            <span className="toast-msg">{message}</span>
        </div>
    );
};

export default Toast;
