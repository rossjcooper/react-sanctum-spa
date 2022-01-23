import { toast, ToastContent } from 'react-toastify';

export const successToast = (content: ToastContent) => {
    toast(content, {
        className: 'bg-lime-400 text-lime-900',
    });
};

export const errorToast = (content: ToastContent) => {
    toast(content, {
        className: 'bg-red-400 text-red-900',
    });
};

export const warnToast = (content: ToastContent) => {
    toast(content, {
        className: 'bg-amber-400 text-amber-900',
    });
};

export default toast;
