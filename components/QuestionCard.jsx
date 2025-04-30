import React from "react";

export default function QuestionCard({ clues, options, onSubmit }) {
  return (
    <div className="card">
      <h2>Guess the Destination</h2>
      <ul>
        {clues.map((clue, idx) => (
          <li key={idx}>🧩 {clue}</li>
        ))}
      </ul>
      <div className="options">
        {options.map((option, idx) => (
          <button key={idx} onClick={() => onSubmit(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
