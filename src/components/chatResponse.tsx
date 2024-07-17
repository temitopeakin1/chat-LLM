import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Form from "./form";
import { v4 as uuidv4 } from 'uuid';
import { getChatBotResponse } from "../api/chatbot";

interface Prompt {
  id: number;
  text: string;
  response: string;
}

const useQuery = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

// const prompts: Prompt[] = [
//   {
//     id: 1,
//     text: "Provide tech stack solutions for IoT Home Automation development",
//     response: "Sure! Here are some tech stacks you can consider...",
//   },
//   {
//     id: 2,
//     text: "Suggest an Authentication solution and evaluate it on a High, Medium, or Low scale",
//     response:
//       "I can present tables in markdown format, which is commonly used in documentation and can\n be easily rendered in many platforms. Here's an example",
//   },
// ];

const ChatResponse: React.FC = () => {
  const urlQuery = useQuery();
  const [submitted, setSubmitted] = useState(false);
  const [prompts, setPrompts] = useState([])

  const { id } = useParams<{ id?: string }>();

  const handleSubmit = async (query: string) => {
    let userId = id;
    console.log('UserID: ', userId, '\nPrompt: ', query)
    
    const reqId = uuidv4();

    const chatBotResp = await getChatBotResponse(userId, reqId, query);

    const prompt = {
      
    }
    
   
    setSubmitted(true);
  };


  useEffect(() => {
    let userQuery = urlQuery.get('query') || '';
    handleSubmit(userQuery);
  }, [])


  return (
    <div
      className={`flex flex-col p-2 overflow-auto`}
    >
      {prompts.length > 0 && prompts.map(prompt => (
        <>
          <div className="p-2 bg-[#F3F5F4] rounded-full mb-2 md:mt-2 ml-auto">
            {/* <div className="text-[16px] text-black mb-2">{prompt.text}</div> */}
          </div>

          <div className="p-4 bg-white mt-2 mx-auto max-w-4xl">
            <div className="text-black text-justify whitespace-pre-line py-2">
              {/* {prompt.response.length > 0 ? prompt.response : ""} */}
            </div>
          </div>
        </>
      ))}
      {/* <Form onSubmit={handleSubmit} /> */}
    </div>
  );
};

export default ChatResponse;
