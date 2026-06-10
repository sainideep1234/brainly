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
    <div className="max-w-sm break-inside-avoid block shadow-card px-4 py-2 rounded-md flex-col bg-bg-side">
      <CardHeader title="Document" onDelete={onDelete}>
        <Document />
      </CardHeader>
      <h1 className="text-xl font-bold pt-4 text-text-pri">{title}</h1>
      {description && <div className="py-4 text-text-sec">{description}</div>}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline block pb-2 break-all"
        >
          {link}
        </a>
      )}
    </div>
  );
};

export default DocumentCard;
