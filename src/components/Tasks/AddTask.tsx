import { faExclamationCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { taskService } from '../../services/task/api';
import { Section } from './InterfaceTask';

interface Props {
  show: boolean;
  funcQuit: () => void;
  projectId: string;
  section: Section;
  dataTasks: { data: Section[]; setData: (data: Section[]) => void };
}

export const AddTaskModal: React.FC<Props> = (props: Props) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [err, setErr] = useState('');

  const addTask = () => {
    if (taskName === '') {
      setErr('Please enter all required information');
      return;
    }

    taskService
      .addTask({
        projectId: props.projectId,
        sectionId: props.section._id,
        name: taskName,
        description: description,
      })
      .then((res) => {
        setTaskName('');
        setErr('');
        props.dataTasks.setData(res.data.data);
        toast.success('Success');
        props.funcQuit();
      })
      .catch((err) => {
        toast.error(
          err.response.data?.error || 'An unexpected error has occurred'
        );
      });
  };

  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={() => {
          setErr('');
          setTaskName('');
          setDescription('');
          props.funcQuit();
        }}
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <div className="d-flex bd-highlight justify-content-start align-items-center">
            <div>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <div className="ml-3">
              <span style={{ fontSize: '20px', color: 'black' }}>
                Add New Task
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>
          <div className="pl-2 pr-2 modal-add-task">
            <div className="d-flex flex-column bd-highlight ml-5 mr-5">
              <div className="bd-highlight mt-2 justify-content-start">
                <div className="header-title">
                  Project: <b>{props.section.name}</b>
                </div>
              </div>
              <div className="bd-highlight mt-2 justify-content-start align-items-center">
                <div className="header-title">Task Name </div>
                <div>
                  <input
                    type="text"
                    className="p-2 ml-1 mr-1"
                    placeholder="New task"
                    onChange={(e) => {
                      setTaskName(e.target.value);
                    }}
                  />
                </div>
                {err ? (
                  <div className="d-flex bd-highlight align-items-center">
                    <div>
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        color="#ff584d"
                      />
                    </div>
                    <div className="pl-2" style={{ color: '#ff584d' }}>
                      {err}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="bd-highlight mt-2 justify-content-start">
                <div className="header-title">Description </div>
                <div className="p-2">
                  <textarea
                    className="task-description-textarea"
                    placeholder="Add more details to this task..."
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="pl-2 pr-2">
            <div className="w-100 d-flex justify-content-end">
              <div
                className="btn btn-primary"
                onClick={() => {
                  addTask();
                }}
              >
                Create
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
