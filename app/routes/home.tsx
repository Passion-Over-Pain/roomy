import type { Route } from "./+types/home";
import Navbar from "@/components/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomy" },
    { name: "description", content: "Welcome to Roomy" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <h1 className="text-3x-1 text-indigo-700 font-extrabold">Hello World</h1>
    </div>
  );
}
