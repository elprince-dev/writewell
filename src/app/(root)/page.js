"use client";
import "./page.scss";
import Home from "@/components/Home";
import { Suspense } from "react";
export default function page() {
  return (
    <main className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </main>
  );
}
