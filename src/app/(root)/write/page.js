import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the component
const Write = dynamic(() => import("@/components/Write"), {
  ssr: false, // Disable server-side rendering for this component
});

const WritePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Write />
    </Suspense>
  );
};

export default WritePage;
