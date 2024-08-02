"use client";
import "./page.scss";
import Home from "@/components/Home";
import { UserContext } from "@/utilities/UserContext";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useContext, useEffect } from "react";
export default function page() {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  console.log(currentUser);

  useEffect(() => {
    if (!currentUser) return router.push("/signin");
  }, []);

  return (
    <main className="app">
      <Home />
    </main>
  );
}
