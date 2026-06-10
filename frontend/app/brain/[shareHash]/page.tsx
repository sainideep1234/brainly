"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSharedBrain } from "@/httpclients/httpclient";
import YoutubeCard from "@/ui/YoutubeCard";
import LazyTweet from "@/ui/TwitCard";
import DocumentCard from "@/ui/DocumentCard";

export default function SharedBrainPage() {
  const params = useParams();
  const shareHash = params.shareHash as string;

  const [username, setUsername] = useState<string>("");
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!shareHash) return;
    getSharedBrain(shareHash)
      .then((res) => {
        if (res.success) {
          setUsername(res.username);
          setContents(res.data || []);
        } else {
          setError(res.message || "Failed to load shared content");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Invalid or disabled share link");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [shareHash]);

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

  return (
    <div className="min-h-screen bg-[#050410] text-text-pri flex flex-col p-8 md:p-12 select-none">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-10 border-b border-border/45 pb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {username ? `${username}'s Brain` : "Shared Brain"}
          </h1>
        </div>
        <div className="text-sm text-text-sec font-semibold bg-[#151233] px-4 py-1.5 rounded-full border border-violet-900/50">
          Shared Space
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-text-sec text-lg font-medium animate-pulse">Loading contents...</div>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="text-red-400 text-lg font-bold">Error Accessing Shared Brain</div>
            <p className="text-text-sec max-w-md text-sm">{error}</p>
          </div>
        ) : contents.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-text-sec text-lg font-medium">This shared brain is empty.</div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 w-full">
            {contents.map((content) => {
              if (content.type === "youtube") {
                const ytId = youTubeId(content.links || "");
                return (
                  <YoutubeCard
                    key={content.id}
                    id={ytId}
                    title={content.title}
                    description={content.descriptions}
                  />
                );
              } else if (content.type === "tweet") {
                const twId = tweetId(content.links || "");
                return (
                  <LazyTweet
                    key={content.id}
                    id={twId}
                    title={content.title}
                  />
                );
              } else if (content.type === "document") {
                return (
                  <DocumentCard
                    key={content.id}
                    title={content.title}
                    description={content.descriptions}
                    link={content.links}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
