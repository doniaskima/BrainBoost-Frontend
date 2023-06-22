import { randomcolor } from 'randomcolor';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import {
  Card,
  CardFooter,
  Container,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from 'reactstrap';

import ChartPie from './ChartPie';
import { Section , Task } from '../Tasks/InterfaceTask';
import WrapperProject from '../Tasks/WrapperProject';

export interface TaskUser {
  avatar: string;
  role: string;
  tasks: Array<Task>;
  _id: string;
  email: string;
  username: string;
}

const ProjectAnalysis: React.FC = () => {
  const { projectId } = useParams();
  const budgetOneDay = 16;
  const [dataAnlysis, setDataAnlysis] = useState<{
    userAdmin: Array<string>;
    sections: Array<Section>;
    users: Array<{
      avatar: string;
      role: string;
      _id: string;
      email: string;
      username: string;
    }>;
    _id: string;
    name: string;
  }>(null);
  const [headerAnalysis, setHeaderAnalysis] = useState<{
    file: number;
    budget: number;
    task: {
      total: number;
      completed: number;
      overDeadline: number;
    };
  }>();
  const [page, setPage] = useState(1);
  const memberOnePage = 5;
  const [allUsers, setAllUser] = useState<Array<TaskUser>>([]);
  const [showModal, setShowModal] = useState(false);
  const [userCurrent, setUserCurrent] = useState<TaskUser>(null);
  useEffect(() => {
    // projectService.analysis({ projectId: projectId }).then((res) => {
    //   // eslint-disable-next-line array-callback-return
    //   setDataAnlysis(res.data.data);
    //   setPage(1);
    // });
    // projectService
    //   .getAllTasks(projectId)
    //   .then((res) => {
    //     setAllUser(res.data.data);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response?.data?.error || 'Lỗi lấy dữ liệu');
    //   });
  }, [projectId]);
//   useEffect(() => {
//     let total = {
//       file: 0,
//       budget: 0,
//       task: {
//         total: 0,
//         completed: 0,
//         overDeadline: 0,
//       },
//     };
//     dataAnlysis?.sections?.forEach((section) => {
//       total.task.total += section.tasks.length;
//       section.tasks.forEach((task) => {
//         total.file += task.files.length;
//         total.task.completed += task.isDone ? 1 : 0;
//         total.task.overDeadline +=
//           new Date() > new Date(task.dueDate.to) && !task.isDone ? 1 : 0;
//         total.budget +=
//           budgetOneDay *
//           (Math.floor(
//             (new Date(task.dueDate.to).getTime() -
//               new Date(task.dueDate.from).getTime()) /
//               (1000 * 60 * 60 * 24),
//           ) +
//             1) *
//           task.assignment.length;
//       });
//     });
//     setHeaderAnalysis(total);
//   }, [dataAnlysis]);
  const getChartDataBar_NumberTask = () => {
    let chartDataBar = {
      labels: [],
      datasets: [
        {
          label: 'Number tasks',
          backgroundColor: [],
          borderWidth: 1,
          hoverBackgroundColor: [],
          data: [],
        },
      ],
      title: '',
      width: 640,
      height: 242,
    };
    dataAnlysis?.sections?.forEach((section, i) => {
      chartDataBar.labels.push(section.name);
      chartDataBar.datasets[0].backgroundColor.push(randomColor());
      chartDataBar.datasets[0].hoverBackgroundColor.push(randomColor());
      chartDataBar.datasets[0].data.push(section.tasks.length);
    });
    chartDataBar.datasets[0].data.push(0);
    chartDataBar.datasets[0].data.push(1);
    return chartDataBar;
  };

  const percentComplete = () => {
    let arr = [];
    let maxLen = allUsers.length;
    let len = page * memberOnePage > maxLen ? maxLen : page * memberOnePage;
    for (let i = (page - 1) * memberOnePage; i < len; i++) {
      let user = allUsers[i];
      let totalTask = user.tasks.length;
      let totalComplete = 0;
      user.tasks.forEach((task, i) => {
        if (task.isDone) {
          totalComplete++;
        }
      });
      arr.push({
        user: user,
        username: user.username,
        email: user.email,
        percent:
          totalTask === 0
            ? NaN
            : Math.floor((totalComplete / totalTask) * 100 + 0.05),
      });
    }
    for (let i = len; i < page * memberOnePage; i++) {
      arr.push(NaN);
    }
    return arr;
  };
  const chartDataBar = () => {
    let dataBar: Array<{
      userId: Array<string>;
      userName: Array<string>;
      data: Array<number>;
      color: Array<string>;
      nameSection: string;
    }> = [];
    dataAnlysis?.sections?.forEach((section, index) => {
      dataBar[index] = {
        nameSection: section.name,
        userId: [],
        userName: [],
        data: [],
        color: [],
      };
      section.tasks.forEach((task, i) => {
        task.assignment.forEach((assignment) => {
          if (dataBar[index].userId.includes(assignment._id)) {
            dataBar[index].data[
              dataBar[index].userId.indexOf(assignment._id)
            ]++;
          } else {
            dataBar[index].userId.push(assignment._id);
            dataBar[index].userName.push(assignment.username);
            dataBar[index].data.push(1);
            dataBar[index].color.push(randomColor());
          }
        });
      });
    });
    return dataBar;
  };

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
  return (
    <div className="project-anlysis">
      <WrapperProject>
          <div className="d-flex flex-row justify-content-start">
            <div className="my-navbar">
              <div className="row mt-0">
                <div className="col-xl-3 col-md-6">
                  <div className="card border-left-primary shadow h-80 py-2 d-flex justify-content-center p-3">
                    <div className="card-body-task">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Files Upload
                          </div>
                          <div className="h4 mb-0 font-weight-bold text-gray-800">
                            {headerAnalysis?.file}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-file fa-2x text-gray-300 ml-5 icon-task"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card border-left-info shadow h-80 py-2 d-flex justify-content-center p-3">
                    <div className="card-body-task">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Completed / Total tasks
                          </div>
                          <div className="h4 mb-0 font-weight-bold text-gray-800">
                            {headerAnalysis?.task?.completed} /{' '}
                            {headerAnalysis?.task?.total}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-list fa-2x text-gray-300 ml-5 icon-task"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card border-left-warning shadow h-80 py-2 d-flex justify-content-center p-3">
                    <div className="card-body-task">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Over The Deadline
                          </div>
                          <div className="h4 mb-0 font-weight-bold text-gray-800">
                            {headerAnalysis?.task?.overDeadline}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-calendar fa-2x text-gray-300 ml-5 icon-task"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h5 className="m-0 font-weight-bold text-primary">
                        Total Tasks Manager
                      </h5>
                    </div>
                    <div className="card-body-task-chart">
                      <div className="chart-area">
                        <ChartPie
                          name="horizontalbar"
                          chartDataBar={{ ...getChartDataBar_NumberTask() }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-5">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h5 className="m-0 font-weight-bold text-primary">
                        Total Tasks Manager
                      </h5>
                      <div className="dropdown no-arrow">
                        <a
                          className="dropdown-toggle"
                          href="/"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">
                          <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                          aria-labelledby="dropdownMenuLink">
                          <div className="dropdown-header">
                            Dropdown Header:
                          </div>
                          <a className="dropdown-item" href="/">
                            Action
                          </a>
                          <a className="dropdown-item" href="/">
                            Another action
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/">
                            Something else here
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* <div className="card-body">
                      <div className="chart-pie pt-4 pb-2">
                        <ChartPie
                          name="pie"
                          chartDataPie={{
                            data: {
                              datasets: [
                                {
                                  label: 'Population',
                                  data: [
                                    headerAnalysis?.task?.completed,
                                    headerAnalysis?.task?.total -
                                      headerAnalysis?.task?.completed -
                                      headerAnalysis?.task?.overDeadline,
                                    headerAnalysis?.task?.overDeadline,
                                  ],
                                  backgroundColor: [
                                    '#28A745',
                                    '#ebb000',
                                    '#d46868',
                                  ],
                                  hoverBackgroundColor: [
                                    '#08B530',
                                    '#FFC107',
                                    '#d40000',
                                  ],
                                },
                              ],
                              labels: [
                                'Đã hoàn thành',
                                'Chưa hoàn thành',
                                'Quá hạn',
                              ],
                            },
                          }}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="row">
                <Container className="mt-4" fluid>
                  <Row>
                    <div className="col">
                      <Card className="shadow">
                        <Table
                          className="align-items-center table-flush"
                          responsive
                          style={{ textAlign: 'center' }}>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Username</th>
                              <th scope="col">Email</th>
                              <th scope="col">Completion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {percentComplete().map((value, i) => {
                              if (typeof value.username === 'undefined') {
                                return (
                                  <tr style={{ height: '81px' }}>
                                    <th></th>
                                    <td></td>
                                  </tr>
                                );
                              }
                              return (
                                <>
                                  <tr>
                                    <th scope="row">
                                      <Media
                                        className="align-items-center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                          setUserCurrent(value.user);
                                          setShowModal(true);
                                        }}>
                                        <div className="avatar mr-3">
                                          <img
                                            height="50"
                                            alt="..."
                                            src="/image/avatar.png"
                                          />
                                        </div>
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            {value.username}
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>
                                    <td>{value.email}</td>
                                    <td style={{ width: '100%' }}>
                                      <div className="d-flex align-items-center">
                                        <span
                                          style={{
                                            width: '10%',
                                            fontWeight: 'bold',
                                            color: getProgressColor(
                                              value.percent,
                                            ),
                                          }}>
                                          {isNaN(value.percent)
                                            ? 'No Task'
                                            : value.percent + ' %'}
                                        </span>
                                        <div style={{ width: '90%' }}>
                                          {isNaN(value.percent) ? (
                                            <></>
                                          ) : (
                                            <>
                                              <div
                                                className="progress progress-bar-striped"
                                                style={{
                                                  height: '20px',
                                                  width: '100%',
                                                }}>
                                                <div
                                                  className="progress-bar"
                                                  role="progressbar"
                                                  style={{
                                                    width: value.percent + '%',
                                                    height: '20px',
                                                    backgroundColor: getProgressColor(
                                                      value.percent,
                                                    ),
                                                  }}></div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })} */}
                          </tbody>
                        </Table>
                        <CardFooter className="py-4">
                          <nav aria-label="...">
                            <Pagination
                              className="pagination justify-content-end mb-0"
                              listClassName="justify-content-end mb-0">
                              <PaginationItem>
                                <PaginationLink
                                  onClick={(e) => {
                                    if (page === 1) {
                                      return;
                                    }
                                    setPage(page - 1);
                                  }}>
                                  <i className="fas fa-angle-left" />
                                  <span className="sr-only">Previous</span>
                                </PaginationLink>
                              </PaginationItem>
                              {Array.from(
                                {
                                  length: Math.ceil(
                                    allUsers.length / memberOnePage,
                                  ),
                                },
                                (_, index) => index + 1,
                              ).map((value, index) => {
                                return (
                                  <>
                                    <PaginationItem className="active">
                                      <PaginationLink
                                        onClick={(e) => {
                                          setPage(index + 1);
                                        }}>
                                        {index + 1}
                                      </PaginationLink>
                                    </PaginationItem>
                                  </>
                                );
                              })}
                              <PaginationItem>
                                <PaginationLink
                                  onClick={(e) => {
                                    if (
                                      page ===
                                      Math.ceil(allUsers.length / memberOnePage)
                                    ) {
                                      return;
                                    }
                                    setPage(page + 1);
                                  }}>
                                  <i className="fas fa-angle-right" />
                                  <span className="sr-only">Next</span>
                                </PaginationLink>
                              </PaginationItem>
                            </Pagination>
                          </nav>
                        </CardFooter>
                      </Card>
                    </div>
                  </Row>
                </Container>
              </div>
              <div className="row">
                {chartDataBar().map((section, index) => (
                  <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h5 className="m-0 font-weight-bold text-primary">
                          Total tasks <b>{section.nameSection}</b> of each
                          member
                        </h5>
                      </div>
                      <div className="card-body-task-chart">
                        <div className="chart-area">
                          <ChartPie
                            name="bar"
                            chartDataBar={{
                              labels: [...section.userName],
                              datasets: [
                                {
                                  label: 'Number tasks',
                                  backgroundColor: [...section.color],
                                  data: [...section.data],
                                },
                              ],
                              title: '',
                              width: 640,
                              height: 300,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </WrapperProject>
      {/* <ModalDetailTask
        show={showModal}
        funcQuit={() => setShowModal(false)}
        funcOnHide={() => setShowModal(false)}
        dataUser={userCurrent}></ModalDetailTask> */}
    </div>
  );
};
export default ProjectAnalysis;
