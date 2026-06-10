import React from "react";

const Sibebutton = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <div className="flex gap-4 text-text-sec px-4 py-3 my-1 text-lg items-center rounded-lg hover:text-text-pri hover:bg-[#151233]/70 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
      {children}
      <span className="font-semibold">{name}</span>
    </div>
  );
};

export default Sibebutton;
