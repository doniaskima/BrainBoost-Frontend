import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../../../../assets/scss/component/board.scss';

import {
  // getPriority,
  // getStatus,
  // Priority,
  Section,
  // Status,
  Task,
} from './InterfaceTask';
// import { DropdownAssignee } from './Help';
import ModalTrueFalse from '../../modals/ModalTrueFalse';

interface Props {
  dataTasks: { data: Array<Section>; setData: (data) => void };
  task: Task;
  isDraggable: { status: boolean; setStatus: (value) => void };
  showTaskDetails: { status: boolean; setStatus: (value) => void };
  taskDetails: { task: Task; setTask: (task: Task) => void };
}

export const TaskItem: React.FC<Props> = (props: Props) => {
  const [showModalTrueFalse, setShowModalTrueFalse] = useState(false);
  const showTaskDetails = (event?) => {
    event?.stopPropagation();
    props.taskDetails.setTask(props.task);
    props.showTaskDetails.setStatus(true);
  };
  return (
    <div
      className={`p-2 task-item ` + (props.task.isDone ? 'task-item-done' : '')}
      onClick={showTaskDetails}>
      {/* <div className="d-flex bd-highlight align-items-center pb-1 task-name">
        <li className="checklist-entry flex-column align-items-start py-4 px-4 list-group-item">
          <div className="checklist-item checklist-item-success checklist-item-checked">
            <div className="checklist-info"><h5 className="checklist-title mb-0">Call with Dave</h5>
              <small>10:30 AM</small></div><div><div className="custom-control custom-checkbox custom-checkbox-success">
                <input className="custom-control-input" id="chk-todo-task-1" type="checkbox" />
                <label className="custom-control-label"></label>
              </div>
            </div>
          </div>
        </li>
        <div className="bd-highlight">
          <Dropdown
            // onToggle={(isOpen, event, metadata) => {
            //   props.isDraggable.setStatus(!isOpen); //open menu => disabled drag
            // }}
            onClick={(event) => {
              event.stopPropagation();
            }}>
            <Dropdown.Toggle>...</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(event) => { }}>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </div>
                  <div className="mr-auto p-2 bd-highlight">Edit task name</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      opacity={props.task.isDone ? 0.3 : 1}
                    />
                  </div>
                  <div className="mr-auto p-2 bd-highlight">
                    {props.task.isDone ? 'Mark incomplete' : 'Mark complete'}
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={showTaskDetails}>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <div className="mr-auto p-2 bd-highlight">View details</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setShowModalTrueFalse(true);
                }}>
                <div className="d-flex bd-highlight">
                  <div className="p-2 bd-highlight">
                    <FontAwesomeIcon icon={faTrashAlt} color="#F06A6F" />
                  </div>
                  <div
                    className="mr-auto p-2 bd-highlight"
                    style={{ color: '#F06A6F' }}>
                    Delete task
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div> */}

      <div className="d-flex bd-highlight align-items-center pb-1 task-name">
        <div className="bd-highlight icon-done">
          <FontAwesomeIcon
            icon={faCheckCircle}
            opacity={props.task.isDone ? 1 : 0.3}
            color={props.task.isDone ? '#52a357' : 'none'}
          />
        </div>
        <div className="mr-auto bd-highlight ml-2">{props.task.name}</div>
      </div>
      <div className="d-flex bd-highlight align-items-center pb-1">
        {props.task.labels.length > 0 ? (
          props.task.labels.map((label) => (
            <div className="bd-highlight mr-2">
              <div
                className="pl-2 pr-2 task-priority"
                style={{ backgroundColor: label.color, color: 'black' }}>
                {label.name}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex bd-highlight align-items-center pb-1 pt-1">
        <div className="bd-highlight mr-2 user-avatar-block">
          {/* <DropdownAssignee
            assignment={props.task.assignment}
            config={{ isDisabled: true }}
            projectId={props.dataTasks.data[0].projectId}
          /> */}
        </div>
        <div className="mr-auto bd-highlight mr-2">
          <div className="p-2 calender-task">
            {moment(props.task.dueDate.from).format('DD/MM/YYYY')} -{' '}
            {moment(props.task.dueDate.to).format('DD/MM/YYYY')}
          </div>
        </div>
      </div>
      <ModalTrueFalse
        show={showModalTrueFalse}
        size="sm"
        data={{
          title: `delete "${props.task.name}"`,
          button_1: { title: 'No' },
          button_2: { title: 'Yes' },
        }}
        setClose={() => setShowModalTrueFalse(false)}
        funcButton_1={() => {
          setShowModalTrueFalse(false);
        }}
        funcButton_2={() => {
          
        }}
      />
    </div>
  );
};
