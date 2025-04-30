import React, { useState, useEffect, useRef } from "react";
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
  const [error, setError] = useState("");
  const [inviterScore, setInviterScore] = useState(0);
  const params = new URLSearchParams(window.location.search);
  const inviter = params.get("invitedBy");
  const inviteCardRef = useRef(null);

  const loadQuestion = async () => {
    const q = await fetchQuestion();
    setQuestion(q);
    setResult(null);
  };

  useEffect(() => {
    if (inviter) {
      getUserScore(inviter).then((data) => {
        setInviterScore(data.score);
        alert(`🎯 ${inviter}'s Score — ${data.score}`);
      });
    }
  }, []);

  const handleUsernameSubmit = async (name) => {
    if (inviter && name.trim().toLowerCase() === inviter?.toLowerCase()) {
      setError("You cannot use the same name as the inviter!");
      return;
    }
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
    if (res.correct) {
      setUserTotalScore((prev) => prev + 1);
    }
  };

  const handlePlayAgain = () => {
    setScore({
      correct: 0,
      incorrect: 0,
    });
    loadQuestion();
  };

  if (!username) {
    return <UsernameForm onSubmit={handleUsernameSubmit} error={error} />;
  }

  return (
    <div className="app" ref={inviteCardRef}>
      <div className="total-score">Total Score: {userTotalScore}</div>
      {inviter && score.correct > inviterScore && (
        <div className="win-text">You win!</div>
      )}
      <h1>🌍 Globetrotter Challenge</h1>
      <ScoreBoard score={score} username={username} />
      <ChallengeFriend
        username={username}
        userTotalScore={userTotalScore}
        inviter={inviter}
        inviterScore={inviterScore}
        ref={inviteCardRef}
      />
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
