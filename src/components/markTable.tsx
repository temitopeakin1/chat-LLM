import React, { useEffect, useState } from "react";

interface MarkTableProps {
  data: ResponseItem[]; // Adjusted to use ResponseItem[] instead of any[]
}

interface Param {
  name: string;
  value: string;
}

interface AdditionalNotes {
  totalScoreExplanation: string;
  githubLinks: string;
}

interface ResponseItem {
  params: Param[];
  additionalNotes: AdditionalNotes;
  summary: string;
  techStack: string;
  totalScore: string;
}

interface DetailedSolution {
  response: string;
  original_response: string;
}

const MarkTable: React.FC<MarkTableProps> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [detailedSolutions, setDetailedSolutions] = useState<DetailedSolution[]>([]);
  const [tableData, setTableData] = useState<ResponseItem[]>([]); // State for table data

  // Function to toggle expanded state of a row and fetch detailed solution
  const toggleRowExpand = async (index: number, techStack: string) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      try {
        const response = await fetch(
          "https://fab-team-services.xyz/generate-detailed-solution",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: "123",
              requestID: "43223",
              tech_stack: techStack,
              user_input: "I want to build a web application using Python and Django.",
              proposed_solution: `Use ${techStack}`,
              model_id: "anthropic.claude-3-haiku-20240307-v1:0",
              temperature: 0.8,
              max_tokens: 1000,
            }),
          }
        );

        const result = await response.json();
        const newDetailedSolution: DetailedSolution = {
          response: result.response,
          original_response: result.original_response,
        };

        setDetailedSolutions([...detailedSolutions, newDetailedSolution]);
        setExpandedRows([...expandedRows, index]);
      } catch (error) {
        console.error("Error fetching detailed solution:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fab-team-services.xyz/generate-solutions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: "3b125dbd-ef03-44c6-85b6-beb0905e5ac1",
              requestID: "39b710a7-0be3-4ada-8d5b-370d0808140d",
              modelParameter: {
                temperature: 0.9,
              },
              user_input:
                "Recommend automation tools for streamlining workflows with high reliability and user-friendly interfaces.",
              filters: ["complexity", "scalability", "cost", "time"],
              model_id: "anthropic.claude-3-haiku-20240307-v1:0",
              evaluationCriteria:
                "Total score is calculated as 2 (Medium) + 5 (High) + 5 (High)",
            }),
          }
        );

        const result = await response.json();
        setTableData(result.response); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300 font-Inter">
            <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">
              AUTHENTICATION MODULES
            </th>
            <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">
              MAINTENANCE
            </th>
            <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">
              DEPENDENCY
            </th>
            <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">
              COMPLEXITY
            </th>
            <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">
              LEARNING CURVE
            </th>
            <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">
              EFFICIENCY
            </th>
            <th className="border border-gray-300 px-2 py-2 whitespace-nowrap">
              SCORE
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="border-b border-gray-300">
                <td
                  className="border border-gray-300 px-2 py-2 cursor-pointer"
                  onClick={() => toggleRowExpand(index, item.techStack)}
                >
                  {item.techStack}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {item.params.find((param: Param) => param.name === "scalability")?.value}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {item.params.find((param: Param) => param.name === "cost")?.value}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {item.params.find((param: Param) => param.name === "complexity")?.value}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {item.params.find((param: Param) => param.name === "time")?.value}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {item.params.find((param: Param) => param.name === "scalability")?.value}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {item.totalScore}
                </td>
              </tr>
              {expandedRows.includes(index) && (
                <tr>
                  <td colSpan={7} className="border border-gray-300 px-4 py-2">
                    <div className="text-sm text-gray-600 mt-2">
                      <p>{detailedSolutions[index]?.original_response}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkTable;
