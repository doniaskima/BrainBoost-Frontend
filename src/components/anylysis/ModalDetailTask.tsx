/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
 
import { Section, Task } from '../Tasks/InterfaceTask';
import { randomColor } from 'randomcolor';
import { TaskUser } from './ProjectAnalysis';

interface Props {
  show: boolean;
  funcQuit: () => void;
  funcOnHide: () => void;
  dataUser: TaskUser;
  size?: 'sm' | 'lg' | 'xl';
}

const ModalDetailTask: React.FC<Props> = (props: Props) => {
  const [totalTask, setTotalTask] = useState<{
    totalTask: number;
    totalComplete: number;
  }>({ totalTask: 0, totalComplete: 0 });
  const [sections, setSections] = useState<Array<Section>>([]);
  const [complete, setComplete] = useState<{
    complete: Array<Task>;
    unComplete: Array<Task>;
  }>({
    complete: [],
    unComplete: [],
  });
  const [overdeadline, setOverdeadline] = useState<Array<Task>>([]);
  useEffect(() => {
    setTotalTask({
      totalTask: props.dataUser?.tasks?.length,
      totalComplete: 0,
    });
    let sectionsId: Array<string> = [];
    let totalComplete = 0;
    let listSections = [];
    let overDeadline = [];
    let complete = [];
    let unComplete = [];
    props.dataUser?.tasks.forEach((task, index) => {
      if (task.isDone) {
        totalComplete++;
        complete.push(task);
      } else {
        if (new Date(task.dueDate.to) < new Date()) {
          overDeadline.push(task);
        } else {
          unComplete.push(task);
        }
      }
      let section: Section = task.sectionId as Section;
      if (sections.length === 0 || !sectionsId.includes(section._id)) {
        sectionsId.push(section._id);
        listSections.push({
          ...section,
          tasks: [task],
        });
      } else if (sectionsId.includes(section._id)) {
        let indexSection = sectionsId.indexOf(section._id);
        listSections[indexSection].tasks.push(task);
      }
      if (index === props.dataUser.tasks.length - 1) {
        setSections(listSections);
        setComplete({
          complete: [...complete],
          unComplete: [...unComplete],
        });
        setOverdeadline([...overDeadline]);
      }
    });
    setTotalTask({
      totalComplete: totalComplete,
      totalTask: props.dataUser?.tasks?.length,
    });
  }, [props.dataUser]);
  const getProgressColor = (value) => {
    if (value >= 80) {
      //80-100
      return '#01AD23';
    }
    if (value >= 60) {
      // 60-80
      return '#80C02B';
    }
    if (value >= 40) {
      //40-60
      return '#FFD334';
    }
    if (value >= 20) {
      //20-40
      return '#F08130';
    }
    return '#E22E2F'; //0-20
  };

  const CalcPercent = () => {
    return totalTask.totalTask === 0
      ? NaN
      : Math.floor(
          (totalTask.totalComplete / totalTask.totalTask) * 100 + 0.05,
        );
  };
  const percent = CalcPercent() || 0;
  return (
    <>
      <Modal
        size={props.size ? 'sm' : props.size}
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
          props.funcOnHide();
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{props?.dataUser?.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center mt-2 mb-3">
            <div
              className="col-1"
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: getProgressColor(percent),
              }}>
              {isNaN(percent) ? '0 task' : percent + '%'}
            </div>
            <div className="col-10">
              {isNaN(percent) ? (
                <>
                  <div
                    className="progress"
                    style={{ height: '25px', width: '100%' }}></div>
                </>
              ) : (
                <>
                  <div
                    className="progress progress-bar-striped"
                    style={{ height: '25px', width: '100%' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: percent === 0 ? '0.2%' : percent + '%',
                        height: '25px',
                        backgroundColor: getProgressColor(percent),
                      }}>
                      {percent}%
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {sections.map((section, index) => {
            let color = randomColor();
            return (
              <div className="row d-flex justify-content-center mb-3">
                <div className="col-11">
                  <div className="row">
                    <h3 style={{ color: color }}>
                      {section.name} ({section.tasks.length})
                    </h3>
                  </div>
                  <div className="row" style={{ width: '100%' }}>
                    {section.tasks.map((task, index) => (
                      <ItemTemp task={task} color={color} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          {complete.complete.length > 0 ? (
            <div className="row d-flex justify-content-center mb-3">
              <div className="col-11">
                <div className="row">
                  <h3 style={{ color: '#0b8000' }}>
                    Đã hoàn thành ({complete.complete.length})
                  </h3>
                </div>
                <div className="row" style={{ width: '100%' }}>
                  {complete.complete.map((task, index) => (
                    <ItemTemp task={task} color={'#0b9e00'} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {complete.unComplete.length > 0 ? (
            <div className="row d-flex justify-content-center mb-3">
              <div className="col-11">
                <div className="row">
                  <h3 style={{ color: '#bda400' }}>
                    Chưa hoàn thành ({complete.unComplete.length})
                  </h3>
                </div>
                <div className="row" style={{ width: '100%' }}>
                  {complete.unComplete.map((task, index) => (
                    <ItemTemp task={task} color={'#b9bf00'} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {overdeadline.length > 0 ? (
            <div className="row d-flex justify-content-center mb-3">
              <div className="col-11">
                <div className="row">
                  <h3 style={{ color: '#ff4a4a' }}>
                    Quá hạn ({overdeadline.length})
                  </h3>
                </div>
                <div className="row" style={{ width: '100%' }}>
                  {overdeadline.map((task, index) => (
                    <ItemTemp task={task} color={'#d60036'} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
interface PropsItemTemp {
  task: Task;
  color?: string;
}
export const ItemTemp: React.FC<PropsItemTemp> = (props: PropsItemTemp) => {
  const formatDate = (textDate) => {
    let date = new Date(textDate);
    console.log(date);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();
    return (
      (day.length < 2 ? '0' + day : day) +
      '/' +
      (month.length < 2 ? '0' + month : month) +
      '/' +
      year
    );
  };
  return (
    <div
      className="card"
      style={{
        width: '23%',
        padding: '5px',
        border: `2px solid ${props.color || '#bda400'}`,
        marginLeft: '2%',
        marginBottom: '2%',
      }}>
      <div className="card-body">
        <h4 className="card-title text-priamry">
          {props.task.name.toUpperCase()}
        </h4>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '11px',
            margin: '0px',
          }}>
          <span>Created by: </span>
          <span style={{ color: '#007BFF' }}>
            {props.task.authorId.username}
          </span>
        </p>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '11px',
            margin: '0px',
          }}>
          <span>Due date: </span>
          <span style={{ color: props.color || '#bda400' }}>
            {formatDate(props.task.dueDate.from)} -{' '}
            {formatDate(props.task.dueDate.to)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ModalDetailTask;
