import Single from "@/components/Single";
import React from "react";

const page = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <Single id={id} />
    </div>
  );
};

export default page;
