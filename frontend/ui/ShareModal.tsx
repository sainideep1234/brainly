import Copy from "@/public/icons/Copy";
import Cross from "@/public/icons/Cross";
import React, { useState, useEffect } from "react";
import { shareBrain } from "@/httpclients/httpclient";

const ShareModal = ({ onShareClick }: { onShareClick: () => void }) => {
  const [shareHash, setShareHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    shareBrain(true)
      .then((res) => {
        if (res.success && res.hash) {
          setShareHash(res.hash);
        } else {
          setError("Failed to generate share link");
        }
      })
      .catch((err) => {
        setError("Failed to load share settings");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    if (!shareHash) return;
    const shareUrl = `${window.location.origin}/brain/${shareHash}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDisable = async () => {
    setLoading(true);
    try {
      const res = await shareBrain(false);
      if (res.success) {
        setShareHash("");
        alert("Sharing disabled successfully");
        onShareClick();
      }
    } catch (err) {
      alert("Failed to disable sharing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xs" onClick={onShareClick}></div>
      <div className="relative z-10 bg-bg-side border border-border p-8 rounded-2xl shadow-2xl w-full max-w-md text-text-pri animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-text-pri tracking-tight">Share Your Brain</h2>
          <button onClick={onShareClick} className="hover:scale-110 transition-transform text-text-sec hover:text-text-pri cursor-pointer">
            <Cross />
          </button>
        </div>

        <p className="mb-6 text-text-sec text-sm leading-relaxed">
          Share your curated collection of videos, tweets, and documents. Anyone with the link will be able to view your shared brain content in real-time.
        </p>

        {loading ? (
          <div className="text-center py-6 text-sm text-text-sec animate-pulse">Loading share details...</div>
        ) : error ? (
          <div className="text-center py-6 text-sm text-red-400">{error}</div>
        ) : (
          <div className="flex flex-col gap-4">
            {shareHash ? (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-sec">Share Link</span>
                  <div className="flex items-center gap-2 border border-border bg-bg-hero px-4 py-2.5 rounded-xl text-sm text-text-pri font-medium break-all select-all">
                    {window.location.origin}/brain/{shareHash}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={handleCopy}
                    className="flex-1 h-11 flex justify-center gap-2 items-center bg-btn-pri text-white rounded-xl text-base font-extrabold hover:bg-violet-600 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-md"
                  >
                    <Copy />
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                  </button>
                  <button 
                    onClick={handleDisable}
                    className="h-11 px-4 flex justify-center items-center border border-red-500/35 hover:bg-red-500/10 text-red-400 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Disable Share
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-sm text-text-sec">
                Sharing is currently disabled for this account.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
