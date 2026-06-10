import React from "react";
import Sibebutton from "./Sibebutton";
import Twitter from "@/public/icons/Twitter";
import Hash from "@/public/icons/Hash";
import Link from "@/public/icons/Link";
import Document from "@/public/icons/Document";
import Youtube from "@/public/icons/Youtube";

const Sidebar = () => {
  return (
    <div className="w-64 min-w-[256px] h-screen sticky top-0 bg-bg-side border-r border-border flex flex-col justify-between py-8 px-6 select-none">
      <div>
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <svg className="w-8 h-8 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Brainly
          </span>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1">
          <Sibebutton name={"Tweet"}>
            <Twitter />
          </Sibebutton>
          <Sibebutton name={"Videos"}>
            <Youtube />
          </Sibebutton>
          <Sibebutton name={"Documents"}>
            <Document />
          </Sibebutton>
          <Sibebutton name={"Links"}>
            <Link />
          </Sibebutton>
          <Sibebutton name={"Tags"}>
            <Hash />
          </Sibebutton>
        </nav>
      </div>

      {/* Footer Area of Sidebar */}
      <div className="px-2 pt-4 border-t border-border/50 text-xs text-text-sec flex justify-between items-center">
        <span>© 2026 Brainly</span>
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="text-violet-400 hover:text-violet-300 font-semibold hover:underline cursor-pointer bg-transparent border-0 outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
