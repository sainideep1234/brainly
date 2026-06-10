import Delete from "@/public/icons/Delete";
import Document from "@/public/icons/Document";
import Share from "@/public/icons/Share";
import React from "react";
import CardHeader from "./CardHeader";

const DocumentCard = ({
  title,
  description,
  link,
  onDelete,
}: {
  title: string;
  description?: string | null;
  link?: string | null;
  onDelete?: () => void;
}) => {
  return (
    <div className="max-w-sm break-inside-avoid block shadow-2xl p-5 rounded-xl flex-col bg-bg-side border border-border">
      <CardHeader title={title || "Document"} onDelete={onDelete}>
        <Document />
      </CardHeader>
      {description && <div className="py-4 text-text-sec text-sm leading-relaxed">{description}</div>}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 hover:underline block pb-2 break-all text-sm mt-2 font-medium"
        >
          {link}
        </a>
      )}
    </div>
  );
};

export default DocumentCard;
