"use client";

import Herosection from "@/components/Herosection";
import { useState, useEffect } from "react";
import AddContentModal from "@/components/AddContentModal";
import Sidebar from "@/ui/Sidebar";
import ShareModal from "@/ui/ShareModal";
import { getAllContent } from "@/httpclients/httpclient";
import Link from "next/link";
import { useRouter } from "next/navigation";

import YoutubeIcon from "@/public/icons/Youtube";
import TwitterIcon from "@/public/icons/Twitter";
import DocumentIcon from "@/public/icons/Document";

const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [currentTab, setCurrentTab] = useState<"home" | "features">("home");

  return (
    <div className="h-screen w-screen bg-[#050410] text-white flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Background stars / ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 z-40 relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Brainly
          </span>
        </div>

        {/* Links middle pill */}
        <nav className="flex items-center bg-[#151233] border border-violet-900/50 rounded-full p-1 shadow-lg">
          <button
            onClick={() => setCurrentTab("home")}
            className={`px-5 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
              currentTab === "home" ? "bg-white text-black" : "text-violet-300 hover:text-white"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab("features")}
            className={`px-5 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
              currentTab === "features" ? "bg-white text-black" : "text-violet-300 hover:text-white"
            }`}
          >
            Features
          </button>
        </nav>

        {/* Right buttons */}
        <div className="flex items-center gap-6">
          <Link href="/signin" className="text-violet-300 hover:text-white font-semibold text-sm transition-colors duration-300 cursor-pointer">
            Sign in
          </Link>
          <Link href="/signup" className="bg-white hover:bg-violet-100 text-black font-extrabold px-6 py-2 rounded-full text-sm shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center z-20 relative -mt-12">
        {currentTab === "home" ? (
          <main className="flex flex-col items-center text-center px-4 animate-fadeIn">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Meet Brainly <br />
              <span className="flex items-center justify-center gap-3 mt-4 font-extrabold text-violet-300">
                Your Digital Second Brain <span className="animate-pulse">✨</span>
              </span>
            </h1>

            {/* Subtitle / Description - Max 10 words, single line */}
            <p className="text-violet-200/90 text-sm md:text-lg font-medium px-2 tracking-wide">
              Save and search your videos, tweets, and documents instantly.
            </p>
          </main>
        ) : (
          <main className="max-w-5xl w-full px-8 flex flex-col items-center text-center animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
              Features of Brainly
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="bg-[#0b091c]/80 border border-violet-500/20 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center hover:border-violet-500/40 hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center text-red-500 mb-4 shadow-[0_0_15px_rgba(239,68,68,0.15)] border border-red-500/25">
                  <YoutubeIcon />
                </div>
                <h3 className="font-bold text-lg mb-2">YouTube Embeds</h3>
                <p className="text-violet-300/80 text-sm leading-relaxed">
                  Directly embed, preview, and categorize YouTube videos within your central workspace.
                </p>
              </div>

              <div className="bg-[#0b091c]/80 border border-violet-500/20 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center hover:border-violet-500/40 hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-blue-500/25">
                  <TwitterIcon />
                </div>
                <h3 className="font-bold text-lg mb-2">Twitter Bookmarks</h3>
                <p className="text-violet-300/80 text-sm leading-relaxed">
                  Save X/Twitter posts and view them instantly using high-performance lazy loading.
                </p>
              </div>

              <div className="bg-[#0b091c]/80 border border-violet-500/20 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center hover:border-violet-500/40 hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/25">
                  <DocumentIcon />
                </div>
                <h3 className="font-bold text-lg mb-2">Notes & Docs</h3>
                <p className="text-violet-300/80 text-sm leading-relaxed">
                  Draft descriptions, documentation, and ideas in a clean, markdown-friendly text viewer.
                </p>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Bottom Glowing Planet / Arc */}
      <div className="relative w-full h-[180px] md:h-[220px] z-10 flex justify-center">
        {/* Soft Ambient Glow layer behind the arc - Subtler opacity and colors */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-[80vw] h-[120px] bg-violet-700/25 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Glowing Circle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[140vw] md:w-[120vw] h-[1200px] rounded-[50%] bg-[#050410] border-t-2 border-violet-500/40 shadow-[0_-20px_60px_rgba(139,92,246,0.35)] flex flex-col items-center pt-16 md:pt-24 px-8">
          <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight text-center max-w-3xl leading-tight">
            Watch How Brainly Can Make Your Mind Clear!
          </h2>
          <p className="max-w-2xl text-violet-300/80 text-xs md:text-sm text-center mt-4 leading-relaxed">
            It improves efficiency through smart bookmarks, automated content categorization, and an advanced search that lets you find anything in seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] =
    useState<boolean>(false);
  const [contents, setContents] = useState<any[]>([]);

  const fetchContents = () => {
    getAllContent().then((c) => {
      if (c && c.success && Array.isArray(c.data)) {
        setContents(c.data);
      }
    });
  };

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && token !== "undefined" && token !== "") {
      setIsAuthenticated(true);
      fetchContents();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleGetStarted = () => {
    router.push("/signup");
  };

  if (!isAuthenticated) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="flex min-h-screen bg-bg-hero text-text-pri">
      <Sidebar />
      <Herosection
        contents={contents}
        refreshContents={fetchContents}
        onAddClick={() => setIsAddContentModalOpen(true)}
        onShareClick={() => setIsShareModalOpen(true)}
      />
      {isShareModalOpen && (
        <ShareModal onShareClick={() => setIsShareModalOpen(false)} />
      )}
      {isAddContentModalOpen && (
        <AddContentModal
          onAddClick={() => setIsAddContentModalOpen(false)}
          onSuccess={() => {
            setIsAddContentModalOpen(false);
            fetchContents();
          }}
        />
      )}
    </div>
  );
}
