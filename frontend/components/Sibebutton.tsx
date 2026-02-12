import React from "react";

const Sibebutton = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <div className="flex gap-4 text-text-sec px-4  py-4 my-2 text-xl items-center hover:bg-blue-50 rounded-md hover:text-text-pri animate-all duartion-300">
      {children}
      <span className="">{name}</span>
    </div>
  );
};

export default Sibebutton;
