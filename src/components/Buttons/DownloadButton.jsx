import React from "react";
import { saveAs } from "file-saver"; 
import downloadIcon from "../../assets/DownloadSMALL.png";

export const DownloadButton = ({ image }) => {
  const handleDownload = () => {
    const imageUrl = image.urls.full;

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al descargar la imagen");
        }
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, `image-${image.id}.jpg`); 
      })
      .catch((error) => {
        console.error("Error al descargar la imagen:", error);
        alert("No se pudo descargar la imagen. Inténtalo de nuevo más tarde.");
      });
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      <img src={downloadIcon} alt="Download Icon" />
    </button>
  );
};