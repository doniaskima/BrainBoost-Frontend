/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { isNull } from 'util';
import ModalCalendar from './ModalCalendar';

const MyCalendar: React.FC = () => {
  const [dataUser, setDataUser] = useState({
    userId: '',
    role: '',
    username: '',
    avatar: '',
    language: '',
    email: '',
    birthday: '',
  });
  const [monthYear, setMonthYear] = useState({
    month: new Date(Date.now()).getMonth(),
    year: new Date(Date.now()).getFullYear(),
  });
  const currentDate = new Date(Date.now());
  const [selectDate, setSelectDate] = useState(new Date(Date.now()));
  const [selectDateTask, setSelectDateTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    arrDate: {},
    arrTaskId: {},
    listTask: {
      '': {
        id: '',
        authorId: '',
        taskname: '',
        typeTask: '',
        projectId: '',
        projectName: '',
        deadline: '',
      },
    },
    statusDate: {
      '': {
        finished: 0,
        unfinished: 0,
      },
    },
  });

  useEffect(() => {
    // const fetchUserInfo = async () => {
    //   try {
    //     const response = await axios.get('/users/getUserInfo?userId=');
    //     const postData = JSON.parse(JSON.stringify(response.data.data));
    //     setDataUser(postData);
    //   } catch (error) {
    //     toast.error('Failed to fetch user information');
    //   }
    // };

    // const fetchAllTaskUser = async () => {
    //   try {
    //     const response = await axios.get('/task/getAllTaskUser');
    //     console.log(response.data.data);
    //     setData({ ...response.data.data });
    //   } catch (error) {
    //     toast.error('Failed to fetch task data');
    //   }
    // };

    // fetchUserInfo();
    // fetchAllTaskUser();
    // getAllDay();
  }, []);

  const getAllDay = () => {
    let numOfDays = new Date(monthYear.year, monthYear.month, 0).getDate();
    let days = [];
    let firstDay = new Date(monthYear.year, monthYear.month, 0).getDay();
    for (let j = 0; j < Math.ceil((numOfDays + firstDay + 1) / 7); j++) {
      let dayOfWeek = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(
          monthYear.year,
          monthYear.month,
          j * 7 + i - firstDay,
        );
        dayOfWeek.push({
          fullDate: date,
          day: date.getDay(),
          date: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        });
      }
      days.push(dayOfWeek);
    }
    return days;
  };

  function equalDate(date1, date2) {
    let d1 = date1.getDate(),
      m1 = date1.getMonth(),
      y1 = date1.getFullYear();
    let d2 = date2.getDate(),
      m2 = date2.getMonth(),
      y2 = date2.getFullYear();
    return d1 === d2 && m1 === m2 && y1 === y2;
  }

  function isEqualDateTask(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePrevMonth = () => {
    let month = monthYear.month - 1;
    let year = monthYear.year;
    if (month < 0) {
      month = 11;
      year--;
    }
    setMonthYear({ month, year });
  };

  const handleNextMonth = () => {
    let month = monthYear.month + 1;
    let year = monthYear.year;
    if (month > 11) {
      month = 0;
      year++;
    }
    setMonthYear({ month, year });
  };

  const handleSelectDate = (date) => {
    setSelectDate(date);
    setSelectDateTask(data.arrDate[date.fullDate]);
    toggleModal();
  };

  const handleLogout = () => {
    // Implement logout functionality
  };

  return (
    <Container>
      {/* Calendar header */}
      <div className="header d-flex align-items-center justify-content-between">
        <div className="left">
          <button
            type="button"
            className="btn btn-link"
            onClick={handlePrevMonth}
          >
            Previous Month
          </button>
        </div>
        <div className="center">
          <h3>
            {monthYear.month + 1}/{monthYear.year}
          </h3>
        </div>
        <div className="right">
          <button
            type="button"
            className="btn btn-link"
            onClick={handleNextMonth}
          >
            Next Month
          </button>
        </div>
      </div>

      {/* Calendar body */}
      <div className="body">
        <table className="table">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {getAllDay().map((week, index) => (
              <tr key={index}>
                {week.map((day) => (
                  <td
                    key={day.fullDate.toString()}
                    className={`${
                      day.month === monthYear.month ? 'active' : 'inactive'
                    } ${
                      equalDate(currentDate, day.fullDate) ? 'current' : ''
                    } ${
                      isEqualDateTask(day.fullDate, selectDate)
                        ? 'has-task'
                        : ''
                    }`}
                    onClick={() => handleSelectDate(day)}
                  >
                    <span className="date">{day.date}</span>
                    <div className="task-indicator">
                      {data.statusDate[day.fullDate] &&
                      !isNull(data.statusDate[day.fullDate]) ? (
                        <div>
                          <span className="finished">
                            {
                              data.statusDate[day.fullDate].finished
                            }
                          </span>
                          <span className="unfinished">
                            {
                              data.statusDate[day.fullDate].unfinished
                            }
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calendar footer */}
      <div className="footer d-flex align-items-center justify-content-end">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <img
              src={dataUser.avatar}
              className="avatar rounded-circle"
              alt="User Avatar"
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header>
              <div className="user-info">
                <img
                  src={dataUser.avatar}
                  className="avatar rounded-circle"
                  alt="User Avatar"
                />
                <div className="user-name">
                  <span>{dataUser.username}</span>
                  <span className="role">{dataUser.role}</span>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>

      {/* Task Modal */}
      {showModal && (
        <ModalCalendar
          isOpen={showModal}
          toggle={toggleModal}
          selectDate={selectDate}
          selectDateTask={selectDateTask}
          data={data}
          setData={setData}
        />
      )}
    </Container>
  );
};

export default MyCalendar;
