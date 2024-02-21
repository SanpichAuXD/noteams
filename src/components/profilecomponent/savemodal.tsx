import React from 'react'


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }

const savemodal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <div className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'}`}>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
              <p>This action cannot be undone.</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-500 text-white p-2 mr-2 rounded"
                  onClick={onConfirm}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default savemodal