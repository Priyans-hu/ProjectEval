import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ConfirmationBox = ({ onConfirm, onCancel }) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-[90%]">
                        <h1 className="text-lg font-bold mb-4">Confirm Submission</h1>
                        <p className="text-sm text-gray-700 mb-6">Are you sure you want to submit? This will lock the student, and it cannot be changed in the future.</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => {
                                    onClose();
                                    onConfirm();
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    });
};

export default ConfirmationBox;