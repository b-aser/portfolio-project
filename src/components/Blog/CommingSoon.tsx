import React from "react";
import FuzzyText from "@/components/FuzzyText";

const CommingSoon = () => {
  return (
    <main className="flex h-full  flex-col items-center justify-center gap-10 text-center">
      {/* a comming soon message about the blog post */}
      {/* do not use fuzzy text component */}
      <p className="text-4xl font-bold text-primary h-full flex items-center justify-center">Blog Coming Soon</p>
    </main>
  );
};

export default CommingSoon;
