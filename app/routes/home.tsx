import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import type { Route } from "./+types/home";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";

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
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Roomy 2.0</p>
        </div>
        <h1 className="title">
          Build beautiful spaces at the speed of thought with Roomy
        </h1>
        <p className="subtitle">
          Roomy is an AI-first design environment that helps you visaulize,
          render and ship architectural projects faster than ever
        </p>
        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRight className="icon" />
          </a>
          <Button variant="ghost" size="lg">
            Watch Demo
          </Button>
        </div>
        <div id="upload" className="upload-shell">
          <div className="grid-overlay" />
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG and WEBP formats up to 10 MBs</p>
            </div>
            <Upload />
          </div>
        </div>
      </section>
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>
                Your latest work and shared community projects, all in one
                place.
              </p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img
                  src="/ui/demo.jpg"
                  alt="3D view of a demo house floorplan"
                ></img>
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Manhattan</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span> {new Date("07.05.2026").toLocaleDateString()}</span>
                    <span>By Tinotenda Mhedziso</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
