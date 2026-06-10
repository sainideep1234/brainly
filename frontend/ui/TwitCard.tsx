"use client"; // This must be a client component to use the "sensor" (Observer)

import Delete from "@/public/icons/Delete";
import Document from "@/public/icons/Document";
import Share from "@/public/icons/Share";
import { Tweet } from "react-tweet";
import CardHeader from "./CardHeader";
import Twitter from "@/public/icons/Twitter";

export default function LazyTweet({
  id,
  title,
  onDelete,
}: {
  id: string;
  title: string;
  onDelete?: () => void;
}) {
  return (
    <div className="max-w-xl  overflow-hidden px-4 rounded-md py-2 shadow-card bg-bg-side">
      <CardHeader title={title || "Tweet"} onDelete={onDelete}>
        <Twitter />
      </CardHeader>
      <div className="my-2">
        <Tweet id={id} />
      </div>
    </div>
  );
}
