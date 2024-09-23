import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes, FaExclamationCircle, FaRegFileImage } from "react-icons/fa";

const DragAndDrop = ({
  onDrop,
  accept = [],
  maxSize = 5242880, // 5MB
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);


  const acceptConfig = useMemo(() => {
    if (accept.length === 0) return {}; // Accept all files if no types specified
    return accept.reduce((acc, type) => {
      const mimeType = type.startsWith('.') ? `application/${type.slice(1)}` : `application/${type}`;
      acc[mimeType] = [type];
      return acc;
    }, {});
  }, [accept]);


  const onDropCallback = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setError(null);
      }
      if (rejectedFiles.length > 0) {
        setError(rejectedFiles[0].errors[0].message);
      }
      if (onDrop) {
        onDrop(acceptedFiles, rejectedFiles);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept:acceptConfig,
    maxSize,
  });

  const removeFile = () => {
    setFile(null);
  };
  console.log(accept);
  return (
    <div className="drag-and-drop-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""} ${
          file ? "has-file" : ""
        }`}
      >
        <input {...getInputProps()} />
        {file && (
          <button
            className="remove-button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
          >
            <FaTimes />
          </button>
        )}
        <FaRegFileImage className="upload-icon" size="48" />
        <p className="dropzone-text">
          {file
            ? file.name
            : isDragActive
            ? "Drop the file here"
            : "Drag 'n' drop a file here, or click to select"}
        </p>
        <p className="dropzone-info">
        </p>
      </div>

      {error && (
        <div className="error-alert">
          <FaExclamationCircle className="alert-icon" />
          <p>{error}</p>
        </div>
      )}

      <style jsx>{`
        .drag-and-drop-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }

        .dropzone {
          width: 300px;
          position: relative;
          padding: 2rem;
          border: 2px dashed #ccc;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dropzone.active {
          padding: 2rem;
          border-color: #007bff;
          background-color: #f0f8ff;
        }

        .dropzone.has-file {
          border-color: #48bb78;
          background-color: #f0fff4;
        }

        .upload-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          color: #666;
        }

        .dropzone-text {
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: #333;
        }

        .dropzone-info {
          font-size: 0.875rem;
          color: #666;
        }

        .remove-button {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #e53e3e;
          padding: 0.25rem;
          border-radius: 50%;
          transition: background-color 0.2s;
        }

        .remove-button:hover {
          background-color: rgba(229, 62, 62, 0.1);
        }

        .error-alert {
          display: flex;
          align-items: center;
          margin-top: 1rem;
          padding: 0.75rem;
          background-color: #fff5f5;
          border: 1px solid #feb2b2;
          border-radius: 4px;
          color: #c53030;
        }

        .alert-icon {
          width: 20px;
          height: 20px;
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default DragAndDrop;
