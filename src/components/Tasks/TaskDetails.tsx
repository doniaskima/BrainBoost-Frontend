import React, { useEffect, useState } from 'react';
import { Assignment, Label, Section, Task } from './InterfaceTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { CalenderModal, DropdownAssignee } from './Help';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Button, UncontrolledTooltip } from 'reactstrap';
import ModalTrueFalse from '../../modals/ModalTrueFalse';


interface Props {
  dataTasks: { data: Array<Section>; setData: (data) => void };
  task: {
    task: Task;
    setTask: (task: Task) => void;
  };
  labels: {
    data: Array<Label>;
    setData: (labels) => void;
  };
  show;
  setShow: (value) => void;
}
export const TaskDetails: React.FC<Props> = (props: Props) => {
  const [render, setRender] = useState(false);
  const [showModalTrueFalse, setShowModalTrueFalse] = useState(false);
  const [description, setDescription] = useState(props.task.task.description);
  const [taskName, setTaskName] = useState(props.task.task.name);
  const [showBtnDes, setShowBtnDes] = useState(false);
  const [showBtnName, setShowBtnName] = useState(false);
  const [showAddLabel, setShowAddLabel] = useState(false);
  useEffect(() => {
    setDescription(props.task.task.description);
    setTaskName(props.task.task.name);
  }, [props.task.task]);
  useEffect(() => {
    if (props.show) {
      setRender(true);
    }
  }, [props.show]);
  const onAnimationEnd = () => {
    if (!props.show) {
      setRender(false);
    }
  };
  const updateTask = (data: {
    projectId: string;
    taskId: string;
    dependencies?: string;
    assignment?: Array<string>;
    name?: string;
    file?: Array<string>;
    dueDate?: {
      from: Date;
      to: Date;
    };
    isDone?: boolean;
    labels?: Array<string>;
    description?: string;
  }) => {
    taskService
      .updateTask(data)
      .then((res) => {
        props.dataTasks.setData(res.data.data.allTasks);
        props.task.setTask(res.data.data.taskUpdate);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error || 'Một lỗi không mong muốn đã xảy ra',
        );
      });
  };

  return (
    render && (
      <div
        className="task-details"
        style={{
          animation: `${
            props.show ? 'task-details-show 1s' : 'task-details-hide 1s'
          }`,
        }}
        onAnimationEnd={onAnimationEnd}
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <div className="d-flex bd-highlight align-items-center task-header">
          <div
            className="flex-grow-1 bd-highlight p-2"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              updateTask({
                projectId: props.dataTasks.data[0].projectId,
                taskId: props.task.task._id,
                isDone: !props.task.task.isDone,
              });
            }}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              opacity={props.task.task.isDone ? 1 : 0.3}
              color={props.task.task.isDone ? '#52a357' : 'none'}
            />
            {props.task.task.isDone ? ` Completed` : ` Mark complete`}
          </div>
          {/* <div
            className="bd-highlight p-2 task-header-link"
            onClick={() => {
              // copy link task
            }}>
            <span
              className="d-inline-block"
              tabIndex={0}
              data-toggle={'tooltip'}
              title="Copy link">
              <FontAwesomeIcon icon={faLink} />
            </span>
          </div> */}
          <div className="bd-highlight p-2 task-header-menu">
            <Dropdown
              onClick={(event) => {
                event.stopPropagation();
              }}>
              <Dropdown.Toggle>...</Dropdown.Toggle>
              <Dropdown.Menu>
                {/* <Dropdown.Item>
                  <div className="d-flex bd-highlight">
                    <div className="p-2 bd-highlight">
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="mr-auto p-2 bd-highlight">
                      Rename section
                    </div>
                  </div>
                </Dropdown.Item> */}
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
        </div>
        <div className="task-wrap d-flex flex-column justify-content-between">
          <div className="task-body">
            <div className="d-flex bd-highlight pb-2 align-items-center task-name">
              <div className="bd-highlight task-body-header">Name</div>
              <div className="flex-grow-1 bd-highlight">
                <input
                  type="text"
                  className="p-1 task-name-input"
                  placeholder="Add more details to this task..."
                  value={taskName}
                  onChange={(event) => {
                    // change description
                    setShowBtnName(true);
                    setTaskName(event.target.value);
                  }}
                />
                {showBtnName ? (
                  <div className="bd-highlight mt-1">
                    <div
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        updateTask({
                          projectId: props.dataTasks.data[0].projectId,
                          taskId: props.task.task._id,
                          name: taskName,
                        });
                        setShowBtnName(false);
                      }}>
                      Lưu
                    </div>
                    <div
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setTaskName(props.task.task.name);
                        setShowBtnName(false);
                      }}>
                      Hủy
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="d-flex bd-highlight align-items-center pb-2 task-assignee">
              <div className="bd-highlight task-body-header">Assignee</div>
              <div className="bd-highlight task-body-second">
                <DropdownAssignee
                  assignment={props.task.task.assignment}
                  projectId={props.dataTasks.data[0].projectId}
                  config={{
                    isShowName: false,
                  }}
                  handleInvite={(user: Assignment) => {
                    taskService
                      .addAssignment({
                        projectId: props.dataTasks.data[0].projectId,
                        taskId: props.task.task._id,
                        assignmentId: user._id,
                      })
                      .then((res) => {
                        props.dataTasks.setData(res.data.data.allTasks);
                        props.task.setTask(res.data.data.updateTask);
                      })
                      .catch((err) => {
                        toast.error(
                          err.response.data?.error ||
                            'Một lỗi không mong muốn đã xảy ra',
                        );
                      });
                  }}
                  handleDelete={(user) => {
                    taskService
                      .deleteAssignment({
                        projectId: props.dataTasks.data[0].projectId,
                        taskId: props.task.task._id,
                        assignmentId: user._id,
                      })
                      .then((res) => {
                        props.dataTasks.setData(res.data.data.allTasks);
                        props.task.setTask(res.data.data.updateTask);
                      })
                      .catch((err) => {
                        toast.error(
                          err.response.data?.error ||
                            'Một lỗi không mong muốn đã xảy ra',
                        );
                      });
                  }}
                />
              </div>
            </div>
            <div className="d-flex bd-highlight align-items-center pb-2 task-calendar">
              <div className="bd-highlight task-body-header">Due date</div>
              <div className="bd-highlight task-body-second">
                <CalenderModal
                  config={{ isDisabled: false }}
                  startDate={new Date(props.task.task.dueDate?.from) || null}
                  endDate={new Date(props.task.task.dueDate?.to) || null}
                  handleChangeDate={(from, to) => {
                    updateTask({
                      projectId: props.dataTasks.data[0].projectId,
                      taskId: props.task.task._id,
                      dueDate: {
                        from: from,
                        to: to,
                      },
                    });
                  }}
                />
              </div>
            </div>
            {props.dataTasks.data ? (
              <div className="d-flex bd-highlight align-items-center pb-2 task-project">
                <div className="bd-highlight task-body-header">Section</div>
                <div className="bd-highlight task-body-second">
                  <Dropdown
                    onClick={(event) => {
                      event.stopPropagation();
                    }}>
                    <Dropdown.Toggle>
                      {
                        props.dataTasks.data.filter(
                          (section) =>
                            section._id ===
                            (props.task.task.sectionId as string),
                        )[0].name
                      }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {props.dataTasks.data.map((section, i) => {
                        return (
                          <Dropdown.Item
                            onClick={(e) => {
                              // change section
                              taskService
                                .changeSection({
                                  projectId: section.projectId,
                                  taskId: props.task.task._id,
                                  sectionId1: props.task.task.sectionId as string,
                                  sectionId2: section._id,
                                })
                                .then((res) => {
                                  props.dataTasks.setData(
                                    res.data.data.allTasks,
                                  );
                                  props.task.setTask(res.data.data.taskUpdate);
                                })
                                .catch((err) => {
                                  toast.error(
                                    err.response.data.error ||
                                      'Một lỗi không mong muốn đã xảy ra',
                                  );
                                });
                            }}>
                            {section.name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="d-flex bd-highlight pb-2 align-items-center task-dependencies">
              <div className="bd-highlight task-body-header">Dependencies</div>
              <div className="bd-highlight task-body-second">
                <Dropdown
                  onClick={(event) => {
                    event.stopPropagation();
                  }}>
                  <Dropdown.Toggle style={{ padding: '0px' }}>
                    <div className="p-2 btn-task-priority">
                      {props.task.task.dependenciesTask?.name || '_'}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(event) => {
                        event.stopPropagation();
                        updateTask({
                          projectId: props.dataTasks.data[0]?.projectId,
                          taskId: props.task.task._id,
                          dependencies: null,
                        });
                      }}>
                      _
                    </Dropdown.Item>
                    {props.dataTasks.data.map((section) =>
                      section.tasks.map((task) => (
                        <Dropdown.Item
                          onClick={(event) => {
                            event.stopPropagation();
                            updateTask({
                              projectId: props.dataTasks.data[0]?.projectId,
                              taskId: props.task.task._id,
                              dependencies: task._id,
                            });
                          }}>
                          {task.name}
                        </Dropdown.Item>
                      )),
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="d-flex bd-highlight align-items-center pb-2 task-labels">
              <div className="bd-highlight task-body-header">Label </div>
              <div className="bd-highlight task-body-second">
                <div className="d-flex justify-content-start">
                  {props.task.task.labels.map((label) => {
                    return (
                      <div
                        className="d-flex justify-content-start align-items-center mr-1 task-lable-group"
                        style={{ backgroundColor: label.color }}>
                        <div
                          className="mr-1 label-task"
                          id={'label-show-' + label._id}>
                          {label.name}
                          <UncontrolledTooltip
                            delay={0}
                            target={'label-show-' + label._id}>
                            {label.description}
                          </UncontrolledTooltip>
                        </div>
                        <div
                          className="mr-1 label-task-X"
                          onClick={() => {
                            let labels = [];
                            props.task.task.labels.forEach((_label) => {
                              if (_label._id !== label._id) {
                                labels.push(_label._id);
                              }
                            });
                            taskService
                              .updateTask({
                                projectId: props.dataTasks.data[0].projectId,
                                taskId: props.task.task._id,
                                labels: [...labels],
                              })
                              .then((res) => {
                                props.dataTasks.setData(res.data.data.allTasks);
                                props.task.setTask(res.data.data.taskUpdate);
                              })
                              .catch((err) => {
                                toast.error(
                                  err.response.data.error ||
                                    'Một lỗi không mong muốn đã xảy ra',
                                );
                              });
                          }}>
                          X
                        </div>
                      </div>
                    );
                  })}
                  {/* <div className="d-flex justify-content-start"> */}
                  <Dropdown
                    onClick={(event) => {
                      event.stopPropagation();
                    }}>
                    <Dropdown.Toggle className="add-label">+</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {props.labels.data.map((label, index) => {
                        return (
                          <Dropdown.Item
                            id={'label-dropdown-' + label._id}
                            style={{ backgroundColor: label.color }}
                            onClick={() => {
                              let labels = [];
                              props.task.task.labels.forEach((item, i) => {
                                labels.push(item._id);
                              });
                              if (labels.includes(label._id)) {
                                toast.error('Task đã được gán label');
                              } else {
                                labels.push(label._id);
                                taskService
                                  .updateTask({
                                    taskId: props.task.task._id,
                                    projectId:
                                      props.dataTasks.data[0].projectId,
                                    labels: [...labels],
                                  })
                                  .then((res) => {
                                    props.dataTasks.setData(
                                      res.data.data.allTasks,
                                    );
                                    props.task.setTask(
                                      res.data.data.taskUpdate,
                                    );
                                  })
                                  .catch((err) => {
                                    toast.error(
                                      err.response.data.error ||
                                        'Một lỗi không mong muốn đã xảy ra',
                                    );
                                  });
                              }
                            }}>
                            <span style={{ fontSize: '15px' }}>
                              {label.name}
                            </span>
                            {label.description !== '' ? (
                              <UncontrolledTooltip
                                delay={0}
                                target={'label-dropdown-' + label._id}>
                                {label.description}
                              </UncontrolledTooltip>
                            ) : (
                              <></>
                            )}
                          </Dropdown.Item>
                        );
                      })}
                      <Dropdown.Item
                        className="add-new-label"
                        onClick={() => {
                          // add new labels
                          setShowAddLabel(true);
                        }}>
                        Add new labels
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* -------------------------------Depcription------------------------- */}
            <div className="d-flex bd-highlight pb-2 task-description">
              <div className="bd-highlight task-body-header">Description</div>
              <div className="flex-grow-1 bd-highlight">
                <textarea
                  className="task-description-textarea"
                  placeholder="Add more details to this task..."
                  value={description}
                  onChange={(event) => {
                    // change description
                    setShowBtnDes(true);
                    setDescription(event.target.value);
                  }}></textarea>
                {showBtnDes ? (
                  <div className="bd-highlight">
                    <div
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        updateTask({
                          projectId: props.dataTasks.data[0].projectId,
                          taskId: props.task.task._id,
                          description: description,
                        });
                        setShowBtnDes(false);
                      }}>
                      Lưu
                    </div>
                    <div
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setDescription(props.task.task.description);
                        setShowBtnDes(false);
                      }}>
                      Hủy
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* ----------------------Create by------------------- */}
            <div className="d-flex bd-highlight align-items-center mt-4 task-creator">
              <div className="bd-highlight task-body-header">Created </div>
              <div
                className="flex-grow-1 bd-highlight"
                style={{ color: 'black' }}>
                <i>
                  {moment(props.task.task.updatedAt).format(
                    'HH:MM - DD/MM/YYYY',
                  )}
                </i>
                <i>
                  {' '}
                  by <b>{props.task.task.authorId.username} </b>
                </i>
              </div>
            </div>
            <div className="d-flex bd-highlight align-items-center mt-4 task-creator">
              <div className="bd-highlight task-body-header">Last update</div>
              <div
                className="flex-grow-1 bd-highlight"
                style={{ color: 'black' }}>
                <i>
                  {moment(props.task.task.updatedAt).format(
                    'HH:MM - DD/MM/YYYY',
                  )}
                </i>
              </div>
            </div>
          </div>
          <div className="task-footer d-flex justify-content-end">
            <Button
              className="mr-3"
              style={{
                backgroundColor: '#7b68ee',
                color: 'white',
              }}
              onClick={() => {
                props.setShow(false);
              }}>
              Close
            </Button>
          </div>
        </div>
        <ModalTrueFalse
          show={showModalTrueFalse}
          size="sm"
          data={{
            title: `delete "${props.task.task.name}"`,
            button_1: { title: 'No' },
            button_2: { title: 'Yes' },
          }}
          setClose={() => setShowModalTrueFalse(false)}
          funcButton_1={() => {
            setShowModalTrueFalse(false);
          }}
          funcButton_2={() => {
            taskService
              .deleteTask({
                projectId: props.dataTasks.data[0].projectId,
                taskId: props.task.task._id,
              })
              .then((res) => {
                toast.success('Xóa task thành công');
                props.dataTasks.setData(res.data.data);
                props.setShow(false);
              })
              .catch((err) => {
                toast.error(
                  err.response.data?.error ||
                    'Một lỗi không mong muốn đã xảy ra',
                );
              });
          }}
        />
        <ModalAddLabel
          projectId={props.dataTasks.data[0].projectId}
          show={showAddLabel}
          close={() => {
            setShowAddLabel(false);
          }}
          labels={{ ...props.labels }}
        />
      </div>
    )
  );
};
