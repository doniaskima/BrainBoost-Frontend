/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Assignment } from './InterfaceTask';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/utils';
import axios from 'axios';


interface PropsAssignee {
  assignment: Array<Assignment>;
  projectId: string;
  config?: {
    isShowName?: boolean;
    style?: any;
    isDisabled?: boolean;
  };
  handleInvite?: (user: Assignment) => void;
  handleDelete?: (user: Assignment) => void;
}

export const DropdownAssignee: React.FC<PropsAssignee> = (
  props: PropsAssignee,
) => {
  const [isShowInvite, setIsShowInvite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usersOutTask, setUserOutTask] = useState<Array<Assignment>>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getUsers?projectId=${props.projectId}`);
        const listUsers = [];
        for (let i = 0; i < response.data.data.users?.length; i++) {
          const assignee = props.assignment.filter((ass) => ass._id === response.data.data.users[i]._id);
          if (assignee.length === 0) {
            listUsers.push(response.data.data.users[i]);
          }
          if (i === response.data.data.users.length - 1) {
            setUserOutTask(listUsers);
          }
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.error || 'An unexpected error occurred.'
        );
      }
    };

    fetchUsers();
  }, [props.assignment, props.projectId]);

  return (
    <div className="user-assignee-block d-flex justify-content-start">
      {props.assignment.length < 3 ? (
        props.assignment.map((user) => (
          <div
            style={{
              padding: '0px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              ...props.config.style,
            }}>
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="avatar"
                src={
                  user.avatar ||
                  'https://api.hoclieu.vn/images/game/bbfb3597f173af631cb24f6ee0f8b8da.png'
                }
              />
            </span>
          </div>
        ))
      ) : (
        <>
          {[0, 1].map((index) => (
            <div
              style={{
                padding: '0px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                ...props.config.style,
              }}>
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="avatar"
                  src={
                    props.assignment[index].avatar ||
                    'https://api.hoclieu.vn/images/game/bbfb3597f173af631cb24f6ee0f8b8da.png'
                  }
                />
              </span>
            </div>
          ))}
          {props.assignment.length > 2 ? (
            <>
              <div
                style={{
                  padding: '0px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'default',
                  ...props.config.style,
                }}>
                <div className="d-flex align-items-center justify-content-center user-avatar">
                  <span className="avatar avatar-sm rounded-circle">
                    <b>{props.assignment.length - 2}+</b>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
      {!props.config.isDisabled ? (
        <Dropdown
          show={showModal}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onToggle={(isOpen, event, metadata) => {
            setShowModal(isOpen);
            if (!isOpen) {
              setIsShowInvite(false);
            }
          }}>
          <Dropdown.Toggle
            style={{
              padding: '0px',
              border: 'none',
              backgroundColor: '#ffffff',
            }}>
            <div
              style={{
                padding: '0px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                ...props.config.style,
              }}>
              <div className="d-flex align-items-center justify-content-center user-avatar">
                <span className="avatar avatar-sm rounded-circle">+</span>
              </div>
            </div>
          </Dropdown.Toggle>
          <span className="pl-2">
            {props.config?.isShowName && props.assignment.length > 0
              ? props.assignment.map((value) => (
                  <span className="p-1">{value.username};</span>
                ))
              : ''}
          </span>
          <Dropdown.Menu>
            {isShowInvite ? (
              <div className="w-100 p-3">
                <div className="d-flex bd-highlight border border-top-0 border-right-0 border-left-0 mb-3">
                  <div className="flex-grow-1 bd-highlight">Assignee</div>
                  <div
                    className="bd-highlight"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setIsShowInvite(false);
                    }}>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
                {usersOutTask.length > 0 ? (
                  usersOutTask.map((user) => (
                    <div className="d-flex bd-highlight justify-content-center align-items-center">
                      <div className="p-2 bd-highlight">
                        <img src={user.avatar} className="user-avatar" />
                      </div>
                      <div className="mr-auto bd-highlight pl-1 pr-1">
                        {user.username}
                      </div>
                      <div className="p-2 bd-highlight">
                        <div
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            if (props.handleInvite) {
                              props.handleInvite(user);
                            }
                          }}>
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-center p-2">
                  Assignee
                </div>
                {props.assignment.map((user, index) => {
                  return (
                    <Dropdown.Item>
                      <div className="d-flex bd-highlight align-items-center">
                        <div className="p-2 bd-highlight">
                          <img src={user.avatar} className="user-avatar" />
                        </div>
                        <div className="mr-auto bd-highlight pl-1 pr-1">
                          {user.username}
                        </div>
                        <div className="bd-highlight pl-1 pr-1">
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            color="#F06A6F"
                            onClick={(event) => {
                              event.stopPropagation();
                              props.handleDelete(user);
                            }}
                          />
                        </div>
                      </div>
                    </Dropdown.Item>
                  );
                })}
                <Dropdown.Item className="border border-left-0 border-right-0 border-bottom-0">
                  <div
                    className="d-flex bd-highlight align-items-center"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsShowInvite(true);
                    }}>
                    <div className="p-2 bd-highlight">
                      <FontAwesomeIcon icon={faPlus} color="#5882CC" />
                    </div>
                    <div
                      className="mr-auto bd-highlight pl-1 pr-1"
                      style={{ color: '#5882CC' }}>
                     Add assignee
 
                    </div>
                  </div>
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <></>
      )}
    </div>
  );
};
interface PropsCalendar {
  startDate: Date;
  endDate: Date;
  handleChangeDate?: (from, to) => void;
  config?: {
    isDisabled?: boolean;
    breakLine?: boolean;
  };
}
export const CalenderModal: React.FC<PropsCalendar> = (
  props: PropsCalendar,
) => {
  const [state, setState] = useState([
    {
      startDate: new Date(props.startDate),
      endDate: new Date(props.endDate),
      key: 'selection',
    },
  ]);
  useEffect(() => {
    setState([
      {
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        key: 'selection',
      },
    ]);
  }, [props]);
  const [showModal, setShowModal] = useState(false);
  const renderDate = () => {
    return (
      <>
        {moment.utc(state[0].startDate).local().format('DD/MM/YYYY')}
        {props.config.breakLine ? <br /> : ''}-{' '}
        {moment.utc(state[0].endDate).local().format('DD/MM/YYYY')}
      </>
    );
  };
  const renderCalendar = () => {
    // choose date from ... to ...
    return (
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          setState([
            {
              ...item.selection,
              endDate: new Date(item.selection.endDate.setHours(23)),
            },
          ]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    );
  };
  return (
    <div className="calendar-modal">
      <Dropdown
        show={props.config?.isDisabled ? false : showModal}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onToggle={(isOpen, event, metadata) => {
          setShowModal(isOpen);
          if (!isOpen) {
            setState([
              {
                startDate: new Date(props.startDate),
                endDate: new Date(props.endDate),
                key: 'selection',
              },
            ]);
          }
        }}>
        <Dropdown.Toggle
          style={{ padding: '0px', margin: '0px', borderRadius: '5px' }}>
          <div className="btn btn-primary btn-sm">{renderDate()}</div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <>
            {renderCalendar()}
            <div className="d-flex bd-highlight p-2 footer-modal">
              <div className="bd-highlight">
                <div
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setShowModal(false);
                    props.handleChangeDate(
                      state[0].startDate,
                      state[0].endDate,
                    );
                  }}>
                   Save
                </div>
              </div>
            </div>
          </>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
