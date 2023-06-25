/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
} from 'reactstrap';
import ModalInvite from '../../../modals/ModalInvite';
import { projectService } from '../../../services/projects/api';
import { userService } from '../../../services/user/api';
import socket from '../../../socketioClient';
import ModalTrueFalse from '../../ModalTrueFalse';
import WrapperProject from "../../../pages/WrapperProject"
import { useNavigate, useParams } from 'react-router-dom';

enum Role {
  Admin = 'Admin',
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}

const MemberProject: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isShowInvite, setShowInvite] = useState(false);
  const [listUser, setListUser] = useState<
    Array<{
      _id: string;
      username: string;
      email: string;
      role: Role;
      avatar: string;
    }>
  >([]);
  const [listOnline, setListOnline] = useState([]);
  const [userId, setUserId] = useState();
  const [userIdAdmin, setUserIdAdmin] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    id: '',
    title: '',
    type: '',
  });
  const [page, setPage] = useState(1);
  const memberOnePage = 5;
  useEffect(() => {
    socket.emit('loadOnline');
    socket.on('reloadUserOnline', (data) => {
      setListOnline(data);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [page, projectId]);
  const getData = () => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error(' Unable to authenticate the user!');
      });
    projectService
      .getUsers(projectId)
      .then((res) => {
        setListUser(res.data.data.users);
        let _userAdmin = [];
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId._id);
        });
        setUserIdAdmin(_userAdmin);
      })
      .catch((err) => {
        toast.error(' A unexpected error occurred.');
      });
  };
  const setAdmin = async (memberId) => {
    projectService
      .setAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success(' Successfully added admin privileges.');
        setListUser(res.data.data.users);
        setUserIdAdmin([]);
        let _userAdmin = [];
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId);
        });
        setUserIdAdmin([..._userAdmin]);
      })
      .catch((err) => {
        toast.error(err.response.data.err || ' An unexpected error occurred');
      });
  };
  const dropAdmin = async (memberId) => {
    projectService
      .dropAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success(' Successfully removed admin privileges.');
        setListUser(res.data.data.users);
        setUserIdAdmin([]);
        let _userAdmin = [];
        console.log(res.data.data);
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId);
        });
        setUserIdAdmin([..._userAdmin]);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error || ' An unexpected error occurred.',
        );
      });
  };
  const deleteMember = async (memberId) => {
    projectService
      .deleteMember({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success(' Member removal successful!');
        setListUser(res.data.data.users);
        setUserIdAdmin([]);
        let _userAdmin = [];
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId);
        });
        setUserIdAdmin([..._userAdmin]);
      })
      .catch((err) => {
        toast.error(err.request.response.error);
      });
  };
  const getListPage = (): Array<{
    _id: string;
    username: string;
    email: string;
    role: Role;
    avatar: string;
  }> => {
    let maxLen = listUser.length;
    let maxPage = Math.ceil(maxLen / memberOnePage);
    if (page < 1 || page > maxPage) {
      return [];
    }
    let len = page * memberOnePage > maxLen ? maxLen : page * memberOnePage;
    let list = [];
    for (let i = (page - 1) * memberOnePage; i < len; i++) {
      list.push(listUser[i]);
    }
    for (let i = len; i < page * memberOnePage; i++) {
      list.push(NaN);
    }
    return list;
  };
  function RowUser({ user, status }) {
    if (typeof user.username === 'undefined') {
      return (
        <tr style={{ height: '81px' }}>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return (
      <tr>
        <th scope="row">
          <Media
            className="align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {}}>
            <div className="avatar mr-3">
              <img
                height="50"
                alt="..."
                onClick={() => {
                  navigate('/admin/user-profile/' + user._id);
                }}
                src={user.avatar === '' ? '/image/avatar.png' : user.avatar}
              />
            </div>
            <Media>
              <span className="mb-0 text-sm">{user.username}</span>
            </Media>
          </Media>
        </th>
        <td>{user.email}</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className={status ? 'bg-success' : 'bg-warning'} />
            {status ? 'Online' : 'Offline'}
          </Badge>
        </td>
        <td>
          <span className="text-success">
            {userIdAdmin.includes(user._id) ? 'Admin' : ''}
          </span>
        </td>
        <td className="text-right">
          <UncontrolledDropdown
            disabled={userIdAdmin.indexOf(userId) !== -1 ? false : true}>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              disabled={userIdAdmin.indexOf(userId) !== -1 ? false : true}
              onClick={(e) => e.preventDefault()}>
              <i
                className={
                  userIdAdmin.indexOf(userId) !== -1
                    ? 'fas fa-ellipsis-v text-success'
                    : 'fas fa-ellipsis-v'
                }
              />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem
                onClick={(e) => {
                  setShowModal(true);
                  setDataModal({
                    id: user._id,
                    type: 'setAdmin',
                    title: ' Would you like to grant Admin privileges to? ' + user.username,
                  });
                }}>
                <span className="text-primary">
                  <b>Set Admin</b>
                </span>
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  setShowModal(true);
                  setDataModal({
                    id: user._id,
                    type: 'dropAdmin',
                    title: ' Would you like to remove Admin privileges from? ' + user.username,
                  });
                }}>
                <span className="text-primary">
                  <b>Drop Admin</b>
                </span>
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  setShowModal(true);
                  setDataModal({
                    id: user._id,
                    type: 'deleteMember',
                    title: ' Do you want to remove? ' + user.username + '  from the project?',
                  });
                }}>
                <span className="text-danger">
                  <b>Delete member</b>
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
    );
  }
  return (
    <div className="member-project" style={{ overflowY: 'hidden' }}>
      <WrapperProject>
        <Container fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
                  <h3 className="mb-0">Member</h3>
                  <Button color="primary" onClick={() => setShowInvite(true)}>
                    <i className="fa fa-user-plus mr-1 " aria-hidden="true"></i>
                    <span> Invite member</span>
                  </Button>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Gmail</th>
                      <th scope="col">Status</th>
                      <th scope="col">Admin</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {userIdAdmin &&
                      userIdAdmin.length > 0 &&
                      getListPage().map((value, i) => {
                        return (
                          <RowUser
                            user={{ ...value }}
                            status={
                              listOnline.indexOf(value._id) !== -1
                                ? true
                                : false
                            }></RowUser>
                        );
                      })}
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
                          length: Math.ceil(listUser.length / memberOnePage),
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
                              Math.ceil(listUser.length / memberOnePage)
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
      </WrapperProject>
      <ModalTrueFalse
        show={showModal}
        data={{
          title: dataModal.title,
          button_1: {
            title: 'No',
            backgroundColor: 'rgb(242,242,242)',
            color: 'black',
          },
          button_2: {
            title: 'Yes',
            backgroundColor: 'rgb(226,27,60)',
            color: 'white',
          },
        }}
        setClose={() => {
          setShowModal(false);
        }}
        funcButton_1={() => {}}
        funcButton_2={() => {
          if (dataModal.type === 'setAdmin') {
            setAdmin(dataModal.id);
          } else if (dataModal.type === 'dropAdmin') {
            dropAdmin(dataModal.id);
          } else if (dataModal.type === 'deleteMember') {
            deleteMember(dataModal.id);
          }
        }}
        onlyTitle={true}
        funcOnHide={() => {}}></ModalTrueFalse>
      <ModalInvite
        state={isShowInvite}
        setState={setShowInvite}
        projectId={projectId}
      />
    </div>
  );
};

export default MemberProject;
