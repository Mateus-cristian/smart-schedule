import { useEffect, useState } from "react";
import { onLoadingChange, isLoading } from "@/api/axios";

function Loader() {
  const [loading, setLoading] = useState(isLoading());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => setLoading(isLoading());
    onLoadingChange(update);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 100);
    } else if (!loading && progress > 0) {
      setProgress(100);
      setTimeout(() => setProgress(0), 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  if (progress === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "4px",
        background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)",
        zIndex: 9999,
        transition: "width 0.2s ease, opacity 0.3s",
        opacity: progress === 100 ? 0 : 1,
      }}
    />
  );
}

export default Loader;
