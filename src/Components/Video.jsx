import React from "react";

function Video({
  src,
  height = "360px",
  width = "640px",
  controls = true,
  loop = false,
  muted = false,
  type = "video/mp4",
  autoPlay = false,
  isYouTube = false,
  ...rest
}) {
  // Example:
  // getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  // returns 'dQw4w9WgXcQ'

  if (isYouTube) {
    return (
      <iframe
        controls={controls}
        width={width}
        height={height}
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...rest} // Pass other props such as className, id, etc.
      />
    );
  }
  return (
    <video
      width={width}
      controls={controls}
      loop={loop}
      muted={muted}
      autoPlay={autoPlay}
      {...rest}
    >
      <source src={src} type={type} />
    </video>
  );
}

export default Video;
