"use client";

import { Cursor } from "@/components/Cursor";
import FuzzyText from "@/components/FuzzyText";
import Magnet from "@/components/Magnet";
import Link from "next/link";
import React from "react";

const notFound = () => {
  const [path, setPath] = React.useState("");

  //  Get path and if the the path have blog in it the button says back to blog if not it says back to home
  const backToHome = () => {
    if (path.includes("blog")) {
      return true;
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 bg-background text-center">
      <Cursor />
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
        404
      </FuzzyText>
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
        NOT FOUND
      </FuzzyText>
      <Link
        href={backToHome() ? "/blog" : "/"}
        className="text-white transition-colors bg-white/30 hover:bg-white/50 border border-white/20 py-2 px-4 rounded-2xl"
        onClick={() => setPath(window.location.pathname)}
      >
        {backToHome() ? "Back to Blog" : "Back to Home"}
      </Link>
      
    </div>
  );
};

export default notFound;
