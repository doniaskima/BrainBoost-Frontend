/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// reactstrap components
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { isNull } from 'util';
import { userService } from '../../services/user/api';
import ModalCalendar from './ModalCalendar';
import { taskService } from '../../services/task/api';
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
    userService.getUserInfo().then((response) =>
      Promise.resolve({
        data: JSON.parse(JSON.stringify(response.data.data)),
      }).then((post) => {
        setDataUser(post.data);
      }),
    );
    taskService
      .getAllTaskUser()
      .then((res) => {
        console.log(res.data.data);
        setData({ ...res.data.data });
      })
      .catch((err) => {
        toast.error('Không thể lấy dữ liệu');
      });
    getAllDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          day: date.getDay(), //Thứ
          date: date.getDate(), // ngày
          month: date.getMonth(), // tháng
          year: date.getFullYear(), // năm
        });
      }
      days.push(dayOfWeek);
    }
    return days;
  };
  function equalDate(date1, date2) {
    // date1 > date2: 1; date1 === date2: 0; date1 < date2: -1
    let d1 = date1.getDate(),
      m1 = date1.getMonth(),
      y1 = date1.getFullYear();
    let d2 = date2.getDate(),
      m2 = date2.getMonth(),
      y2 = date2.getFullYear();
    if (y1 < y2) {
      return -1;
    } else if (y1 > y2) {
      return 1;
    } else {
      //y1 === y2
      if (m1 < m2) {
        return -1;
      } else if (m1 > m2) {
        return 1;
      } else {
        if (d1 < d2) {
          return -1;
        } else if (d1 === d2) {
          return 0;
        } else {
          return 1;
        }
      }
    }
  }
  const formatDate = (date) => {
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
  // const toDateString = (date) => {
  //   return new Date(date).toDateString();
  // }; //date: string
  const checkCurrentDay = (date) => {
    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return true;
    }
    return false;
  };
  const choseDate = (date) => {
    setSelectDate(date.fullDate);
    setShowModal(true);
  };
  return (
    <>
      <ModalCalendar
        show={showModal}
        date={selectDate}
        funcQuit={() => setShowModal(false)}
        data={data}
        funcSelectDate={(date) => setSelectDate(date)}
        listTaskId={
          typeof data.arrDate[selectDate.toDateString()] === 'undefined'
            ? []
            : [...data.arrDate[selectDate.toDateString()]]
        }></ModalCalendar>
      <Container fluid style={{ position: 'absolute' }}>
        <div className="row mt-7 mb-3">
          <div className="col-8">
            <div className="row">
              <div className="col-2">
                <div
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    let newDate = new Date(
                      monthYear.year,
                      monthYear.month - 1,
                      1,
                    );
                    setMonthYear({
                      month: newDate.getMonth(),
                      year: newDate.getFullYear(),
                    });
                    getAllDay();
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16">
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </div>
              </div>
              <div className="col-2 d-flex justify-content-center">
                <UncontrolledDropdown disabled={false}>
                  <DropdownToggle
                    className="btn btn-outline-primary w-100"
                    role="button"
                    size="lg"
                    color=""
                    disabled={false}
                    onClick={(e) => e.preventDefault()}>
                    {monthYear.month + 1}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" left>
                    {Array.from({ length: 12 }, (_, index) => index).map(
                      (value, index) => {
                        return (
                          <DropdownItem
                            onClick={(e) => {
                              setMonthYear({
                                ...monthYear,
                                month: value,
                              });
                              getAllDay();
                            }}>
                            <span
                              style={{
                                color:
                                  value === monthYear.month
                                    ? '#006fe6'
                                    : '#c1c1c1',
                              }}>
                              <b>{value + 1}</b>
                            </span>
                          </DropdownItem>
                        );
                      },
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <div className="col-2 d-flex justify-content-center">
                <UncontrolledDropdown disabled={false}>
                  <DropdownToggle
                    className="btn btn-outline-primary w-100"
                    role="button"
                    size="lg"
                    color=""
                    disabled={false}
                    onClick={(e) => {
                      let item = document.getElementById(
                        'year-' + monthYear.year,
                      );
                      item.scrollIntoView();
                    }}>
                    {monthYear.year}
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-arrow"
                    left
                    style={{
                      maxHeight: '500px',
                      height: 'auto',
                      overflow: 'auto',
                      overflowX: 'hidden',
                    }}>
                    {Array.from(
                      { length: 131 },
                      (_, index) => index + 1970,
                    ).map((value, index) => {
                      return (
                        <div className="" id={'year-' + value}>
                          <DropdownItem
                            onClick={(e) => {
                              setMonthYear({
                                ...monthYear,
                                year: value,
                              });
                              getAllDay();
                            }}>
                            <span
                              style={{
                                color:
                                  value === monthYear.year
                                    ? '#006fe6'
                                    : '#c1c1c1',
                              }}>
                              <b>{value}</b>
                            </span>
                          </DropdownItem>
                        </div>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <div className="col-2">
                <div
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    let newDate = new Date(
                      monthYear.year,
                      monthYear.month + 1,
                      1,
                    );
                    setMonthYear({
                      month: newDate.getMonth(),
                      year: newDate.getFullYear(),
                    });
                    getAllDay();
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16">
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              className="row d-flex justify-content-center"
              style={{ height: '100%' }}>
              <div className="col-10">
                <UncontrolledDropdown
                  disabled={false}
                  style={{ width: '100%', height: '100%' }}>
                  <DropdownToggle
                    style={{ width: '100%', height: '100%' }}
                    className="btn btn-outline-light"
                    role="button"
                    size="lg"
                    color=""
                    disabled={false}
                    onClick={(e) => {}}>
                    {isNull(selectDateTask) ? (
                      'Chọn ngày deadline'
                    ) : (
                      <>
                        {formatDate(new Date(selectDateTask)) + '  '}
                        <span className="text-danger">
                          ({data.statusDate[selectDateTask].unfinished}){' '}
                        </span>
                        <span className="text-success">
                          ({data.statusDate[selectDateTask].finished}){' '}
                        </span>
                      </>
                    )}
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-arrow"
                    left
                    style={{
                      maxHeight: '500px',
                      height: 'auto',
                      overflow: 'auto',
                      overflowX: 'hidden',
                    }}>
                    {Object.entries(data.arrDate).length === 0 ? (
                      <>
                        <span className="px-3 text-danger">
                          <b>Bạn chưa tham gia task nào!</b>
                        </span>
                      </>
                    ) : (
                      <>
                        {Object.entries(data.arrDate).map(
                          ([dateTime, arrTaskId], index) => {
                            return (
                              <DropdownItem
                                onClick={(e) => {
                                  let date = new Date(dateTime);
                                  setSelectDateTask(dateTime);
                                  setMonthYear({
                                    month: date.getMonth(),
                                    year: date.getFullYear(),
                                  });
                                }}>
                                <span style={{ color: '#c1c1c1' }}>
                                  <b>
                                    {formatDate(new Date(dateTime))}
                                    {'  '}
                                    <span className="text-danger">
                                      ({data.statusDate[dateTime].unfinished}){' '}
                                    </span>
                                    <span className="text-success">
                                      ({data.statusDate[dateTime].finished}){' '}
                                    </span>
                                  </b>
                                </span>
                              </DropdownItem>
                            );
                          },
                        )}
                      </>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 mb-5">
          <div className="col-12">
            <table className="tableCalendar">
              <thead>
                <th>
                  <div
                    className="btn btn-outline-dark"
                    style={{ width: '90%' }}>
                    Chủ nhật
                  </div>
                </th>
                <th>
                  <div
                    className="btn btn-outline-info"
                    style={{ width: '90%' }}>
                    Thứ hai
                  </div>
                </th>
                <th>
                  <div
                    className="btn btn-outline-info"
                    style={{ width: '90%' }}>
                    Thứ ba
                  </div>
                </th>
                <th>
                  <div
                    className="btn btn-outline-info"
                    style={{ width: '90%' }}>
                    Thứ tư
                  </div>
                </th>
                <th>
                  <div
                    className="btn btn-outline-info"
                    style={{ width: '90%' }}>
                    Thứ năm
                  </div>
                </th>
                <th>
                  <div
                    className="btn btn-outline-info"
                    style={{ width: '90%' }}>
                    Thứ sáu
                  </div>
                </th>
                <th>
                  <div
                    className="btn btn-outline-info"
                    style={{ width: '90%' }}>
                    Thứ bảy
                  </div>
                </th>
              </thead>
              <tbody>
                {[...getAllDay()].map((week, i) => {
                  return (
                    <tr>
                      {week.map((date, j) => {
                        if (date.month !== monthYear.month) {
                          // khác tháng
                          return (
                            <>
                              <td>
                                <button
                                  className="btn"
                                  style={{
                                    border: '1px solid #939393',
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: '#c9c9c9',
                                    color: 'white',
                                  }}>
                                  {date.date}/{date.month}
                                </button>
                              </td>
                            </>
                          );
                        } else if (
                          typeof data.arrDate[date.fullDate.toDateString()] ===
                          'undefined'
                        ) {
                          // không có task
                          return (
                            <>
                              <td>
                                <button
                                  className="btn"
                                  style={{
                                    border: '1px solid #939393',
                                    height: '100%',
                                    width: '100%',
                                    color: checkCurrentDay(date.fullDate)
                                      ? '#007bff'
                                      : '#6c757d',
                                  }}
                                  onClick={() => {
                                    choseDate(date);
                                  }}>
                                  {date.date}
                                </button>
                              </td>
                            </>
                          );
                        } else {
                          // có task
                          if (
                            data.statusDate[date.fullDate.toDateString()]
                              .unfinished === 0
                          ) {
                            // đã hoàn thành các task
                            return (
                              <>
                                <td>
                                  <button
                                    className="btn"
                                    style={{
                                      border: '2px solid #28a745',
                                      height: '100%',
                                      width: '100%',
                                      color: checkCurrentDay(date.fullDate)
                                        ? '#007bff'
                                        : '#6c757d',
                                    }}
                                    onClick={() => {
                                      choseDate(date);
                                    }}>
                                    {date.date}
                                  </button>
                                </td>
                              </>
                            );
                          } else if (
                            equalDate(new Date(date.fullDate), currentDate) >= 1
                          ) {
                            // chưa hoàn thành các task và còn deadline
                            return (
                              <>
                                <td>
                                  <button
                                    className="btn"
                                    style={{
                                      border: '2px solid #ffc107',
                                      height: '100%',
                                      width: '100%',
                                      color: checkCurrentDay(date.fullDate)
                                        ? '#007bff'
                                        : '#6c757d',
                                    }}
                                    onClick={() => {
                                      choseDate(date);
                                    }}>
                                    {date.date}
                                  </button>
                                </td>
                              </>
                            );
                          } else {
                            // chưa hoàn thành các task và hết deadline
                            return (
                              <>
                                <td>
                                  <button
                                    className="btn"
                                    style={{
                                      border: '2px solid #e22e2f',
                                      height: '100%',
                                      width: '100%',
                                      color: checkCurrentDay(date.fullDate)
                                        ? '#007bff'
                                        : '#6c757d',
                                    }}
                                    onClick={() => {
                                      choseDate(date);
                                    }}>
                                    {date.date}
                                  </button>
                                </td>
                              </>
                            );
                          }
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyCalendar;
