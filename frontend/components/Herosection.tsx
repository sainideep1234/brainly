"use client";

import Add from "@/public/icons/Add";
import Share from "@/public/icons/Share";
import Search from "@/public/icons/Search";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import YoutubeCard from "@/ui/YoutubeCard";
import LazyTweet from "@/ui/TwitCard";
import DocumentCard from "@/ui/DocumentCard";
import { deleteContent } from "@/httpclients/httpclient";

const Herosection = ({
  contents,
  refreshContents,
  onShareClick,
  onAddClick,
}: {
  contents: any[];
  refreshContents: () => void;
  onShareClick: () => void;
  onAddClick: () => void;
}) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token == "" || token === "undefined") {
      router.push("/signup");
    }
  }, [router]);

  function youTubeId(url: string) {
    if (!url) return "";
    const parts = url.split("=");
    return parts[1] || "";
  }

  function tweetId(url: string) {
    if (!url) return "";
    const parts = url.split("status/");
    return parts[1] || "";
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      try {
        await deleteContent(id);
        refreshContents();
      } catch (err: any) {
        alert("Failed to delete content: " + err.message);
      }
    }
  };

  return (
    <div className="flex-1 bg-bg-hero py-6 px-10">
      <div className="flex justify-between items-center mb-8 gap-6 px-2">
        <h1 className="text-2xl text-text-pri font-extrabold tracking-tight">
          ALL NOTES
        </h1>
        <div className="max-w-xl border-border border flex-1 h-11 rounded-xl items-center gap-3 flex text-base hover:border-violet-500/50 px-4 transition-colors duration-300 bg-bg-side">
          <Search />
          <input
            type="text"
            placeholder="search your query..."
            className="bg-transparent text-text-pri focus:outline-none placeholder:text-gray-500 w-full text-base"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={onShareClick}
            className="h-11 flex items-center gap-2 text-text-sec px-4 bg-btn-sec border border-border rounded-xl hover:text-text-pri hover:bg-[#1f1b4c]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Share />
            <span>Share Brain</span>
          </button>
          <button
            onClick={onAddClick}
            className="h-11 flex items-center gap-2 text-text-quad px-4 bg-btn-pri rounded-xl hover:bg-violet-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Add />
            <span>Add Content</span>
          </button>
        </div>
      </div>
      <div className="my-10 columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {contents.map((content) => {
          if (content.type === "youtube") {
            const ytId = youTubeId(content.links || "");
            return (
              <YoutubeCard
                key={content.id}
                id={ytId}
                title={content.title}
                description={content.descriptions}
                onDelete={() => handleDelete(String(content.id))}
              />
            );
          } else if (content.type === "tweet") {
            const twId = tweetId(content.links || "");
            return (
              <LazyTweet
                key={content.id}
                id={twId}
                title={content.title}
                onDelete={() => handleDelete(String(content.id))}
              />
            );
          } else if (content.type === "document") {
            return (
              <DocumentCard
                key={content.id}
                title={content.title}
                description={content.descriptions}
                link={content.links}
                onDelete={() => handleDelete(String(content.id))}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Herosection;
