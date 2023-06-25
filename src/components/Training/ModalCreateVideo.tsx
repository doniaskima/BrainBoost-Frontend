import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { videoService } from '../../services/video/api';
import { useNavigate } from 'react-router-dom';
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
  const [thumbnailVideo, setThumbnailVideo] = useState(null);
  const [urlVideo, setUrlVideo] = useState(null);
  const [descriptionVideo, setDescriptionVideo] = useState('');
  const navigate = useNavigate();

  const getVideoId = (url) => {
    var regEx =
      '^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)';
    var matches = url.match(regEx);
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
        }}>
        <Modal.Header className="pb-0">
          <h1>Create a video</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <input
                placeholder="Video Title."
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setNameVideo(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Input url"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setUrlVideo(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="  thumbnail"
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
                placeholder="Desctiption"
                className="form-control-alternative edit-event--description textarea-autosize form-control mr-2"
                onChange={(e) => {
                  setDescriptionVideo(e.target.value);
                }}></textarea>
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
                <span className="ml-2"> Complimentary</span>
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
            }}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              let id = getVideoId(urlVideo);
              videoService
                .addVideo({
                  title: nameVideo,
                  describe: descriptionVideo,
                  security: !isPublic || props.projectId ? 'Private' : 'Pulic',
                  money: isFree ? 'Free' : 'Money',
                  videoId: id,
                  thumbnail: thumbnailVideo,
                  projectId: props.projectId,
                })
                .then((res) => {
                  let videoId = res.data.data.videoId;
                  toast.success('Success');
                    navigate(`/youtube/${props.projectId}/${videoId}`);
                })
                .catch(() => {});
            }}>
           Create a video
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreateVideo;
