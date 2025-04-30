const BASE_URL = "https://headout-server-1.onrender.com/api";

export const fetchQuestion = async () => {
  const res = await fetch(`${BASE_URL}/game/question`);
  return await res.json();
};

export const submitAnswer = async (username, questionId, selectedAnswer) => {
  const res = await fetch(`${BASE_URL}/game/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, questionId, selectedAnswer }),
  });
  return await res.json();
};

export const registerUser = async (username) => {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  return await res.json();
};

export const getUserScore = async (username) => {
  const res = await fetch(`${BASE_URL}/game/score/${username}`);
  return await res.json();
};
