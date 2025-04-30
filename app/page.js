"use client";
import dynamic from "next/dynamic";
import React from "react";
const Playground = dynamic(() => import("@/components/Playground"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Playground />
    </div>
  );
}
