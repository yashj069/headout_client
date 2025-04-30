import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import ScoreBoard from "./ScoreBoard";
import UsernameForm from "./UsernameForm";
import ChallengeFriend from "./ChallengeFriend";
import {
  fetchQuestion,
  submitAnswer,
  registerUser,
  getUserScore,
} from "../api/index";

export default function App() {
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [userTotalScore, setUserTotalScore] = useState(0);

  const loadQuestion = async () => {
    const q = await fetchQuestion();
    setQuestion(q);
    setResult(null);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviter = params.get("invitedBy");
    if (inviter) {
      getUserScore(inviter).then((data) => {
        alert(
          `🎯 ${inviter}'s Score — ✅ ${data.correct}, ❌ ${data.incorrect}`
        );
      });
    }
  }, []);

  const handleUsernameSubmit = async (name) => {
    const res = await registerUser(name);
    if (res.username) {
      setUsername(name);
      setUserTotalScore(res.score);
      loadQuestion();
    } else {
      alert("Username already taken or invalid. Try another.");
    }
  };

  const handleSubmit = async (selectedAnswer) => {
    const res = await submitAnswer(username, question.id, selectedAnswer);
    setResult(res);
    setScore((prev) => ({
      correct: prev.correct + (res.correct ? 1 : 0),
      incorrect: prev.incorrect + (!res.correct ? 1 : 0),
    }));
  };

  const handlePlayAgain = () => {
    setScore({
      correct: 0,
      incorrect: 0,
    });
    loadQuestion();
  };

  if (!username) {
    return <UsernameForm onSubmit={handleUsernameSubmit} />;
  }

  return (
    <div className="app">
      <h1>🌍 Globetrotter Challenge</h1>
      <ScoreBoard score={score} username={username} />
      <ChallengeFriend username={username} userTotalScore={userTotalScore} />
      {question && !result && (
        <QuestionCard
          clues={question.clues}
          options={question.options}
          onSubmit={handleSubmit}
        />
      )}
      {result && (
        <ResultCard
          result={result}
          onNext={loadQuestion}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
