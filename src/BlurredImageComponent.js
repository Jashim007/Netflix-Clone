import React, { useState, useEffect, useMemo } from "react";

const BlurredImageComponent = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [showShimmer, setShowShimmer] = useState(true);

  const img = useMemo(() => new Image(), []);

  useEffect(() => {
    img.onload = () => {
      setImageLoaded(true);
      setShowShimmer(false);
    };
    img.onerror = () => {
      setError("Failed to load image");
      setShowShimmer(false);
    };
    img.src = src;

    // Cleanup logic if needed
    return () => {
      // ... cleanup tasks
    };
  }, [src, img]);

  return (
    <>
      {error ? false: (
        <>
          {showShimmer && (
            <div className="h-full w-full text-white bg-slate-600 rounded-sm animate-pulse"></div>
          )}
          {imageLoaded && (
            <img
              src={img.src}
              alt=""
              className="h-full w-full rounded-sm transition-all duration-500 hover:scale-105 cursor-pointer"
            />
          )}
        </>
      )}
    </>
  );
};

export default BlurredImageComponent;
