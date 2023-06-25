import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';

import { Label, Section } from './InterfaceTask';
import { taskService } from '../../services/task/api';

interface Props {
  show: boolean;
  callBack: () => void;
  isAddEvent?: boolean;
  projectId?: string;
  section?: Section;
  dataTasks?: { data: Array<Section>; setData: (data: Array<Section>) => void };
  labels: {
    data: Array<Label>;
    setData: (labels: Array<Label>) => void;
  };
}

const ModalAddTask: React.FC<Props> = (props: Props) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [labelId, setLabelId] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setHours(0)),
    to: new Date(new Date().setHours(23)),
  });

  const addTask = () => {
    if (taskName === '') {
      toast.error('Please enter all required information');
      return;
    }
    taskService
      .addTask({
        projectId: props.projectId,
        sectionId: props.section._id,
        name: taskName,
        description: description,
        labels: labelId,
        dueDate: dueDate,
      })
      .then((res) => {
        setLabelId([]);
        setTaskName('');
        setDueDate({ from: new Date(), to: new Date() });
        props.dataTasks.setData(res.data.data);
        toast.success('Success');
        props.callBack();
      })
      .catch((err) => {
        toast.error(
          err.response.data?.error || 'An unexpected error occurred',
        );
      });
  };

  const renderColor = () => {
    return props.labels.data.map((label) => (
      <>
        <button
          type="button"
          onClick={() => {
            if (!labelId.includes(label._id)) {
              setLabelId([...labelId, label._id]);
            } else {
              const newLabelId = labelId.filter((id) => id !== label._id);
              setLabelId(newLabelId);
            }
          }}
          style={{ backgroundColor: label.color }}
          className={`${
            labelId.includes(label._id) ? 'active' : ''
          } btn mr-1`}></button>
        <span className="mr-3">{label.name}</span>
      </>
    ));
  };

  return (
    <div className="calendar-task">
      
      <Modal size="sm" className="width-" show={props.show} scrollable centered>
        <Modal.Header>
          <label className="form-control-label m-0">
            Section: <b>{props.section?.name}</b>
          </label>
        </Modal.Header>
        <Modal.Body>
          <form className="new-event--form">
            <div className="form-group">
              <input
                placeholder="Event Title"
                type="text"
                className="form-control-alternative new-event--title form-control"
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="flex justify-between">Label</label>
              <div
                className="btn-group-toggle btn-group-colors event-tag btn-group align-items-center">
                {renderColor()}
              </div>
            </div>
            <div className="form-group">
              <label className="flex justify-between">Description</label>
              <textarea
                style={{ height: '80px' }}
                placeholder="Task Description"
                className="form-control-alternative edit-event--description textarea-autosize form-control mr-2"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}></textarea>
              <i className="form-group--bar"></i>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {props.isAddEvent ? (
            <div>
      
                           
              <button className="bookmarkBtn"    onClick={() => {
                  addTask();
                }}>
  <span className="IconContainer"> 
    <svg viewBox="0 0 384 512" height="0.9em" className="icon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
  </span>
  <p className="text">Save</p>
</button>
              
            </div>
          ) : (
            <div>
              <Button
                style={{
                  backgroundColor: '#5e72e4',
                }}
                onClick={(e) => {}}>
                Update
              </Button>
              <Button
                style={{
                  backgroundColor: '#f5365c',
                }}
                onClick={(e) => {}}>
                Delete
              </Button>
            </div>
          )}
 
          <button
               onClick={() => props.callBack()}
                className="noselect"><span className="text">Close</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
             
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddTask;
