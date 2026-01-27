"use client";

import { useState } from "react";
import { CoverImage } from "./cover-image";
import { ImageCarousel } from "./image-carousel";

interface ProjectImageViewerProps {
  coverImage: string;
  galleryImages: string[];
  projectName: string;
}

export function ProjectImageViewer({
  coverImage,
  galleryImages,
  projectName,
}: ProjectImageViewerProps) {
  const [openTrigger, setOpenTrigger] = useState(0);

  // Combine cover image with gallery images, ensuring cover is first
  const allImages = galleryImages.length > 0
    ? (galleryImages.includes(coverImage)
        ? galleryImages
        : [coverImage, ...galleryImages])
    : [coverImage];

  const handleCoverClick = () => {
    // Trigger carousel to open
    setOpenTrigger((prev) => prev + 1);
  };

  return (
    <>
      <CoverImage
        src={coverImage}
        alt={projectName}
        onClick={handleCoverClick}
      />
      
      {/* Carousel that can be opened from cover image - hidden gallery */}
      <ImageCarousel
        images={allImages}
        projectName={projectName}
        initialIndex={0}
        openTrigger={openTrigger}
        hideGallery={true}
      />
    </>
  );
}
