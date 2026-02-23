import { NavLink } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineChartBar,
  HiOutlineCloud,
} from "react-icons/hi";

function Asidebar() {
  const navItems = [
    { to: "/", icon: HiOutlineUser, label: "Accounts" },
    { to: "/Reports", icon: HiOutlineChartBar, label: "Reports" },
    { to: "/Storage", icon: HiOutlineCloud, label: "Storage" },
  ];

  return (
    <div className="w-full h-full flex flex-col item-center justify-center md:justify-start gap-6 md:gap-8 bg-[#adb2e0d9] md:backdrop-blur-3xl md:dark:bg-zinc-800/30 dark:bg-[#858586] md:bg-[#2940e354]  rounded-md">
      <div className="flex items-center hidden md:flex p-1   ">
        <img
          src="/logo.png"
          alt="logo"
          className="w-12 h-12 md:w-20 md:h-20 relative  "
        />

        <h1 className="text-xl md:text-2xl font-semibold tracking-[-0.04em] text-[black] dark:text-white  absolute left-15 md:left-17">
          Track<span className="text-[#2840E1] dark:text-[#27272A]">.</span>
        </h1>
      </div>

      <nav className="flex  justify-evenly items-center md:flex-col  md:justify-start gap-1 md:gap-2 p-3 md:p-5 ">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative group flex items-center  gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all duration-200 text-xs md:text-sm lg:text-base font-medium  md:w-full  ${
                isActive
                  ? "text-black dark:text-white bg-zinc-700/50 md:bg-white dark:bg-zinc-700/50"
                  : "text-zinc-800 dark:text-zinc-800 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8  rounded-r-full" />
                )}

                <Icon className="text-base md:text-lg lg:text-xl flex-shrink-0 sm:text-2xl  " />

                <span className="hidden md:inline">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Asidebar;
