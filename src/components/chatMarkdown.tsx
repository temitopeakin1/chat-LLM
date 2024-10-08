import React, { useState, useEffect, useRef } from "react";
import Form from "./form";
import { v4 as uuidv4 } from 'uuid';
import { getChatBotResponse, getMermaidCode } from "../api/chatbot";
import Mermaid from "./mermaid.jsx"
import { Bot, CircleArrowRight } from 'lucide-react';

const generateUUID = () => {
  const newId = uuidv4();
  return newId;
};

const predefinedConversation = [
  {
    user_input: "Can you help me with a system design solution for a software?",
    model_output: "Sure, can you provide more details about the software you need the design solution for?",
  },
  {
    user_input: "It's a social media platform where users can post updates and follow others.",
    model_output: "Got it. Do you have a specific tech stack in mind for this platform?",
  },
  {
    user_input: "I was thinking of using MERN stack for the development.",
    model_output: "Great choice! How many users are you expecting to handle initially and in the future?",
  },
  {
    user_input: "Initially, around 10,000 users, but we want to scale to millions eventually.",
    model_output: "Understood. Do you have any preferences for the database and storage solutions?",
  },
  {
    user_input: "I was considering MongoDB for the database and AWS S3 for storage.",
    model_output: "Perfect. Would you like to discuss the architecture now or focus on specific components?",
  }
];

const getMockChatBotResponse = async (userId: string, reqId: string, query: string) => {
  const prompt = predefinedConversation.find((conv) => conv.user_input === query);
  return new Promise<{ user_input: string, model_output: string, wantsToDraw: boolean }>((resolve) => {
    setTimeout(() => {
      if (prompt) {
        resolve({
          user_input: prompt.user_input,
          model_output: prompt.model_output,
          wantsToDraw: false
        });
      } else {
        resolve({
          user_input: query,
          model_output: "I'm sorry, I don't have a response for that.",
          wantsToDraw: false
        });
      }
    }, 1000);
  });
};

const getMockMermaidCode = async () => {
  return `
graph TD
    A[User] -->|Posts Updates| B[Web/Mobile App]
    B --> C[Backend Server]
    C --> D[API Gateway]
    D --> E[Authentication Service]
    D --> F[Post Service]
    D --> G[User Service]
    D --> H[Notification Service]
    D --> I[Follow Service]
    
    F -->|Stores Data| J[MongoDB Database]
    G -->|Stores Data| J[MongoDB Database]
    I -->|Stores Data| J[MongoDB Database]
    
    F -->|Stores Media| K[AWS S3 Storage]
    
    E --> L[Auth Database]
    
    C --> M[Load Balancer]
    M --> N[Web Servers]
    M --> O[Cache]
    
    subgraph User Interactions
        B
    end
    
    subgraph Services
        E
        F
        G
        H
        I
    end
    
    subgraph Databases
        J
        L
    end
    
    subgraph Infrastructure
        M
        N
        O
    end

`
}

