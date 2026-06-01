import { toastService } from "@/components/shared/toast-service";
import { Button } from "@/components/ui/button";
import { generate3DView } from "@/lib/ai.action";
import {
  createProject,
  getProjectById,
  deleteProject,
  updateProject,
} from "@/lib/puter.action";
import { dialogService } from "@/lib/services/dialog-service";
import { Box, Download, RefreshCcw, Share2, X, OctagonX } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";

const Visualizer = () => {
  const { id } = useParams();
  const { userId } = useOutletContext<AuthContext>();
  const navigate = useNavigate();
  const location = useLocation();

  const hasInitialGenerated = useRef(false);
  const [project, setProject] = useState<DesignItem | null>(null);
  const [isProjectLoading, setIsProjectLoading] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  const handleExport = async () => {
    if (!currentImage) return;

    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `roomy-render-${id || Date.now()}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };
  const runGeneration = async (item: DesignItem) => {
    if (!id || !item.sourceImage) return;

    try {
      setIsProcessing(true);

      const result = await generate3DView({
        sourceImage: item.sourceImage,
      });

      if (result.rendererImage) {
        setCurrentImage(result.rendererImage);

        const updatedItem = {
          ...item,
          renderedImage: result.rendererImage,
          renderedPath: result.renderedPath,
          timestamp: Date.now(),
          ownerId: item.ownerId ?? userId ?? null,
          isPublic: item.isPublic ?? false,
        };

        const saved = await createProject({
          item: updatedItem,
          visibility: "private",
        });

        if (saved) {
          setProject(saved);
          setCurrentImage(saved.renderedImage ?? null);
        }
      }
    } catch (e) {
      console.error("Generation failed:", e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    dialogService.confirm({
      title: "Delete Project",
      description:
        "Are you sure you want to delete this project? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setIsDeleting(true);
        const success = await deleteProject(id);

        if (success) {
          toastService.success("Project deleted successfully.");
          navigate("/studio/floor-to-3d");
        } else {
          toastService.error("Failed to delete project.");
          setIsDeleting(false);
        }
      },
    });
  };

  const handleToggleShare = async () => {
    if (!project) return;

    const newState = !project.isPublic;
    setIsSharing(true);

    // Update in background
    const success = await updateProject(project.id, { isPublic: newState });

    if (success) {
      setProject({ ...project, isPublic: newState });
      toastService.success(
        newState ? "Project is now public" : "Project is now private",
      );
    } else {
      toastService.error("Failed to update privacy settings");
    }
    setIsSharing(false);
  };

  useEffect(() => {
    let isMounted = true;

    const loadProject = async () => {
      if (!id) {
        setIsProjectLoading(false);
        return;
      }

      setIsProjectLoading(true);
      const fetchedProject = await getProjectById({ id });

      if (!isMounted) return;

      setProject(fetchedProject);
      setCurrentImage(fetchedProject?.renderedImage ?? null);

      setIsProjectLoading(false);
      hasInitialGenerated.current = false;
    };

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (
      isProjectLoading ||
      hasInitialGenerated.current ||
      !project?.sourceImage
    )
      return;

    if (project.renderedImage) {
      setCurrentImage(project.renderedImage);
      hasInitialGenerated.current = true;
      return;
    }

    hasInitialGenerated.current = true;
    void runGeneration(project);
  }, [project, isProjectLoading]);

  return (
    <div className="visualizer">
      <nav className="topbar">
        <div className="brand">
          <Box size={24} className="logo" />
          <span className="name">Roomy</span>
        </div>

        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={isProcessing}
          size="sm"
          className="exit"
        >
          <X className="icon" />
        </Button>
      </nav>

      <section className="content">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-meta">
              <p>Project</p>
              <h2>{project?.name || `Residence ${id}`}</h2>
              <p className="note">Created by You</p>
            </div>

            <div className="panel-actions">
              <Button
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="delete"
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <>
                    <OctagonX className="w-4 h-4 mr-2" /> Delete
                  </>
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleExport}
                disabled={!currentImage}
                className="export"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>

              <Button
                size="sm"
                onClick={handleToggleShare}
                disabled={isSharing}
                className={project?.isPublic ? "bg-green-600" : "bg-black"}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {project?.isPublic ? "Make Private" : "Share Project"}
              </Button>
            </div>
          </div>

          <div className={`render-area ${isProcessing ? "is-processing" : ""}`}>
            {currentImage ? (
              <img
                src={currentImage}
                alt="AI Rendered View"
                className="rendered-img"
              />
            ) : (
              <div className="render-placeholder">
                {project?.sourceImage && (
                  <img
                    src={project.sourceImage}
                    alt="Original"
                    className="render-fallback"
                  />
                )}
              </div>
            )}

            {isProcessing && (
              <div className="render-overlay">
                <div className="rendering-card">
                  <RefreshCcw className="spinner" />

                  <span className="title">Rendering...</span>

                  <span className="subtitle">
                    Generating your 3D visualization
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="panel compare">
          <div className="panel-header">
            <div className="panel-meta">
              <p>Comparison</p>
              <h3>Before and After</h3>
            </div>
            <div className="hint">Drag to compare</div>
          </div>
          <div className="compare-stage">
            {project?.sourceImage && currentImage ? (
              <ReactCompareSlider
                defaultValue={50}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                itemOne={
                  <ReactCompareSliderImage
                    sizes="contain"
                    src={project.sourceImage}
                    alt="Before rerender image  "
                    className="compare-img object-contain"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={currentImage || project?.renderedImage || ""}
                    alt="After rerender image  "
                    className="compare-img object-contain"
                  />
                }
              />
            ) : (
              <div className="compare-fallback">
                {project?.sourceImage && (
                  <img
                    src={project.sourceImage}
                    alt="Before Image"
                    className="compare-img object-contain"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visualizer;
