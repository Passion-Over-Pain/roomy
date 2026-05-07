import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";
import {
  REDIRECT_DELAY_MS,
  PROGRESS_INCREMENT,
  PROGRESS_INTERVAL_MS,
} from "../lib/constants";
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const { isSignedIn } = useOutletContext<AuthContext>();

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const processFile = (selectedFile: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      let currentProgress = 0;
      intervalRef.current = setInterval(() => {
        currentProgress += PROGRESS_INCREMENT;

        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(currentProgress);
          clearInterval(intervalRef.current!);
          timeoutRef.current = setTimeout(() => {
            handleUploadComplete(base64String);
          }, REDIRECT_DELAY_MS);
        } else {
          setProgress(currentProgress);
        }
      }, PROGRESS_INTERVAL_MS);
    };

    reader.onerror = () => {
      // Clear any pending interval or timeout
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setProgress(0);
      const errorMessage = "Failed to read file. Please try again.";
      setError(errorMessage);
      console.error("FileReader error:", reader.error);
      // Clear the file selection
      setFile(null);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleUploadComplete = async (base64Data: string) => {
    if (!isMountedRef.current) return;
    const newId = `${Date.now().toString()}`;
    navigate(`/visualizer/${newId}`, { state: { base64Data } });
    return true;
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | File[],
  ) => {
    if (!isSignedIn) return;

    let selectedFile: File | null = null;

    if (Array.isArray(event)) {
      selectedFile = event[0];
    } else {
      selectedFile = event.target.files?.[0] || null;
    }

    if (selectedFile) {
      const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

      // Validate MIME type
      if (!ALLOWED_MIME_TYPES.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload JPG, PNG, or WebP.");
        return;
      }

      // Validate file size
      if (selectedFile.size > MAX_SIZE_BYTES) {
        setError("File size exceeds 50MB limit.");
        return;
      }

      setError(null);
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
            accept=".jpg,.jpeg,.png,.webp"
            disabled={!isSignedIn}
            onChange={handleFileChange}
          />
          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>{" "}
            {error ? (
              <p className="error">{error}</p>
            ) : (
              <>
                <p>
                  {isSignedIn
                    ? "Click to upload or just drag and drop."
                    : "Sign in or signup with Puter to upload"}
                </p>
                <p className="help"> Maximum file size is 50MB</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
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
