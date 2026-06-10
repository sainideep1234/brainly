"use client";

import Cross from "@/public/icons/Cross";
import React, { useState } from "react";
import { addContent } from "@/httpclients/httpclient";

const AddContentModal = ({
  onAddClick,
  onSuccess,
}: {
  onAddClick: () => void;
  onSuccess?: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [type, setType] = useState<"youtube" | "tweet" | "document">("youtube");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      alert("Title is required");
      return;
    }
    setLoading(true);
    try {
      // Parse tags by splitting on commas and/or spaces, cleaning up hash characters
      const tags = tagsInput
        .split(/[,\s]+/)
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean);

      await addContent({
        title,
        description: description || undefined,
        link: link || undefined,
        type,
        tags,
      });

      alert("Content added successfully");
      if (onSuccess) {
        onSuccess();
      } else {
        onAddClick();
      }
    } catch (err: any) {
      alert("Failed to add content: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={onAddClick}></div>
      <div className="relative z-10 bg-bg-side border border-border p-8 rounded-2xl shadow-2xl w-full max-w-lg text-text-pri animate-fadeIn">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-text-pri tracking-tight">Add Content</h2>
          <button 
            onClick={onAddClick} 
            className="hover:scale-110 transition-transform text-text-sec hover:text-text-pri cursor-pointer"
          >
            <Cross />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-text-sec">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none border-border border rounded-xl px-4 py-2.5 text-base bg-bg-hero text-text-pri focus:border-violet-500/50 transition-colors duration-300 placeholder:text-gray-600"
            id="title"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-text-sec">
            Description
          </label>
          <textarea
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none border-border border rounded-xl px-4 py-2.5 text-base bg-bg-hero text-text-pri focus:border-violet-500/50 transition-colors duration-300 placeholder:text-gray-600 min-h-[90px] resize-none"
            id="description"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="link" className="text-xs font-semibold uppercase tracking-wider text-text-sec">
            Link
          </label>
          <input
            type="text"
            placeholder="https://example.com..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="outline-none border-border border rounded-xl px-4 py-2.5 text-base bg-bg-hero text-text-pri focus:border-violet-500/50 transition-colors duration-300 placeholder:text-gray-600"
            id="link"
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="tag" className="text-xs font-semibold uppercase tracking-wider text-text-sec">
            Tags (separated by comma or space)
          </label>
          <input
            type="text"
            placeholder="#useful #project..."
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="outline-none border-border border rounded-xl px-4 py-2.5 text-base bg-bg-hero text-text-pri focus:border-violet-500/50 transition-colors duration-300 placeholder:text-gray-600"
            id="tag"
          />
        </div>

        {/* Custom Type Selector Tabs */}
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-sec">
            Content Type
          </span>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setType("youtube")}
              className={`py-2 px-4 rounded-xl border text-sm font-bold transition-all duration-300 cursor-pointer text-center ${
                type === "youtube"
                  ? "bg-btn-pri border-btn-pri text-white shadow-md"
                  : "border-border bg-bg-hero text-text-sec hover:text-text-pri hover:border-violet-500/30"
              }`}
            >
              YouTube
            </button>
            <button
              type="button"
              onClick={() => setType("tweet")}
              className={`py-2 px-4 rounded-xl border text-sm font-bold transition-all duration-300 cursor-pointer text-center ${
                type === "tweet"
                  ? "bg-btn-pri border-btn-pri text-white shadow-md"
                  : "border-border bg-bg-hero text-text-sec hover:text-text-pri hover:border-violet-500/30"
              }`}
            >
              Tweet
            </button>
            <button
              type="button"
              onClick={() => setType("document")}
              className={`py-2 px-4 rounded-xl border text-sm font-bold transition-all duration-300 cursor-pointer text-center ${
                type === "document"
                  ? "bg-btn-pri border-btn-pri text-white shadow-md"
                  : "border-border bg-bg-hero text-text-sec hover:text-text-pri hover:border-violet-500/30"
              }`}
            >
              Document
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-btn-pri w-full py-3 rounded-xl text-white text-base font-extrabold hover:bg-violet-600 transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:bg-violet-800/50 disabled:text-text-sec flex justify-center items-center"
        >
          {loading ? "Adding..." : "Add Content"}
        </button>
      </div>
    </div>
  );
};

export default AddContentModal;
