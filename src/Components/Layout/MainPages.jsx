import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Asidebar from "./Asidebar.jsx";
function MainPages() {
  return (
    <>
      <div
        className=" 
           
          w-full
          min-h-screen
          p-1
          flex
          flex-col-reverse
          md:flex-row
          justify-center
          items-center
          gap-1
           bg-white/5
           backdrop-blur-5xl
          dark:bg-zinc-800/30
          text-black
           dark:text-white
            transition-colors
             duration-300
             backdrop-filter
          "
      >
        <div
          className="
                
                w-full
                md:w-[15%]
                h-[9vh]  
                md:h-[99vh] 
                
                  rounded-md
               "
        >
          <Asidebar/>
        </div>
        <div className="
          
          w-full
          md:w-[85%]
          h-[88vh]
          md:h-[99vh]
          rounded-md
          flex
          flex-col
          justify-center
          items-center
          border-t border-gray-300 dark:border-zinc-700
          border-l border-gray-300 dark:border-zinc-700
          border-r border-gray-300 dark:border-zinc-700
        ">
          <div className="
          
           w-full
           h-[9vh]
           rounded-t-md
          ">
            <Navbar />
          </div>
          <div className="
            
             w-full
             h-[79vh]
             md:h-[90vh]
             overflow-y-auto
              [&::-webkit-scrollbar]:hidden
            [scrollbar-width:none]
            rounded-b-md
          ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPages;




