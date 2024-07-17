import React from "react";

const LearningCurve: React.FC = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg mt-8" style={{ maxWidth: "16rem" }}>
      <h2 className="text-xl font-bold mb-4 text-left">Learning Curve</h2>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
          <span>Onboarding</span>
        </label>
      </div>
    </div>
  );
};

export default LearningCurve;
