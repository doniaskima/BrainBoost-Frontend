/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Section, Task } from './InterfaceTask';
import { Label } from 'react-bootstrap';
import { TaskItem } from './TaskItem';
import ModalTrueFalse from '../../modals/ModalTrueFalse';
import axios from 'axios';
import { BASE_URL } from '../../utils/utils';
import ModalAddTask from './AddTask';

interface Props {
  userId: string;
  section: Section;
  showTaskDetails: { status: boolean; setStatus: (value) => void };
  taskDetails: { task: Task; setTask: (task: Task) => void };
  dataTasks: { data: Array<Section>; setData: (data) => void };
  labels: {
    data: Array<Label>;
    setData: (labels) => void;
  };
}

const SectionComponent: React.FC<Props> = (props: Props) => {
  const [IsDraggable, setIsDraggable] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModalAddTask, setShowModalAddTask] = useState(false);
  const [showModalTrueFalse, setShowModalTrueFalse] = useState(false);
  const [showModalRename, setShowModalRename] = useState(false);
  const deleteSection = () => {
    axios
      .post(`${BASE_URL}/api/section/deleteSection`, {
        projectId: props.section.projectId,
        sectionId: props.section._id,
      })
      .then((res) => {
        setShowModalTrueFalse(false);
        props.showTaskDetails.setStatus(false);
        props.dataTasks.setData(res.data.data);
        toast.success('Deleted section successfully');
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'An unexpected error occurred',
        );
      });
  };
  
  return (
    <Droppable droppableId={props.section._id} key={props.section._id}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ height: '100%' }}
            onClick={() => {
              props.showTaskDetails.setStatus(false);
            }}
          >
            <div className="column-tasks">
              <div className="column-task-sort">
                <div className="board-task">
                  <div className="inner-board-task p-0">
                    <div className="d-flex bd-highlight align-items-center pl-3">
                      {/* List task name */}
                      <div className="p-2 flex-grow-1 bd-highlight ">
                        <b>{props.section.name}</b>
                      </div>
                      <div className="p-2 bd-highlight">
                        <div
                          className="icon-add"
                          onClick={() => {
                            setShowModalAddTask(!showModalAddTask);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="icon-add-inner"
                          />
                        </div>
                      </div>
                      <div className="p-2 bd-highlight">
                        <Dropdown
                          show={showDropdown}
                          onToggle={(isOpen) => setShowDropdown(isOpen)}
                        >
                          <Dropdown.Toggle>...</Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setShowModalRename(true);
                                setShowDropdown(false);
                              }}
                            >
                              <div className="d-flex bd-highlight">
                                <div className="p-2 bd-highlight">
                                  <FontAwesomeIcon icon={faPencilAlt} />
                                </div>
                                <div className="mr-auto p-2 bd-highlight">
                                  Rename section
                                </div>
                              </div>
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setShowModalTrueFalse(true);
                                setShowDropdown(false);
                              }}
                            >
                              <div className="d-flex bd-highlight">
                                <div className="p-2 bd-highlight">
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    color="#F06A6F"
                                  />
                                </div>
                                <div
                                  className="mr-auto p-2 bd-highlight"
                                  style={{ color: '#F06A6F' }}
                                >
                                  Delete section
                                </div>
                              </div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="list-tasks">
                      {props.section.tasks.map((task, index) => {
                        return (
                          // Body list task
                          <div className="d-flex align-items-start flex-column bd-highlight mb-1 w-100">
                            <div className="mb-auto p-2 bd-highlight w-100">
                              {/* --------------- Task Item --------------- */}
                              <Draggable
                                key={task._id}
                                draggableId={task._id}
                                index={index}
                                isDragDisabled={
                                  props.userId === task.authorId._id
                                    ? false
                                    : true
                                } // enable||disable drag
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div className="w-100">
                                      <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                      >
                                        <TaskItem
                                          dataTasks={{ ...props.dataTasks }}
                                          task={task}
                                          isDraggable={{
                                            status: IsDraggable,
                                            setStatus: setIsDraggable,
                                          }}
                                          showTaskDetails={{
                                            ...props.showTaskDetails,
                                          }}
                                          taskDetails={{
                                            ...props.taskDetails,
                                          }}
                                        />
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    

            <ModalTrueFalse
              size="sm"
              show={showModalTrueFalse}
              data={{
                title: `delete section ${props.section.name}`,
                button_1: { title: 'No' },
                button_2: { title: 'Yes' },
              }}
              setClose={() => {
                setShowModalTrueFalse(false);
              }}
              funcButton_1={() => {
                // button No
                setShowModalTrueFalse(false);
              }}
              funcButton_2={deleteSection}
            />
          </div>
        );
      }}
    </Droppable>
    
  );
};

export default SectionComponent;
