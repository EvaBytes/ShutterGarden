import React from "react";

const DownloadButton = ({ image }) => {
  const handleDownload = () => {
    try {
      if (!image?.urls?.full) {
        console.error("Invalid image URL");
        return;
      }

      const link = document.createElement("a");
      link.href = image.urls.full;
      link.download = `image-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <button
      className="download-button"
      onClick={handleDownload}
      aria-label="Download Image"
    >
      Download
    </button>
  );
};

export default DownloadButton;
