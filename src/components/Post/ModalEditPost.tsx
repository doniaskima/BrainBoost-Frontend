import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalEditPost: React.FC<any> = (props: any) => {
  //props: funcQuit(), show, data:{content, postId}
  const [valueEdit, setValueEdit] = useState<string>(null);
  const [isChange, setIsChange] = useState(false);
  return (
    <>
      <Modal
        size="lg"
        show={props.show} 
        onHide={() => {
          props.funcQuit();
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
          <FontAwesomeIcon className="mr-3" icon={faEdit} />
          Edit post
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center w-100 m-0">
            <div className="form-group w-100">
              {/* <label className="form-control-label">Description</label> */}
              <textarea
                style={{ height: '150px' }}
                placeholder="Edit post here"
                value={valueEdit || isChange ? valueEdit : props.data.content}
                onChange={(e) => {
                  if (!isChange) {
                    setIsChange(true);
                  }
                  setValueEdit(e.target.value);
                }}
                className="form-control-alternative edit-event--description textarea-autosize form-control w-100"></textarea>
              <i className="form-group--bar"></i>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col lg-6">
              <Button
                style={{
                  border: 'none',
                  width: '100%',
                  backgroundColor: 'rgb(242,242,242)',
                  color: 'black',
                }}
                onClick={(e) => {
                  props.funcQuit();
                }}>
                <b>Quit</b>
              </Button>
            </div>
            <div className="col lg-6">
              <Button
                style={{
                  border: 'none',
                  width: '100%',
                  backgroundColor: '#dc3545',
                  color: 'white',
                }}
                onClick={(e) => {
                  props.funcEdit(props.data.postId, valueEdit);
                  props.funcQuit();
                }}>
                <b>Save</b>
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditPost;
