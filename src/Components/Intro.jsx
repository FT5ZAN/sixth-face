






import { useEffect, useState } from "react";
import logo from "../Assets/intrologo.png";

function Intro({ onComplete }) {
  const [visible, setVisible] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 100);
    const leave = setTimeout(() => setExit(true), 2500);
    const done = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(enter);
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 overflow-hidden">

      {/* Premium radial glow background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          visible ? "opacity-60" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(37,99,235,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Subtle floating light effect */}
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full animate-pulse" />

      {/* Main logo container */}
      <div
        className={`relative transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          exit
            ? "scale-75 opacity-0"
            : visible
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0"
        }`}
      >
        {/* Glow behind logo */}
        <div className="absolute inset-0 blur-2xl bg-blue-500/40 rounded-2xl scale-125 opacity-70" />

        <img
          src={logo}
          alt="Track logo"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative z-10 drop-shadow-[0_0_40px_rgba(37,99,235,0.6)]"
        />
      </div>

      {/* Elegant fade overlay for exit smoothness */}
      <div
        className={`absolute inset-0 bg-zinc-950 transition-opacity duration-1000 ${
          exit ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default Intro;








