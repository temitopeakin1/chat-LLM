import React from "react";

const Efficiency: React.FC = () => {
  // Define an array of efficiency items
  const efficiencyItems = [
    { id: 1, name: "Latency" },
    { id: 2, name: "Concurrent User" },
    { id: 3, name: "Performance Degradation" },
  ];

  return (
    <div className="border border-gray-300 p-4 rounded-lg mt-8" style={{ maxWidth: "16rem" }}>
      <h2 className="text-xl font-bold mb-4 text-left">Efficiency</h2>
      <div className="flex flex-col space-y-2">
        {efficiencyItems.map((item) => (
          <label key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600 checked:bg-[#086224]"
            />
            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Efficiency;


