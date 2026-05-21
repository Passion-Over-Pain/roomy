import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import type { Route } from "./+types/home";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Upload from "@/components/upload";
import { useEffect, useRef, useState } from "react";
import { createProject, getProjects } from "@/lib/puter.action";
import { useNavigate } from "react-router";
import { Hero } from "@/components/sections/hero";
import { AboutUs } from "@/components/sections/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomy | Architectural Design Software" },
    { name: "description", content: "Welcome to Roomy" },
  ];
}

export default function Home() {
  const [projects, setProjects] = useState<DesignItem[]>([]);
  const isCreatingProjectRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects!);
    };

    fetchProjects();
  }, []);
  const handleCreateProject = async (
    base64Image: string,
  ): Promise<DesignItem | false> => {
    try {
      if (isCreatingProjectRef.current) return false;
      isCreatingProjectRef.current = true;
      const newId = Date.now().toString();

      const newItem: DesignItem = {
        id: newId,
        name: `Residence ${newId}`,
        sourceImage: base64Image,
        renderedImage: undefined,
        timestamp: Date.now(),
      };

      const saved = await createProject({
        item: newItem,
        visibility: "private",
      });

      if (!saved) return false;

      setProjects((prev) => [saved, ...prev]);

      return saved;
    } finally {
      isCreatingProjectRef.current = false;
    }
  };

  return (
    <div className="home">
      <Navbar />
      <Hero />
      <AboutUs />

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
            {projects &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card group"
                  onClick={() => navigate(`/visualizer/${project.id}`)}
                >
                  <div className="preview">
                    <img
                      src={project.renderedImage || project.sourceImage}
                      alt={project.name || "Project"}
                    />

                    <div className="badge">
                      <span>Private</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div>
                      <h3>{project.name}</h3>

                      <div className="meta">
                        <Clock size={12} />

                        <span>
                          {new Date(project.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="arrow">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
