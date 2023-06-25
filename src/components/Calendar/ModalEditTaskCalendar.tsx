/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { Assignment, Label, Section, Task } from '../Tasks/InterfaceTask';
import { taskService } from '../../services/task/api';
import { CalenderModal, DropdownAssignee } from '../Tasks/Help';
import ModalTrueFalse from '../Tasks/ModalTrueFalse';



interface Props {
  show: { status: boolean; setStatus: (value) => void };
  projectId: string;
  task: Task;
  dataTasks: { data: Array<Section>; setData: (data) => void };
  labels: {
    data: Array<Label>;
    setData: (labels) => void;
  };
}
const ModalEditTaskCalendar: React.FC<Props> = (props: Props) => {
  const [labelsTask, setLabelsTask] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  // const [assignmentId, setAssignmentId] = useState([]);
  const [assignment, setAssignment] = useState<Array<Assignment>>([]);
  const [dueDate, setDueDate] = useState<{ from: Date; to: Date }>({
    from: props.task?.dueDate.from || new Date(new Date().setHours(0)),
    to: props.task?.dueDate.to || new Date(new Date().setHours(23)),
  });
  const [dependencies, setDependencies] = useState<Task>(null);
  const [sectionId, setSectionId] = useState<string>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  useEffect(() => {
    setTaskName(props.task?.name || '');
    setLabelsTask([]);
    setDescription(props.task?.description || '');
    setDueDate({
      from: props.task?.dueDate.from || new Date(),
      to: props.task?.dueDate.to || new Date(),
    });
    setAssignment([...(props.task?.assignment || [])]);
    setDependencies(props.task?.dependenciesTask || null);
    setSectionId((props.task?.sectionId as string) || null);
    props.task?.labels.forEach((item) => {
      setLabelsTask([...labelsTask, item._id]);
    });
  }, [props.task]);
  const updateTask = () => {
    if (!taskName) {
      toast.error('Please enter a task name before updating.');
      return;
    }
    taskService
      .updateTask({
        taskId: props.task._id,
        projectId: props.projectId,
        assignment: getAssignmentId(),
        dependencies: dependencies?._id || null,
        description: description,
        dueDate: dueDate,
        name: taskName,
        labels: labelsTask,
      })
      .then((res) => {
        if (sectionId !== props.task?.sectionId) {
          taskService
            .changeSection({
              projectId: props.projectId,
              taskId: props.task?._id,
              sectionId1: props.task?.sectionId as string,
              sectionId2: sectionId,
            })
            .then((res) => {
              toast.success('Success');
              props.dataTasks.setData(res.data.data.allTasks);
              props.show.setStatus(false);
            })
            .catch((err) => {
              toast.error(
                err.response?.data?.error ||
                'An unexpected error occurred.',
              );
            });
        } else {
          toast.success('Success');
          props.dataTasks.setData(res.data.data.allTasks);
          props.show.setStatus(false);
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || ' An unexpected error occurred.',
        );
      });
  };
  const deleteTask = () => {
    taskService
      .deleteTask({
        projectId: props.projectId,
        taskId: props.task._id,
      })
      .then((res) => {
        toast.success('Success');
        props.show.setStatus(false);
        props.dataTasks.setData(res.data.data);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || ' An unexpected error occurred.',
        );
      });
  };
  const renderColor = () => {
    return props.labels.data.map((label) => (
      <>
        <button
          type="button"
          onClick={() => {
            if (!labelsTask.includes(label._id)) {
              setLabelsTask([...labelsTask, label._id]);
            } else {
              labelsTask.splice(labelsTask.indexOf(label._id), 1);
              setLabelsTask([...labelsTask]);
            }
          }}
          style={{ backgroundColor: label.color }}
          className={`${
            labelsTask.includes(label._id) ? 'active' : ''
          } btn mr-1`}></button>
        <span className="mr-3">{label.name}</span>
      </>
    ));
  };
  const getSectionCurrent = () => {
    if (sectionId && props.dataTasks?.data) {
      for (let i = 0; i < props.dataTasks?.data?.length; i++) {
        if (props.dataTasks?.data[i]?._id === sectionId) {
          return props.dataTasks?.data[i];
        }
      }
    } else {
      return null;
    }
  };
  const getAssignmentId = () => {
    let assignmentId = [];
    for (let i = 0; i < assignment.length; i++) {
      assignmentId.push(assignment[i]._id);
    }
    return assignmentId;
  };

  return (
    <div className="calendar-task">
    <Modal
      size="sm"
      show={props.show.status}
      scrollable
      onHide={() => {
        props.show.setStatus(false);
      }}
      centered
    >
      <Modal.Header>
        <h1>Update</h1>
      </Modal.Header>
      <Modal.Body>
        <form className="new-event--form modalEditTaskCalendar">
          <div className="form-group">
            <label>Task name</label>
            <input
              placeholder="Task name"
              defaultValue={props.task?.name}
              type="text"
              className="form-control-alternative new-event--title form-control"
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Section</label>
            <Dropdown
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Dropdown.Toggle style={{ padding: '10px' }}>
                {getSectionCurrent()?.name || ''}
              </Dropdown.Toggle>
              <Dropdown.Menu className="mb-4">
                {props.dataTasks?.data?.map((section) => (
                  <Dropdown.Item
                    className="pb-8"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSectionId(section._id);
                    }}
                  >
                    {section.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="form-group">
            <label>Label</label>
            <div className="btn-group-toggle btn-group-colors event-tag btn-group align-items-center task-body-second" data-toggle="buttons" role="group">
              {renderColor()}
            </div>
          </div>
          <div className="">
            <label>Assignment</label>
            <DropdownAssignee
              assignment={assignment || []}
              projectId={props.projectId}
              config={{
                isShowName: false,
              }}
              handleInvite={(user: Assignment) => {
                if (!getAssignmentId().includes(user._id)) {
                  setAssignment([...assignment, user]);
                }
              }}
              handleDelete={(user) => {
                if (getAssignmentId().includes(user._id)) {
                  assignment.splice(getAssignmentId().indexOf(user._id), 1);
                  setAssignment([...assignment]);
                }
              }}
            />
          </div>
          <div className="form-group">
            <label>Dependencies</label>
            <Dropdown
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Dropdown.Toggle style={{ padding: '10px' }}>
                {dependencies?.name || '_'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(event) => {
                    event.stopPropagation();
                    setDependencies(null);
                  }}
                >
                  _
                </Dropdown.Item>
                {props.dataTasks.data.map((section) =>
                  section.tasks.map((task) => (
                    <Dropdown.Item
                      onClick={(event) => {
                        event.stopPropagation();
                        setDependencies(task);
                      }}
                    >
                      {task.name}
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="form-group">
            <label>Due date</label>
            <CalenderModal
              config={{ isDisabled: false }}
              startDate={dueDate.from}
              endDate={dueDate.to}
              handleChangeDate={(from, to) => {
                setDueDate({
                  from: from,
                  to: to,
                });
              }}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              style={{ height: '100px' }}
              defaultValue={description}
              className="form-control-alternative edit-event--description textarea-autosize form-control mr-2 task-body-second"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <i className="form-group--bar"></i>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            style={{ backgroundColor: '#5e72e4' }}
            onClick={(e) => {
              updateTask();
            }}
          >
            Update
          </Button>
          <Button
            style={{ backgroundColor: '#f5365c' }}
            onClick={(e) => {
              setShowDelete(true);
            }}
          >
            Delete
          </Button>
        </div>
        <button
          type="button"
          className="ml-auto btn btn-link"
          onClick={() => props.show.setStatus(false)}
          style={{ color: '#5e72e4' }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
    <ModalTrueFalse
      data={{
        button_1: {
          title: 'No',
        },
        button_2: {
          title: 'Yes',
        },
        title: `delete '${props.task?.name}'`,
      }}
      funcButton_1={() => {
        setShowDelete(false);
      }}
      funcButton_2={() => {
        deleteTask();
      }}
      setClose={() => {
        setShowDelete(false);
      }}
      funcOnHide={() => {
        setShowDelete(false);
      }}
      show={showDelete}
      size={'sm'}
    />
  </div>
  
  );
};

export default ModalEditTaskCalendar;
