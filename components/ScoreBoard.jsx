import React from "react";

export default function ScoreBoard({ score }) {
  return (
    <div className="scoreboard">
      ✅ Correct: {score.correct} | ❌ Incorrect: {score.incorrect}
    </div>
  );
}
