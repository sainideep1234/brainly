import Brain from "@/public/icons/Brain";
import React from "react";
import Sibebutton from "./Sibebutton";
import Twitter from "@/public/icons/Twitter";
import Hash from "@/public/icons/Hash";
import Link from "@/public/icons/Link";
import Document from "@/public/icons/Document";
import Youtube from "@/public/icons/Youtube";

const Sidebar = () => {
  return (
    <div className="px-6 py-4 bg-bg-side">
      <div className="flex gap-4 items-center">
        <Brain />
        <span className="font-bold tracking-tighter text-2xl text-logo ">
          Second brain
        </span>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default Sidebar;
