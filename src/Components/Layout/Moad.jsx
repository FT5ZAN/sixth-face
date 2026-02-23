
import useTheme from "../../Hooks/useTheme.js";

export default function ThemeToggle() {
  const [dark, setDark] = useTheme();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={dark}
        onChange={() => setDark(!dark)}
        className="sr-only peer"
      />
      
      
      <div className="w-12 h-5 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
      
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#283FE1] dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out peer-checked:left-[calc(100%-2rem)] peer-active:scale-95">
        
        <svg
          className={`w-4 h-4 text-white transition-opacity duration-300 ${
            dark ? "opacity-0 absolute" : "opacity-100"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z" />
        </svg>

        <svg
          className={`w-4 h-4 text-white transition-opacity duration-300 ${
            dark ? "opacity-100" : "opacity-0 absolute"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z" />
        </svg>

       
        <span className="absolute inset-0 rounded-full bg-white/20 scale-0 peer-active:scale-100 transition-transform duration-300" />
      </div>
    </label>
  );
}