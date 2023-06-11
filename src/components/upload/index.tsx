import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import './style.scss';

interface Props {
  url: string;
  changeStatus: any;
}

const UploadZone: React.FC<Props> = (props) => {
  const getUploadParams = ({ file, meta }) => {
    const body = new FormData();
    body.append('fileField', file);
    return {
      url: props.url,
      body,
    };
  };

  return (
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={props.changeStatus}
        accept="image/*,audio/*,video/*"
        maxFiles={10}
      />
    </div>
  );
};

export default UploadZone;
