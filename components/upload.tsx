import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";
import {
  REDIRECT_DELAY_MS,
  PROGRESS_INCREMENT,
  PROGRESS_INTERVAL_MS,
} from "../lib/constants";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { isSignedIn, userName, userId } = useOutletContext<AuthContext>();

  const processFile = (selectedFile: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target?.result as string;

      // Start progress interval
      let currentProgress = 0;
      intervalRef.current = setInterval(() => {
        currentProgress += PROGRESS_INCREMENT;

        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(currentProgress);
          clearInterval(intervalRef.current!);

          // Call onComplete after redirect delay
          setTimeout(() => {
            handleUploadComplete(base64String);
          }, REDIRECT_DELAY_MS);
        } else {
          setProgress(currentProgress);
        }
      }, PROGRESS_INTERVAL_MS);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleUploadComplete = async (base64Data: string) => {
    const newId = `${Date.now().toString()}`;
    navigate(`/visualizer/${newId}`, { state: { base64Data } });
    return true;
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | File[],
  ) => {
    if (!isSignedIn) return;

    let selectedFile: File | null = null;

    if (event instanceof Array) {
      selectedFile = event[0];
    } else {
      selectedFile = event.target.files?.[0] || null;
    }

    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0);
      processFile(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!isSignedIn) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!isSignedIn) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange([droppedFiles[0]]);
    }
  };
  return (
    <div className="upload">
      {!file ? (
        <div
          className={`dropzone ${isDragging ? "is-dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            className="drop-input"
            type="file"
            accept=".jpg,.png,.webp"
            disabled={!isSignedIn}
            onChange={handleFileChange}
          />
          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>{" "}
            <p>
              {isSignedIn
                ? "Click to upload or just drag and drop."
                : "Sign in or signup with Puter to upload"}
            </p>
            <p className="help"> Maximum file size is 50MB</p>
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress == 100 ? (
                <CheckCircle2 size={20} />
              ) : (
                <ImageIcon className="image" />
              )}
            </div>

            <h3>{file.name}</h3>
            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />

              <p className="status-text">
                {progress < 100 ? "Analyzing floor plan" : "Redirecting"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
