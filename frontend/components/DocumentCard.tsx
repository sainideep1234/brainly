import Delete from "@/public/icons/Delete";
import Document from "@/public/icons/Document";
import Share from "@/public/icons/Share";
import React from "react";
import CardHeader from "./CardHeader";

const DocumentCard = () => {
  return (
    <div className="max-w-sm break-inside-avoid block shadow-card px-4 py-2 rounded-md flex-col">
      <CardHeader title="Document">
        <Document />
      </CardHeader>
      <h1 className="text-xl font-bold pt-4">Future Project</h1>
      <div className="py-4">Content </div>
      <div className="flex gap-2 ">
        <span className="text-btn-pri bg-btn-sec px-2 py-1 rounded-xl text-sm">
          #productivity
        </span>
      </div>
      <div className="text-sm text-date py-4">Added on 10/3/2024</div>
    </div>
  );
};

export default DocumentCard;
