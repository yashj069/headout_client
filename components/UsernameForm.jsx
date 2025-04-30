import React, { useState } from "react";

export default function UsernameForm({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="username-form">
      <h2>Enter a Unique Username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your username..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}
