



import { useState } from "react";
import AppRoutes from "./Routes/AppRoutes.jsx";
import Intro from "./Components/Intro.jsx";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <Intro onComplete={() => setShowIntro(false)} />
      )}

      <div
        className={`transition-opacity duration-1000 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <AppRoutes />
      </div>
    </>
  );
}

export default App;

