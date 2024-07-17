import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "./icons/send";


interface FormData {
  onSubmit: (query: string) => void;
  disabled: any;
  query: any;
  setQuery: any;
}

const Form: React.FC<FormData> = ({ onSubmit, disabled, query, setQuery }) => {
  const [userId, setUserId] = useState('');
  // const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery("")
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center items-center px-10 mb-5">
      <div className="relative flex items-center rounded-full border-gray-200 py-2 w-full">
        <input
          type="text"
          value={query}
          onChange={e => {setQuery(e.target.value)}}
          className="appearance-none bg-[#F3F5F4] border-none w-full rounded-full text-gray-700 py-4 px-10 md:pl-4 leading-tight focus:outline-none"
          required
          disabled={disabled}
          placeholder="Describe what you want to see"
        />
        <button
          type="submit"
          className="absolute right-0 mr-3 focus:outline-none"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

export default Form;
