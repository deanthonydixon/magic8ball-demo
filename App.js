import React, { useState } from "react";

const API_URL =
  "https://8xw8h6wbd8.execute-api.us-east-1.amazonaws.com/prod/ask"; // Replace with your API Gateway URL

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askMagic8Ball = async () => {
    console.log("Button clicked! Fetching from API...");

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Extract the message from the response
      const message = JSON.parse(data.body).message;
      setAnswer(message); // Update the answer state with the extracted message
    } catch (error) {
      console.error("Error fetching response:", error);
      setAnswer("Something went wrong!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎱 Magic 8-Ball</h1>
      <input
        type="text"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <br />
      <br />
      <button
        onClick={askMagic8Ball}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Ask the Magic 8-Ball
      </button>
      {answer && (
        <h2 style={{ marginTop: "20px", color: "purple" }}>{answer}</h2>
      )}
    </div>
  );
}

export default App;