const ChatInterface: React.FC = () => {
  let newId = generateUUID();
  let newReqId = generateUUID();
  const [count, setCount] = useState(0);
  const [chart, setChart] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(newId);
  const [reqId, setReqId] = useState(newReqId);
  const [prompts, setPrompts] = useState<{ id: string; text: string; response: string; }[]>([]);
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isFetchingMermaidCode, setIsFetchingMermaidCode] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = async (query: string) => {
    console.log("Submitted query:", query);
    // const reqId = uuidv4();
    const textId = uuidv4();
    console.log('userId: ', userId, ", requestId: ", reqId);
    const newPrompt = {
      id: textId,
      text: query,
      response: ""
    };
    setPrompts([...prompts, newPrompt]);
    setSubmitted(true);
    setIsFetchingResponse(true);

    // Fetch the chatbot response
    const chatBotResp = await getChatBotResponse(userId, reqId, query);
    const wantsToDraw = chatBotResp?.wantsToDraw

    if (wantsToDraw) {
      console.log("WantsToDraw", reqId, userId)
      getMermaidCodeResponse();
    }
    else {
      console.log("doesn't want to draw", reqId, userId)
    }

    setPrompts(prevPrompts =>
      prevPrompts.map(prompt =>
        prompt.id === textId ? { ...prompt, response: chatBotResp.model_output } : prompt
      )
    );
    setIsFetchingResponse(false);
  };
  console.log('currChart', chart);

  const getMermaidCodeResponse = async () => {
    setIsFetchingMermaidCode(true)
    let response = await getMermaidCode(userId, reqId);
    let mermaidCode = response.mermaid_code;
    mermaidCode = mermaidCode.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
    setChart(mermaidCode);
    setIsFetchingMermaidCode(false);
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [prompts]);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* chatbot */}
      <div className="flex flex-col items-start px-5 text-left justify-start pt-10 h-full w-1/3 bg-gray-200 relative">
        <Bot size={48} color="#00f900" className="float-start" />
        <div ref={chatContainerRef} className="no-scrollbar w-full px-4 md:px-0 pt-4" style={{ maxHeight: 'calc(70%)', transition: 'all 0.5s ease', overflowY: submitted ? "scroll" : "hidden" }}>
          {/* {!submitted && (
            <div className="grid grid-cols-2 sm:mt-20 md:mt-40 gap-4">
              <button className="h-20 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                onClick={() => handleSubmit(`Design the cloud architecture for a Real-Time Data Analytics Platform`)}
              >
                <p className="text-xs text-gray-500">Design the cloud architecture for a Real-Time Data Analytics Platform</p>
              </button>
              <button className="h-20 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                onClick={() => handleSubmit(`Create a component diagram for a Microservices-based E-commerce Application`)}
              >
                <p className="text-xs text-gray-500">Create a component diagram for a Microservices-based E-commerce Application</p>
              </button>
              <button className="h-20 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                onClick={() => handleSubmit(`Provide a sequence diagram for a Serverless Event-Driven Workflow`)}
              >
                <p className="text-xs text-gray-500">Provide a sequence diagram for a Serverless Event-Driven Workflow</p>
              </button>
              <button className="h-20 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                onClick={() => handleSubmit(`Give me a design for a Scalable API Gateway`)}
              >
                <p className="text-xs text-gray-500">Give me a design for a Scalable API Gateway</p>
              </button>
            </div>
          )} */}
          {submitted && (
            <section className="flex flex-col space-y-4">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="flex flex-col space-y-5">
                  <div className="bg-gray-100 p-4 text-sm rounded-lg rounded-tr-none shadow-md self-end text-left w-max max-w-full break-words ml-auto max-w-[60%]">
                    <strong className="text-green-500">You:</strong> {prompt.text}
                  </div>
                  {prompt.response && (
                    <div className="bg-gray-100 p-4 text-sm rounded-lg rounded-tl-none shadow-md self-start text-left w-max max-w-full break-words mr-auto max-w-[60%]">
                      <strong className="text-purple-600">Bot:</strong> {prompt.response}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
        <div className="w-full absolute bottom-0 left-0">
          <Form onSubmit={handleSubmit} disabled={isFetchingResponse} query={query} setQuery={setQuery} />
          {!isFetchingResponse && prompts.length > 2 &&
            (<div className="w-full flex justify-center items-center mb-5">
              <button
                className="bg-green-500 hover:bg-green-700 text-white flex items-center justify-between font-bold py-2 px-10 rounded"
                onClick={() => getMermaidCodeResponse()}
              >
                Generate Solution
                <CircleArrowRight size={24} color="#feffff" className="ml-3" />
              </button>

            </div>)
          }
          {!submitted && query.length == 0 && (
            <div className="w-full flex justify-center items-center">
              <div className="grid grid-cols-2 sm:mt-5 md:-mt-4 mb-5 gap-4 w-3/4">
                <button
                  className="h-10 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                  onClick={() =>
                    setQuery(
                      `Design a Cloud Architecture`
                    )
                  }
                >
                  <p className="text-xs text-gray-500">Cloud Architecture</p>
                </button>
                <button
                  className="h-10 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                  onClick={() =>
                    setQuery(
                      `Create a Component Diagram`
                    )
                  }
                >
                  <p className="text-xs text-gray-500">Component</p>
                </button>
                <button
                  className="h-10 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                  onClick={() =>
                    setQuery(
                      `Provide a Sequence Diagram`
                    )
                  }
                >
                  <p className="text-xs text-gray-500">Sequence</p>
                </button>
                <button
                  className="h-10 text-center hover:pointer hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-400 rounded flex items-center justify-center transition-shadow duration-300"
                  onClick={() =>
                    setQuery(`Design an ER Diagram`)
                  }
                >
                  <p className="text-xs text-gray-500">ER Diagram</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* preview */}
      {isFetchingMermaidCode ?
        <div className="w-2/3 h-full bg-gray-100 flex justify-center items-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
        </div>
        :
        <>
          {chart.length == 0 ?
            <div className="w-2/3 h-full flex-col justify-center items-center">
              <Mermaid
                graphDefinition={`
graph TD
    A[Root]
    A --> B1[Child 1]
    A --> B2[Child 2]
    B1 --> C1[Child 1.1]
    B1 --> C2[Child 1.2]
    B2 --> C3[Child 2.1]
    B2 --> C4[Child 2.2]
    C1 --> D1[Child 1.1.1]
    C1 --> D2[Child 1.1.2]
    C2 --> D3[Child 1.2.1]
    C2 --> D4[Child 1.2.2]
    C3 --> D5[Child 2.1.1]
    C3 --> D6[Child 2.1.2]
    C4 --> D7[Child 2.2.1]
    C4 --> D8[Child 2.2.2]
    D1 --> E1[Child 1.1.1.1]
    D2 --> E2[Child 1.1.2.1]
    D3 --> E3[Child 1.2.1.1]
    D4 --> E4[Child 1.2.2.1]
    D5 --> E5[Child 2.1.1.1]
    D6 --> E6[Child 2.1.2.1]
    D7 --> E7[Child 2.2.1.1]
    D8 --> E8[Child 2.2.2.1]
`}
              // getMermaidCodeResponse={getMermaidCodeResponse}
              // count={count}
              // setCount={setCount}
              />
            </div>
            :
            <div className="w-2/3 h-full flex justify-center items-center">
              <Mermaid
                graphDefinition={chart}
              // getMermaidCodeResponse={getMermaidCodeResponse}
              // count={count}
              // setCount={setCount}
              />
            </div>
          }
        </>}

    </div>
  );
};




export default ChatInterface;