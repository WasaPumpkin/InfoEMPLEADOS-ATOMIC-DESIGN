//src/components/molecules/CompletionForm/CompletionForm.tsx
import React from 'react';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

interface CompletionFormProps {
  completionMessage: string;
  onCompletionMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CompletionForm: React.FC<CompletionFormProps> = ({
  completionMessage,
  onCompletionMessageChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="completion-modal__body">
      <Input
        type="text"
        placeholder="Describe your work"
        value={completionMessage}
        onChange={onCompletionMessageChange}
        className="completion-modal__input"
      />
      <div className="completion-modal__actions">
        <Button onClick={onSubmit}>Submit</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default CompletionForm;
