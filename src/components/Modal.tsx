import { ReactNode } from 'react';

export interface ModalProps {
    title: string,
    onClose: () => any,
    children: ReactNode,
}

export const Modal = ({ title, onClose, children }: ModalProps) => (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col p-4 z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50" role="presentation" onClick={() => onClose()} />
        <div className="m-auto shadow bg-white w-50 mt-28 z-30">
            <div className="p-4 w-full border-b border-slate-100 font-semibold text-slate-500">{title}</div>
            <div className="p-4">{children}</div>
        </div>
    </div>
);

export default Modal;
