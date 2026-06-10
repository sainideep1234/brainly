import Delete from "@/public/icons/Delete";
import Document from "@/public/icons/Document";
import Share from "@/public/icons/Share";
import React from "react";

const CardHeader = ({
  title,
  children,
  onDelete,
}: {
  title: string;
  children?: React.ReactNode;
  onDelete?: () => void;
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex gap-2 items-center text-text-pri">
        {children}
        <span className="text-sm font-semibold truncate max-w-[180px]">{title}</span>
      </div>
      <div className="flex gap-3 items-center text-text-sec">
        <button className="hover:text-text-pri transition-colors duration-200 cursor-pointer">
          <Share />
        </button>
        {onDelete && (
          <button onClick={onDelete} className="hover:text-red-500 transition-colors duration-200 cursor-pointer">
            <Delete />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
