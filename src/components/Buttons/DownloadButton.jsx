import React from "react";
import downloadIcon from "../../assets/DownloadSMALL.png";

export const DownloadButton = ({ image }) => {
  const handleDownload = () => {
      const link = document.createElement("a"); 
      link.href = image.urls.full; 
      link.download = `${image.id}.jpg`;
      link.style.display = "none"; 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link); 
  };

  return (
      <button className="download-button" onClick={handleDownload}>
        <img src={downloadIcon} alt="Download Icon" />
      </button>
  );
};
