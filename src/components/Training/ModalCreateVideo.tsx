import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  size?: 'sm' | 'lg' | 'xl';
  showModal: boolean;
  setShowModal: (boolean) => void;
  projectId: string;
}

const ModalCreateVideo: React.FC<Props> = (props: Props) => {
  const [isFree, setIsFree] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [nameVideo, setNameVideo] = useState('');
  const [thumbnailVideo, setThumbnailVideo] = useState<string | null>(null);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const [descriptionVideo, setDescriptionVideo] = useState('');
  const navigate = useNavigate();

  const getVideoId = (url: string): string | false => {
    const regEx =
      '^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)';
    const matches = url.match(regEx);
    if (matches) {
      return matches[1];
    }
    return false;
  };

  return (
    <div className="modal-create-blog">
      <Modal
        show={props.showModal}
        size={props.size}
        className="modal-confirm"
        onHide={() => {
          props.setShowModal(false);
        }}
      >
        <Modal.Header className="pb-0">
          <h1>Create Video</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <input
                placeholder="Video Name"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setNameVideo(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Enter URL"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setUrlVideo(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Enter Thumbnail"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setThumbnailVideo(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-control-label">Description</label>
              <textarea
                style={{ height: '100px' }}
                placeholder="Description"
                className="form-control-alternative edit-event--description textarea-autosize form-control mr-2"
                onChange={(e) => {
                  setDescriptionVideo(e.target.value);
                }}
              ></textarea>
              <i className="form-group--bar"></i>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="p-2 bd-highlight">
                {isFree ? (
                  <>
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      size={'lg'}
                      color={'#2196F3'}
                      onClick={() => {
                        setIsFree(false);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faToggleOff}
                      size={'lg'}
                      onClick={() => {
                        setIsFree(true);
                      }}
                    />
                  </>
                )}
                <span className="ml-2">Free</span>
              </div>
              <div className="p-2 bd-highlight">
                {isPublic ? (
                  <>
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      size={'lg'}
                      color={'#2196F3'}
                      onClick={() => {
                        setIsPublic(false);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faToggleOff}
                      size={'lg'}
                      onClick={() => {
                        setIsPublic(true);
                      }}
                    />
                  </>
                )}
                <span className="ml-2">Public</span>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (urlVideo) {
                const id = getVideoId(urlVideo);
                axios
                  .post('http://localhost:8080/api/videos/addVideo', {
                    title: nameVideo,
                    description: descriptionVideo,
                    security: !isPublic || props.projectId ? 'Private' : 'Public',
                    videoId: id,
                    thumbnail: thumbnailVideo,
                    projectId: props.projectId,
                  })
                  .then((res) => {
                    console.log(res.data); // Debug statement
                    const responseData = res.data;
                    if (responseData && responseData.videoId) {
                      const videoId = responseData.videoId;
                      console.log('videoId', videoId);
                      toast.success('Success');
                      navigate(`/youtube/${props.projectId}/${videoId}`);
                    } else {
                      console.error('Invalid response data');
                    }
                  })
                  
                  .catch((error) => {
                    console.error('Error:', error);
                  });
              }
            }}
          >
            Create Video
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreateVideo;
