import React, { useState } from "react";

import "./AddForm.scss";

interface AddFormProps {
  handleFormSubmit: (nodeName: string) => void;
}

export const AddForm: React.FC<AddFormProps> = ({ handleFormSubmit }) => {
  const [nodeName, setNodeName] = useState<string>("");

  const onNodeNameChange = (e) => {
    setNodeName(e.currentTarget.value);
  };

  const handleSubmit = () => {
    handleFormSubmit(nodeName);
  };

  return (
    <div className="add-menu">
      <label>New Activity name:</label>
      <input type="text" value={nodeName} onChange={onNodeNameChange} />
      <button onClick={handleSubmit}>Add Activity</button>
    </div>
  );
};

export default AddForm;
