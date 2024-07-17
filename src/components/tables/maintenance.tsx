import React from "react";

interface MaintenanceProps {
  onItemChecked: (itemName: string, isChecked: boolean) => void;
}

const Maintenance: React.FC<MaintenanceProps> = ({ onItemChecked }) => {
  const maintenanceItems = [
    { id: 1, name: "Line of Code" },
    { id: 2, name: "Complexity" },
    { id: 3, name: "Code Efficiency" },
    { id: 4, name: "Cost" },
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, itemName: string) => {
    onItemChecked(itemName, e.target.checked);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg mt-8" style={{ maxWidth: "16rem" }}>
      <h2 className="text-xl font-bold text-left">Maintenance</h2>
      <div className="flex flex-col space-y-2">
        {maintenanceItems.map((item) => (
          <label key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600 checked:bg-green-500"
              onChange={(e) => handleCheckboxChange(e, item.name)}
            />
            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
