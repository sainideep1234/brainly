"use client";

import Add from "@/public/icons/Add";
import Share from "@/public/icons/Share";
import DocumentCard from "./DocumentCard";
import YoutubeCard from "./YoutubeCard";
import LazyTweet from "./TwitCard";
import Search from "@/public/icons/Search";
import { useEffect, useState } from "react";

const Herosection = ({
  onShareClick,
  onAddClick,
}: {
  onShareClick: () => void;
  onAddClick: () => void;
}) => {
  return (
    <>
      (
      <div className="flex-1 bg-bg-hero py-6 px-10">
        <div className="flex justify-between my-8">
          <h1 className="text-2xl text-text-pri px-8 font-extrabold">
            ALL NOTES
          </h1>
          <div className="max-w-xl border-border border flex-1 rounded-xl items-center gap-4 flex text-lg hover:ring-1 ring-gray-500 px-4 py-1  shadow-card">
            <Search />
            <input
              type="text"
              placeholder="search your query..."
              className="focus:outline-0 placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={onShareClick}
              className="flex items-center gap-4 text-text-sec px-4 py-1 bg-btn-sec rounded-md shadow-card hover:shadow hover:text-text-pri"
            >
              <Share />
              Share Brain
            </button>
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 text-text-quad px-4 py-2 bg-btn-pri rounded-md shadow-card hover:shadow hover:text-text-pri"
            >
              <Add />
              Add Content
            </button>
          </div>
        </div>
        <div className="my-10 columns-3 gap-4 space-y-4">
          <DocumentCard />
          <YoutubeCard />
          <YoutubeCard />
          <YoutubeCard />
          <YoutubeCard />
          <YoutubeCard />
          <YoutubeCard />
          <YoutubeCard />
          <YoutubeCard />
          <YoutubeCard />
          <LazyTweet id="2017689592183312471" />
          <LazyTweet id="2019051177099530392" />
          <LazyTweet id="2018997558157152764" />
          <LazyTweet id="2018997558157152764" />
          <LazyTweet id="2018997558157152764" />
          <LazyTweet id="2018997558157152764" />
          <LazyTweet id="2018997558157152764" />
          <LazyTweet id="2018997558157152764" />
        </div>
      </div>
      )
    </>
  );
};

export default Herosection;
