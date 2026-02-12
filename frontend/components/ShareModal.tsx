import Copy from "@/public/icons/Copy";
import Cross from "@/public/icons/Cross";
import React from "react";

const ShareModal = ({ onShareClick }: { onShareClick: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70  "></div>
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg max-w-xl">
        <div className="flex justify-between px-2 items-center mb-4 ">
          <h2 className="text-xl font-bold py-1">Share Your Brain</h2>
          <button onClick={onShareClick}>
            <Cross />
          </button>
        </div>
        <p className="my-4 text-text-sec">
          We’re building a second brain app. An app where you can come, add
          content from various sources Twiitter, Youtube, Google docs and store
          it in a centralized place. In the future, it would be good for us to
          create embeddings from this data and allow users to search through
          their existing data
        </p>
        <button className=" flex justify-center gap-4 hover:text-text-pri rounded-xl animate-all duration-300 items-center  bg-text-ter text-text-quad  w-full py-2  text-xl font-medium shadow-card">
          <Copy />
          Share Brain
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
