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
    <div className="flex justify-between ">
      <div className="flex gap-1">
        {children}
        <span className="text-md font-medium">{title}</span>
      </div>
      <div className="flex gap-2 text-text-sec ">
        <Share />
        {onDelete && (
          <button onClick={onDelete} className="hover:text-red-500 cursor-pointer">
            <Delete />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
