"use client";

import Herosection from "@/components/Herosection";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import ShareModal from "@/components/ShareModal";
import AddContentModal from "@/components/AddContentModal";

export default function Home() {
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] =
    useState<boolean>(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Herosection
        onAddClick={() => setIsAddContentModalOpen(true)}
        onShareClick={() => setIsShareModalOpen(true)}
      />
      {isShareModalOpen && (
        <ShareModal onShareClick={() => setIsShareModalOpen(false)} />
      )}
      {isAddContentModalOpen && (
        <AddContentModal onAddClick={() => setIsAddContentModalOpen(false)} />
      )}
    </div>
  );
}
