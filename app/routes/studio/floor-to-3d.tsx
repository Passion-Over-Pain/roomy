import { ArrowUpRight, Clock, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { createProject, getProjects } from "@/lib/puter.action";
import Upload from "@/components/upload";
import { Button } from "@/components/ui/button";

export default function FloorTo3D() {
  const [projects, setProjects] = useState<DesignItem[]>([]);
  const isCreatingProjectRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects || []);
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
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-6xl mb-6">Floor to 3D</h1>
          <p className="text-black/60 text-lg max-w-2xl">
            Upload your architectural blueprints to generate photorealistic
            spatial visualizations. Your workspace automatically syncs your
            drafts and final renders.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <section className="mb-24">
            <Upload onCreateProject={handleCreateProject} />
          </section>

          {/* Projects Gallery */}
          <section>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl">Recent Projects</h2>
              <Button
                className="flex items-center gap-2 text-sm font-medium"
                // onClick={() => //TODO: CREATE A PROJECT GALLERY }
              >
                <FolderPlus size={16} />
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length > 0 ? (
                projects.map((project) => {
                  const date = new Date(project.timestamp);
                  const isValidDate = !isNaN(date.getTime());

                  return (
                    <article
                      key={project.id}
                      onClick={() => navigate(`/visualizer/${project.id}`)}
                      className="group cursor-pointer bg-white border border-black/5 h-full flex flex-col hover:border-black transition-colors"
                    >
                      <div className="aspect-4/3 overflow-hidden relative bg-black/5">
                        <img
                          src={project.renderedImage || project.sourceImage}
                          alt={project.name!}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-semibold border">
                          {project.isPublic ? "Shared" : "Private"}
                        </span>
                      </div>

                      <div className="p-6 flex justify-between items-center grow">
                        <div>
                          <h3 className="font-serif text-xl">{project.name}</h3>

                          <div className="flex items-center gap-2 text-black/40 text-[10px] uppercase tracking-[0.2em] mt-2">
                            <Clock size={10} />

                            <time
                              dateTime={
                                isValidDate ? date.toISOString() : undefined
                              }
                            >
                              {isValidDate
                                ? date.toLocaleDateString("en-GB")
                                : "No date"}
                            </time>
                          </div>
                        </div>

                        <div className="w-10 h-10 border flex items-center justify-center text-black/50 group-hover:bg-black group-hover:text-white transition-colors">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="col-span-full border border-dashed border-black/10 p-16 text-center text-black/45">
                  Your project library is empty. Upload a floor plan to get
                  started.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
