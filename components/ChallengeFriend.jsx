import React from "react";

export default function ChallengeFriend({ username, userTotalScore }) {
  const handleShare = () => {
    const link = `${window.location.origin}?invitedBy=${username}`;
    const text = `🎮 Try beating my score ${userTotalScore} in the Globetrotter Challenge! 🌍 Click here: ${link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="challenge-section">
      <button onClick={handleShare}>🤝 Challenge a Friend</button>
    </div>
  );
}
