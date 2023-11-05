'use client';
import * as React from "react";
import { createPortal } from "react-dom";

interface ModalInterface {
    children: React.ReactNode;
    isOpen: boolean;
}

export default function Modal({ children, isOpen }: ModalInterface) {
    return isOpen ? createPortal(<div className="absolute p-4 top-0 left-0 h-full w-full flex justify-center items-center bg-neutral-800 bg-opacity-20 transition-all duration-300 ease-in">
        <div className="shadow-lg rounded-lg p-6 bg-white">
            {children}
        </div>
    </div>, document.getElementById('modal') || document.body) : null;
}