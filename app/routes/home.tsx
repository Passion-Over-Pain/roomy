import type { Route } from "./+types/home";
import Navbar from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { AboutUs } from "@/components/sections/about";
import { Features } from "@/components/sections/features";
import { Workflow } from "@/components/sections/workflow";
import { Gallery } from "@/components/sections/gallery";
import { Community } from "@/components/community";
import { Cta } from "@/components/sections/cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomy | Architectural Design Software" },
    { name: "description", content: "Welcome to Roomy" },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <AboutUs />
      <Features />
      <Workflow />
      <Gallery />
      <Community />
      <Cta />
    </div>
  );
}
