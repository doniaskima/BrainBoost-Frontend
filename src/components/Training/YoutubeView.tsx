import React from 'react';
import { useParams } from 'react-router';
import YouTube from 'react-youtube';
import WrapperProject from '../Tasks/WrapperProject';


const YoutubeView: React.FC<any> = (props: any) => {
  const { videoId } = useParams();
  const opts = {
    height: '600',
    width: '900',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="youtube-view">
      <WrapperProject>
        <YouTube
          videoId={videoId}
          opts={opts as any}
          className="ml-6"
          onReady={(event) => event.target.pauseVideo()}
        />
      </WrapperProject>
    </div>
  );
};
export default YoutubeView;
