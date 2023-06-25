import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Section,
  Task,
} from './InterfaceTask';

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
