"use client"; // This must be a client component to use the "sensor" (Observer)

import Delete from "@/public/icons/Delete";
import Document from "@/public/icons/Document";
import Share from "@/public/icons/Share";
import { Tweet } from "react-tweet";
import CardHeader from "./CardHeader";
import Twitter from "@/public/icons/Twitter";

export default function LazyTweet({ id }: { id: string }) {
  return (
    <div className="max-w-xl  overflow-hidden px-4 rounded-md py-2 shadow-card">
      <CardHeader title="Tweet">
        <Twitter />
      </CardHeader>
      <Tweet id={id} />
      <div className="flex gap-2 ">
        <span className="text-btn-pri bg-btn-sec px-2 py-1 rounded-xl text-sm">
          #productivity
        </span>
      </div>
      <div className="text-sm text-date py-4">Added on 10/3/2024</div>
    </div>
  );
}
