// src/components/organisms/EditModal/EditModal.tsx
import React from 'react';
import Modal from 'react-modal';
import Input from '@components/atoms/Input/Input'; 
import Button from '@components/atoms/Button/Button'; 

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editText: string;
  onEditTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editAssignedTo: string;
  onEditAssignedToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  editText,
  onEditTextChange,
  editAssignedTo,
  onEditAssignedToChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
      className="edit-modal"
      overlayClassName="edit-modal-overlay"
    >
      <div className="edit-modal__header">Edit Task</div>
      <div className="edit-modal__body">
        <Input
          type="text"
          placeholder="Task description"
          value={editText}
          onChange={onEditTextChange}
          className="edit-modal__input"
        />
        <Input
          type="text"
          placeholder="Assigned to"
          value={editAssignedTo}
          onChange={onEditAssignedToChange}
          className="edit-modal__input"
        />
      </div>
      <div className="edit-modal__actions">
        <Button onClick={onSubmit}>Save Changes</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default EditModal;
