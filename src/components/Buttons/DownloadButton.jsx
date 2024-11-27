import React from "react";
import downloadIcon from "../../assets/DownloadSMALL.png";
import "./DownloadButton.css";

export const DownloadButton = ({ image }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.urls.full;
    link.download = `image-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="download-button"
      onClick={handleDownload}
      aria-label="Download Image"
    >
      <img src={downloadIcon} alt="Download Icon" />
    </button>
  );
};
