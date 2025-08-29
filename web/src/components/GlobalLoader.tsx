import { useEffect, useState } from "react";
import { onLoadingChange, isLoading } from "@/api/axios";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(isLoading());

  useEffect(() => {
    const update = () => setLoading(isLoading());
    onLoadingChange(update);
  }, []);

  if (!loading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );
}
