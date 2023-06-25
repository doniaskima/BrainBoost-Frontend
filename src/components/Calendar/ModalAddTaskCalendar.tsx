/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { Label, Section, Task } from '../Tasks/InterfaceTask';
import { taskService } from '../../services/task/api';
import { CalenderModal } from '../Tasks/Help';

interface Props {
  show: { status: boolean; setStatus: (value) => void };
  projectId: string;
  dataTasks: { data: Array<Section>; setData: (data) => void };
  labels: {
    data: Array<Label>;
    setData: (labels) => void;
  };
  dueDate: {
    from: string;
    to: string;
  };
}

const ModalAddTaskCalendar: React.FC<Props> = (props: Props) => {
  const [labelsTask, setLabelsTask] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setHours(0)),
    to: new Date(new Date().setHours(23)),
  });
  const [dependencies, setDependencies] = useState<Task>(null);
  const [sectionId, setSectionId] = useState<string>(
    props.dataTasks?.data[0]?._id,
  );

  useEffect(() => {
    setSectionId(props.dataTasks?.data[0]?._id || null);
    setDueDate({
      from: new Date(props.dueDate.from),
      to: new Date(props.dueDate.to),
    });
  }, [props.dataTasks, props.dueDate]);

  const addTask = () => {
    if (!taskName) {
      toast.error('Please enter a task name before updating');
      return;
    }
    taskService
      .addTask({
        projectId: props.projectId,
        name: taskName,
        sectionId: sectionId,
        dependencies: dependencies?._id || null,
        dueDate: dueDate,
        labels: labelsTask,
        description: description,
      })
      .then((res) => {
        toast.success('Success');
        props.dataTasks.setData(res.data.data);
        props.show.setStatus(false);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || 'An unexpected error occurred',
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

  return (
    <div className="calendar-task">
      <Modal
        size="sm"
        show={props.show.status} // false: Don't display, true: Display
        scrollable
        onHide={() => {
          props.show.setStatus(false);
        }}
        centered>
        <Modal.Header>
          <h1>Create a new task</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form modalEditTaskCalendar">
            <div className="form-group">
              <label className="form-control-label">Task Name</label>
              <div className="task-body-second">
                <input
                  placeholder="Task name"
                  type="text"
                  className="form-control-alternative new-event--title form-control"
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="m-4 flex justify-start">Section</label>
              <div className="bd-highlight task-body-second">
                <Dropdown
                  onClick={(event) => {
                    event.stopPropagation();
                  }}>
                  <Dropdown.Toggle style={{ padding: '10px' }}>
                    {getSectionCurrent()?.name || ''}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {props.dataTasks?.data?.map((section) => (
                      <Dropdown.Item
                        onClick={(event) => {
                          event.stopPropagation();
                          setSectionId(section._id);
                        }}>
                        {section.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="form-group">
              <label className="form-control-label d-block mb-3">Label</label>
              <div
                data-toggle="buttons"
                role="group"
                className="btn-group-toggle btn-group-colors event-tag btn-group align-items-center task-body-second">
                {renderColor()}
              </div>
            </div>
            <div className="form-group">
              <label className="form-control-label d-block mb-3">
                Dependencies
              </label>
              <div className="bd-highlight task-body-second">
                <Dropdown
                  onClick={(event) => {
                    event.stopPropagation();
                  }}>
                  <Dropdown.Toggle style={{ padding: '10px' }}>
                    {dependencies?.name || '_'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(event) => {
                        event.stopPropagation();
                        setDependencies(null);
                      }}>
                      _
                    </Dropdown.Item>
                    {props.dataTasks.data.map((section) =>
                      section.tasks.map((task) => (
                        <Dropdown.Item
                          onClick={(event) => {
                            event.stopPropagation();
                            setDependencies(task);
                          }}>
                          {task.name}
                        </Dropdown.Item>
                      )),
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="form-group">
              <label className="form-control-label">Due date</label>
              <div className="task-body-second">
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
            </div>
            <div className="form-group">
              <label className="form-control-label">Description</label>
              <textarea
                style={{ height: '100px' }}
                defaultValue={description}
                className="form-control-alternative edit-event--description textarea-autosize form-control mr-2 task-body-second"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}></textarea>
              <i className="form-group--bar"></i>
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
                addTask();
              }}>
              Create
            </Button>
          </div>
          <button
            type="button"
            className="ml-auto btn btn-link"
            onClick={() => props.show.setStatus(false)}
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

export default ModalAddTaskCalendar;
