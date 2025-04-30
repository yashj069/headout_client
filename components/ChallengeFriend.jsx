import React from "react";
import html2canvas from "html2canvas";
import axios from "axios";

const ChallengeFriend = React.forwardRef((props, inviteCardRef) => {
  const { username, userTotalScore, inviter, inviterScore } = props;

  const handleShare = async () => {
    if (!inviteCardRef.current) return;

    try {
      const canvas = await html2canvas(inviteCardRef.current);
      const dataUrl = canvas.toDataURL("image/png");

      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "headout");
      formData.append("dgiycisrj", "headout");

      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/dgiycisrj/image/upload";
      const res = await axios.post(cloudinaryUrl, formData);

      const imageUrl = res.data.secure_url;

      const link = `${window.location.origin}?invitedBy=${username}`;
      const text = `🎮 Try beating my score of ${userTotalScore} in the Globetrotter Challenge!\n\n🌍 ${link}\n\n📸 Preview:\n${imageUrl}`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Error sharing invite:", err);
    }
  };

  return (
    <div className="challenge-section">
      {inviter && (
        <div
          id="invite-card"
          style={{
            alignItems: "center",
            width: "300px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#e3f2fd",
            color: "#0d47a1",
            textAlign: "center",
            fontFamily: "Arial",
            marginBottom: "1rem",
          }}
        >
          <h2>🌍 Globetrotter Challenge</h2>
          <p>
            Invited by: <strong>{inviter}</strong>
          </p>
          <p>
            Score to beat: <strong>{inviterScore}</strong>
          </p>
        </div>
      )}

      <button onClick={handleShare}>🤝 Challenge a Friend</button>
    </div>
  );
});

export default ChallengeFriend;
