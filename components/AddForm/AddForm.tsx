import { useState } from "react";

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
      <div className="app-form add-form">
        <p>Add new Activity</p>
        <input
          type="text"
          value={nodeName}
          onChange={onNodeNameChange}
          placeholder="New Activity"
        />
        <input type="button" onClick={handleSubmit} value="Add Activity" />
      </div>
    </div>
  );
};

export default AddForm;
