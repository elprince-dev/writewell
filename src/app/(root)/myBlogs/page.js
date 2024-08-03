// app/myBlogs/page.js (or your page component)

import React, { Suspense } from "react";
import MyBlogs from "@/components/MyBlogs";

const MyBlogsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyBlogs />
    </Suspense>
  );
};

export default MyBlogsPage;
