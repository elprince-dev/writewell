import Image from "next/image";
import "./page.scss";
import Home from "@/components/Home";

export default function page() {
  return (
    <main className="app">
      <Home />
    </main>
  );
}
