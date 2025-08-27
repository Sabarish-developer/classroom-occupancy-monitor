import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLast,
  ChevronFirst,
  ChevronLeft,
  AppWindow,
  Cpu,
  Menu,
  CircleUserRound
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';
import { useAuth } from "../hooks/use-auth";
import { logout } from "../services/api";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) setOpen(false);
    else setOpen(true);
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const {user, setUser} = useAuth();
  const navigate = useNavigate();

  const Nav_animation = isTabletMid
    ? {
        open: { x: 0, width: "16rem", transition: { damping: 40 } },
        closed: {
          x: -250,
          width: 0,
          transition: { damping: 40, delay: 0.15 },
        },
      }
    : {
        open: { width: "16rem", transition: { damping: 40 } },
        closed: { width: "4rem", transition: { damping: 40 } },
      };

  return (
    <div>
      {/* Overlay for mobile */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        }`}
      ></div>

      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] 
          overflow-hidden md:relative fixed h-screen"
      >
        {/* Logo */}
        <div className="flex items-center font-medium border-b py-3 border-slate-300 mx-3">
          <img
            src={logo}
            width={40}
            alt="logo"
            className={`${!open ? "hidden" : "inline"}`}
          />

          {/* OccupiX text with animation */}
          <AnimatePresence>
            {open && (
              <motion.span
                key="occupix"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="text-xl flex-1 font-bold whitespace-pre"
              >
                OccupiX
              </motion.span>
            )}
          </AnimatePresence>

          {/* Chevron toggle */}
          <div className="hidden md:flex mx-auto" onClick={() => setOpen(!open)}>
          <AnimatePresence mode="sync">
            {open ? (
              <motion.div
                key="first"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronFirst
                  size={25}
                  className="hover:bg-[#0a7a1e] hover:text-white cursor-pointer rounded-full p-1 transition-colors duration-300"
                />
              </motion.div>
            ) : (
              <motion.div
                key="last"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronLast
                  size={25}
                  className="hover:bg-[#0a7a1e] hover:text-white cursor-pointer rounded-full p-1 transition-colors duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>

        {/* Menu items */}
        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-2 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/dashboard"} className="flex items-center gap-2 text-base md:text-sm lg:text-lg p-2 hover:text-white hover:bg-[#0a7a1e]">
                <AppWindow size={25} className="min-w-max" />
                <span className={`${!open ? "hidden" : "inline"} duration-200 flex-1`}>
                  Dashboard  
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/genai"} className="flex items-center gap-2 text-base md:text-sm lg:text-lg p-2 hover:text-white hover:bg-[#0a7a1e]">
                <Cpu size={25} className="min-w-max" />
                <span className={`${!open ? "hidden" : "inline"} duration-200`}>
                  Gen AI
                </span>
              </NavLink>
            </li>
          </ul>

          {/* Footer plan */}
          {open && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex flex-col gap-2 border-y border-slate-300 p-4">
                <div className="flex items-center justify-around">
                  <CircleUserRound size={30} className="min-w-max"/>
                  <div>
                    <p>{user?.name || 'username'}</p>
                    <small>{user?.email || 'username@rajalakshmi.edu.in'}</small>
                  </div>
                </div>
                <Button variant='destructive' onClick={() => logout({setUser, navigate})} className='cursor-pointer'>
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>

      </motion.div>

      {/* Hamburger menu for mobile */}
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <Menu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
