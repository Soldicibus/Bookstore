import React from "react";

function NotFound() {
  return (
    <main style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#00633d" }}>
        <div style={{ color: "white", textAlign: "center" }}>
        <h1>404 Not Found</h1>
        <audio autoPlay>
            <source src="erro.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        </div>
    </main>
  );
}

export default NotFound;