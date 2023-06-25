import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { sectionService } from '../../services/section/api';
import { Section } from './InterfaceTask';

interface Props {
  showModal: { status: boolean; setStatus: (value: boolean) => void };
  dataTasks: { data: Section[]; setData: (data: Section[]) => void };
  projectId: string;
  size: any;
}

const AddSection: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [nameSection, setNameSection] = useState('');
  const [descriptionSection, setDescriptionSection] = useState('');
  const [err, setErr] = useState(null);

  const addSection = () => {
    if (nameSection === '') {
      toast.error('Please enter the section name');
      setErr('Please enter the section name');
      return;
    }

    sectionService
      .addSection({
        projectId: props.projectId,
        name: nameSection,
      })
      .then((res) => {
        toast.success('Success');
        props.dataTasks.setData(res.data.data);
        setShowModal(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error || 'An unexpected error has occurred');
      });
  };

  return (
    <div className="add-section">
      <div
        style={{ height: '100%' }}
        onClick={() => {
          props.showModal.setStatus(false);
        }}
      >
        <div className="column-tasks">
          <div className="column-task-sort">
            <div className="board-task">
              <button className="continue-application" onClick={() => setShowModal(true)}>
                <div>
                  <div className="pencil"></div>
                  <div className="folder">
                    <div className="top">
                      <svg viewBox="0 0 24 27">
                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                      </svg>
                    </div>
                    <div className="paper"></div>
                  </div>
                </div>
                Add Section
              </button>
            </div>
          </div>
        </div>
        <Modal
          size="sm"
          show={showModal}
          centered
          onHide={() => {
            props.showModal.setStatus(false);
          }}
          dialogClassName="custom-modal-width"  
           scrollable
           
        >
          <Modal.Header className="pb-0">
            <h1>Create New Section</h1>
          </Modal.Header>
          <Modal.Body>
            <form className="new-event--form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter the new section name"
                  className="form-control-alternative new-event--title form-control"
                  onChange={(e) => {
                    setNameSection(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <textarea
                  style={{ height: '100px' }}
                  placeholder="Description"
                  className="form-control-alternative edit-event--description textarea-autosize form-control mr-2"
                  onChange={(e) => {
                    setDescriptionSection(e.target.value);
                  }}
                ></textarea>
                <i className="form-group--bar"></i>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between align-items-center w-100">
               
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="noselect"><span className="text">Close</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
             
              <button className="bookmarkBtn" onClick={addSection}>
  <span className="IconContainer"> 
    <svg viewBox="0 0 384 512" height="0.9em" className="icon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
  </span>
  <p className="text">Save</p>
</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddSection;
