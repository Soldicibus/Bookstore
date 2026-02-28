import React from 'react';
import Modal from './Modal';

export default function ErrorModal({ error, onClose }) {
  return (
    <Modal isOpen={!!error} onClose={onClose} title="Error" zIndex={9999}>
      <div className="text-red-600 mb-4">
        {error}
      </div>
      <div className="flex justify-end pt-4" style={{ zIndex: 5000 }}>
        <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            Close
        </button>
      </div>
    </Modal>
  );
}
