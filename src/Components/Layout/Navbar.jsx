import ThemeToggle from "./Moad";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
function Navbar() {
  const location = useLocation();
  const { id } = useParams(); 
  const account = useSelector((state) =>
    state.accounts.accounts.find((acc) => acc.id === id),
  );
  
    const getTitle = () => {
    if (location.pathname.startsWith("/account/") && account) {
      return account.name; 
    }

    switch (location.pathname) {
      case "/":
        return "Accounts";
      case "/Reports":
        return "Reports";
      case "/Storage":
        return "Storage";
      default:
        return "Track.com";
    }
  };
   const titleRef = useRef(null);
const [isOverflowing, setIsOverflowing] = useState(false);

useEffect(() => {
  const el = titleRef.current;
  if (el) {
    setIsOverflowing(el.scrollWidth > el.clientWidth);
  }
}, [account, location.pathname]);
  return (
    <>
      <div
        className="
                        bg-[#ACB2E5]
                        backdrop-blur-3xl
                        dark:bg-zinc-800/30
                        w-full
                        h-[9vh]
                        rounded-t-md
                        flex
                        items-center
                        justify-between
                        md:px-6
                        px-3
                        border-b
                        border-zinc-800/30
                         "
      >
       
        <div className="overflow-hidden max-w-[400px] md:max-w-[800px] flex items-center justify-center ">
  <h1
    ref={titleRef}
    className={`text-2xl font-bold whitespace-nowrap ${
      isOverflowing ? "animate-marquee" : ""
    }`}
  >
    {getTitle()}
  </h1>
</div>
        <div className=" flex items-center justify-center ">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default Navbar;
