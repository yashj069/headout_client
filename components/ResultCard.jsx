import React from "react";

export default function ResultCard({ result, onNext, onPlayAgain }) {
  return (
    <div className="result">
      <h2>{result.correct ? "🎉 Correct!" : "😢 Oops!"}</h2>
      <p>Answer: {result.correctAnswer}</p>
      <p>🎈 Fun Fact: {result.funFact}</p>
      <div className="result-btns">
        <button className="play-again-btn" onClick={onPlayAgain}>
          🔁 Play Again
        </button>
        <button className="next-btn" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
