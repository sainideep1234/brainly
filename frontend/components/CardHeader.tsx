import Delete from "@/public/icons/Delete";
import Document from "@/public/icons/Document";
import Share from "@/public/icons/Share";
import React from "react";

const CardHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between ">
      <div className="flex gap-1">
        {children}
        <span className="text-md font-medium">{title}</span>
      </div>
      <div className="flex gap-2 text-text-sec ">
        <Share />
        <Delete />
      </div>
    </div>
  );
};

export default CardHeader;
