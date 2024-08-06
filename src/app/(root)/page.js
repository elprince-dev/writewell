"use client";
import React, { useEffect, useContext } from "react";

import "./page.scss";
import Home from "@/components/Home";
import { Suspense } from "react";
import { UserContext } from "@/utilities/UserContext";
import { useRouter } from "next/navigation";

export default function page() {
  const { currentUser } = useContext(UserContext);
  // const router = useRouter();

  // useEffect(() => {
  //   const checkUser = () => {
  //     if (!currentUser) {
  //       router.push("/signin");
  //     }
  //   };
  //   checkUser();
  // }, []);
  return (
    <main className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </main>
  );
}
