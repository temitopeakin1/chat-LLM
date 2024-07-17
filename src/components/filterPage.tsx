import React, { useState } from "react";
import Form from "./form";
import { useParams } from "react-router-dom";

interface RouteParams {
  promptText: string;
  [key: string]: string | undefined; // Index signature for other potential route params
}

const FilterPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { promptText } = useParams<RouteParams>(); // Use RouteParams to type useParams

  const handleSubmit = (query: string) => {
    console.log("Submitted query:", query);
    setSubmitted(true);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        submitted ? "overflow-auto" : "overflow-hidden"
      }`}
    >
      <div className="text-right mt-16">
        <p className="pt-32 md:pt-32">{promptText}</p>
      </div>
      <div className="w-full px-8 md:px-72 align-middle">
        <p className="pt-32 md:pt-32">
          I can present tables in markdown format, which is commonly used in documentation<br />
          can be easily rendered in many platforms. Here's an example
        </p>
        <p className="py-2">Filter table by</p>
      </div>
      {/* <Form onSubmit={handleSubmit} /> */}
    </div>
  );
};

export default FilterPage;
