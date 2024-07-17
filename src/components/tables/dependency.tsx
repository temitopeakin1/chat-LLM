import React from "react";

interface DependencyProps {
  initialChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
}

const Dependency: React.FC<DependencyProps> = ({ initialChecked, onCheckedChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(e.target.checked);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg mt-8" style={{ maxWidth: "16rem" }}>
      <h2 className="text-xl font-bold mb-4 text-left">Dependency</h2>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={initialChecked}
            onChange={handleCheckboxChange}
          />
          <span>External Dependency</span>
        </label>
      </div>
    </div>
  );
};

export default Dependency;
