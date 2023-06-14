import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';

export const RemoveConfirmationModal = (props: RemoveConfirmationModalProps) => {
    const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

    const closeModal = () => {
        props.setIsOpen(false);
    }

    const handleConfirmClick = () => {
        props.onConfirmClick();
        closeModal();
    }

    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal} initialFocus={confirmBtnRef}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-5 text-left align-middle shadow transition-all">
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Vai izņemt TL "{props.registrationNumber}" no līnijas?
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        TL "
                                        <span className="font-medium">{props.registrationNumber}</span>
                                        " tiks izņemts no
                                        <span className="font-medium"> {props.lineNumber}</span>
                                        . līnijas.
                                    </p>
                                </div>

                                <div className="mt-4 transition-colors flex justify-end gap-x-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded shadow bg-gray-200 text-gray-700 px-6 py-2 text-sm font-medium hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-75 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Atcelt
                                    </button>

                                    <button
                                        type="button"
                                        ref={confirmBtnRef}
                                        className="inline-flex justify-center rounded bg-red-500 text-white px-6 py-2 text-sm font-medium hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2"
                                        onClick={handleConfirmClick}
                                    >
                                        Izņemt
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

type RemoveConfirmationModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onConfirmClick: () => void;
    registrationNumber: string;
    lineNumber: string | number;
}