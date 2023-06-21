import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
  size?: 'sm' | 'lg' | 'xl';
  showModal: boolean;
  setShowModal: (boolean) => void;
  projectId: string;
  content: string;
}

const ModalCreateBlog: React.FC<Props> = (props: Props) => {
 const navigate = useNavigate();
  const [isFree, setIsFree] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [nameBlog, setNameBlog] = useState('');
  const [thumbnailBlog, setThumbnailBlog] = useState(null);
  const [descriptionBlog, setDescriptionBlog] = useState('');

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
          <h1>Create Blog</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <input
                placeholder="Blog Name"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setNameBlog(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Enter Thumbnail"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setThumbnailBlog(e.target.value);
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
                  setDescriptionBlog(e.target.value);
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
            }}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (nameBlog === '') {
                toast.error('Please enter Blog name');
                return;
              }
            
            }}>
            Create Blog
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreateBlog;
