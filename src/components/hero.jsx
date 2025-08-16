import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveRight, ArrowRight, CirclePlay } from "lucide-react";
import template from "../assets/background.png";

export const Hero = () => {
    return (
       <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center m-16">
        {/* Tagline button */}
        <div className="flex justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a7a1e] bg-[#daffdd] py-2 px-6 shadow-md rounded-full hover:bg-[#b8ffbe] transition-colors duration-200"
          >
            Super Charge your Campus space!
            <MoveRight size={23} color="#0a7a1e" />
          </Link>
        </div>

        {/* Heading */}
        <h1 className="font-sans mt-12 text-4xl lg:text-6xl tracking-wide font-bold text-black text-center">
          <div className="flex flex-col gap-4">
            <p>Find free rooms without hassle</p>
            <p>Transform Campus Life with Digital Twins!!!</p>
          </div>
        </h1>

        {/* Description */}
        <p className="mt-12 text-center text-neutral-500 max-w-4xl">
          Stay ahead with ClassVision, the smart classroom occupancy app. 
          Check availability, monitor usage, and analyze insights—all in real time. 
          Transform your campus efficiency with ease
        </p>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row justify-center my-12 gap-5 lg:gap-20">
          <Link
            to="/dashboard"
            className="cursor-pointer inline-flex items-center gap-2 text-white bg-[#0a7a1e] px-5 py-2 rounded-full shadow-md hover:bg-white hover:text-[#0a7a1e] transition-colors duration-200 group"
          >
            Get Started
            <ArrowRight
              size={25}
              className="text-white group-hover:text-[#0a7a1e] transition-colors duration-200"
            />
          </Link>

          <a
            href="https://www.youtube.com"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full shadow-lg text-black hover:bg-[#0a7a1e] hover:text-white transition-colors duration-200 group"
          >
            <CirclePlay
              size={32}
              className="text-black group-hover:text-white transition-colors duration-200"
            />
            Watch Demo
          </a>
        </div>

        {/* Image */}
        <img
          src={template}
          alt="dashboard"
          className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg object-cover"
        />
      </div>
    </motion.div>
    );
}