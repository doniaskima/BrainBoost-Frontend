import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { Section } from './InterfaceTask';
import { Dropdown, Modal } from 'react-bootstrap';

interface Props {
  projectId: string;
  size: any;
  showModal: { status: boolean; setStatus: (value) => void };
  dataTasks: { data: Array<Section>; setData: (data) => void };
}

const AddSection: React.FC<Props> = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal)
  const [nameSection, setNameSection] = useState('');

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
            <Button
              color="primary"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <i className="fa fa-list-alt mr-2 ml-2" aria-hidden="true"></i>
              <span>Add Section</span>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        size={props.size}
        className="modal-confirm"
        onHide={() => {
          props.showModal.setStatus(false);
        }}
      >
        <Modal.Header className="pb-0">
          <h1>Create New Section</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <label className="form-control-name mr-2">Task name :</label>
              <input
                type="text"
                className='outline-none mt-2 mb-3'
                placeholder="Enter a new section name"
                onChange={(e) => {
                  setNameSection(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="d-block mb-3 form-control">Section</label>
              <div className="bd-highlight task-body-second">
                <Dropdown
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Dropdown.Toggle style={{ padding: '10px' }}>
                     CurrentSection
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                         DropDown Item
                     </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="form-group">
                <label className='form-control-label d-block mb-3'>Label</label>
                <div 
                className="btn-group-toggle btn-group-colors event-tag btn-group align-items-center task-body-second"
                role="group"
                data-toggle="buttons"

                >
                </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button
              style={{
                backgroundColor: '#5e72e4',
              }}
              onClick={(e) => {
                 
              }}>
              Create
            </Button>
          </div>
          <button
            type="button"
            className="ml-auto btn btn-link"
            onClick={() => props.showModal.setStatus(false)}
            style={{
              color: '#5e72e4',
            }}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddSection;
