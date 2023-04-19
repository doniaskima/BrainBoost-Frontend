import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface VideoSource {
  src: string;
  type: string;
}

interface VideoPlayerProps {
  src: string;
  type: string;
  poster?: string;
  autoplay?: boolean;
  options?: Plyr.Options;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  type,
  poster = "",
  autoplay = false,
  options = {},
}) => {
  const sources: VideoSource[] = [{ src, type }];
  return (
    <Plyr
      source={{
        type: "video",
        sources,
        poster: poster,
        autoplay,
      }}
      options={options}
    />
  );
};

export default VideoPlayer;
