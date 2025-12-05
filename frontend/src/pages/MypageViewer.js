// src/pages/MypageViewer.js
import React from "react";

export default function MypageViewer() {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      <iframe
        src="/mypage.html"
        title="My Static Page"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        // allow same origin so console errors inside iframe are visible in DevTools if needed
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
}
