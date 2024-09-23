//Card.jsx

import React from "react";

const baseStyles = `
  .card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 400px;
    margin: 20px auto;
    transition: box-shadow 0.3s ease;
  }

  .card:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333333;
    margin: 0 0 10px 0;
  }

  .card-content {
    font-size: 1rem;
    color: #666666;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .card-footer {
    font-size: 0.875rem;
    color: #888888;
    text-align: right;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eeeeee;
  }
`;

const Card = ({
  title,
  content,
  footer,
  imageUrl,
  className = "",
  children,
  customStyles = {},
  customCSS = "",
}) => {
  const combinedStyles = `
    ${baseStyles}
    ${customCSS}
  `;

  return (
    <>
      <style>{combinedStyles}</style>
      <div className={`card ${className}`} style={customStyles.card}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="card-image"
            style={customStyles.image}
          />
        )}
        <div className="card-body" style={customStyles.body}>
          {title && (
            <h3 className="card-title" style={customStyles.title}>
              {title}
            </h3>
          )}
          {content && (
            <p className="card-content" style={customStyles.content}>
              {content}
            </p>
          )}
          {children}
          {footer && (
            <div className="card-footer" style={customStyles.footer}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
