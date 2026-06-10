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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onAddClick}></div>
      <div className="relative z-10 bg-bg-side border border-border p-6 rounded-lg shadow-lg min-w-xl text-text-pri">
        <div className="flex flex-col gap-1 mt-4">
          <button onClick={onAddClick} className="self-end hover:scale-105 transition-transform text-text-sec hover:text-text-pri cursor-pointer">
            <Cross />
          </button>
          <label htmlFor="title" className="text-lg font-medium text-text-pri">
            Title*
          </label>
          <input
            type="text"
            placeholder="Title.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus:ring-1 border-border border px-2 py-2 text-md font-normal rounded-md bg-bg-hero text-text-pri outline-none"
            id="title"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="description" className="text-lg font-medium text-text-pri">
            Description
          </label>
          <textarea
            placeholder="Description.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-2 py-2 text-md font-normal border-border border rounded-md bg-bg-hero text-text-pri outline-none"
            id="description"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="link" className="text-lg font-medium text-text-pri">
            Link
          </label>
          <input
            type="text"
            placeholder="Link.."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border-border border px-2 py-2 text-md font-normal rounded-md bg-bg-hero text-text-pri outline-none"
            id="link"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="tag" className="text-lg font-medium text-text-pri">
            Tags (separated by comma or space)
          </label>
          <input
            type="text"
            placeholder="#useful, #project.."
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="border-border border px-2 py-2 text-md font-normal rounded-md bg-bg-hero text-text-pri outline-none"
            id="tag"
          />
        </div>
        <div className="flex py-4 gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="typeYoutube"
              name="contentType"
              value="youtube"
              checked={type === "youtube"}
              onChange={() => setType("youtube")}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="typeYoutube" className="text-lg font-semibold px-2 cursor-pointer">
              Youtube
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="typeTweet"
              name="contentType"
              value="tweet"
              checked={type === "tweet"}
              onChange={() => setType("tweet")}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="typeTweet" className="text-lg font-semibold px-2 cursor-pointer">
              Tweet
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="typeDocuments"
              name="contentType"
              value="document"
              checked={type === "document"}
              onChange={() => setType("document")}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="typeDocuments" className="text-lg font-semibold px-2 cursor-pointer">
              Documents
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-text-ter w-full py-2 rounded-xl text-text-quad text-xl font-bold hover:text-text-pri transition-all duration-300 hover:bg-text-sec cursor-pointer disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddContentModal;
