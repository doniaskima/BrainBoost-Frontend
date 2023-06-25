import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CiCircleMore } from 'react-icons/ci';
import { FiUsers } from 'react-icons/fi';
import { ConfigProvider } from 'antd';
import { enUSIntl } from '@ant-design/pro-table';
import { IntlProvider } from 'react-intl';
import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/utils';
import { Avatar, BreadcrumbProps, Modal, Space } from 'antd';
import axios from 'axios';
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

import ModalTrueFalse from '../../modals/ModalTrueFalse';
import ChooseList from './ChooseList';
import BasePageContainer from './BasePageContainer';
import { Link } from 'react-router-dom';
import Loader from '../loader/index'; 
import socket from '../../socketioClient';
import { projectService } from '../../services/projects/api';
import { userService } from '../../services/user/api';
import ModalInvite from '../../modals/ModalInvite';

enum Role {
  Admin = 'Admin',
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}

const MemberProject: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const tableLocale = enUSIntl;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [listUser, setListUser] = useState<
    Array<{
      _id: string;
      name: string;
      email: string;
      role: Role;
      avatar: string;
    }>
  >([]);
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
        toast.error('Failed to authenticate user!!');
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
        toast.error('An unexpected error occurred');
      });
  };
  const setAdmin = async (memberId) => {
    projectService
      .setAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Successfully added admin privileges');
        setListUser(res.data.data.users);
        setUserIdAdmin([]);
        let _userAdmin = [];
        res.data.data.userAdmin.forEach((userAdminId) => {
          _userAdmin.push(userAdminId);
        });
        setUserIdAdmin([..._userAdmin]);
      })
      .catch((err) => {
        toast.error(err.response.data.err || 'An unexpected error occurred');
      });
  };
  const dropAdmin = async (memberId) => {
    projectService
      .dropAdmin({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Successfully removed admin privileges.');
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
          err.response?.data?.error || 'An unexpected error occurred.',
        );
      });
  };
  const deleteMember = async (memberId) => {
    projectService
      .deleteMember({ projectId: projectId, memberId: memberId })
      .then((res) => {
        toast.success('Successfully deleted member!');
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
  const locale = {
    emptyText: 'No Data',
    searchPlaceholder: 'Search',
    resetText: 'Reset',
    columnSetting: 'Column Settings', 
  };

  const handleShowInvite = (value) => {
    setIsModalOpen(value);
    setShowInvite(value);
  };

  const breadcrumb: BreadcrumbProps = {
    items: [
      {
        key: 'projects',
        title: <Link to="/tasks">projects</Link>,
      },
    ],
  };

  return (
    <div className="member-project" style={{ overflowY: 'hidden' }}>
      <Container fluid>
        <Row className="d-flex align-items-center">
          <ChooseList projectId={projectId} />
        </Row>
        <BasePageContainer breadcrumb={breadcrumb}>
          <ConfigProvider locale={enUSIntl}>
            <IntlProvider locale="en">
              {listUser.length === 0 ? ( // Use Loader component when listUser is empty
                <Loader />
              ) : (
                listUser.map((user) => (
                  <div key={user.id}>
                    <ProTable
                      cardBordered={false}
                      locale={tableLocale}
                      cardProps={{
                        subTitle: 'Users',
                        tooltip: {
                          className: 'opacity-60',
                          title: 'Users',
                        },
                        title: <FiUsers className="opacity-60" />,
                      }}
                      search={false}
                      bordered={true}
                      rowKey="id"
                      scroll={{ x: true }}
                      tableLayout={'fixed'}
                      rowSelection={false}
                      pagination={{
                        showQuickJumper: true,
                        pageSize: 10,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        locale: {
                          items_per_page: 'items per page',
                          jump_to: 'Go to',
                          jump_to_confirm: 'Confirm',
                          page: '',
                          prev_page: 'Previous Page',
                          next_page: 'Next Page',
                          prev_5: 'Previous 5 Pages',
                          next_5: 'Next 5 Pages',
                          prev_3: 'Previous 3 Pages',
                          next_3: 'Next 3 Pages',
                        },
                      }}
                      columns={[
                        {
                          title: 'Username',
                          dataIndex: 'name',
                          ellipsis: true,
                          key: 'name',
                          search: false, // Disable search for this column
                        },
                        {
                          title: 'Email',
                          ellipsis: true,
                          dataIndex: 'email',
                          key: 'email',
                          search: false, // Disable search for this column
                        },
                        {
                          title: 'Avatar',
                          dataIndex: 'avatar',
                          key: 'avatar',
                          search: false, // Disable search for this column
                          render: (_, record) => (
                            <Avatar
                              src={record.avatar}
                              alt={record.name}
                              size={32}
                              className="mr-2"
                            />
                          ),
                        },
                        {
                          title: 'Role',
                          dataIndex: 'role',
                          key: 'role',
                          search: false, // Disable search for this column
                          render: (_, record) => {
                            const isAdmin = userIdAdmin.includes(record._id);
                            const role = isAdmin ? (
                              <Badge color="success">{Role.Admin}</Badge>
                            ) : (
                              <Badge color="primary">{record.role}</Badge>
                            );
                            return <div>{role}</div>;
                          },
                        },
                        {
                          title: 'Set Admin',
                          dataIndex: 'setAdmin',
                          key: 'setAdmin',
                          search: false, // Disable search for this column
                          render: (_, record) => {
                            const isAdmin = userIdAdmin.includes(record._id);
                            return (
                              <div>
                                
                                {!isAdmin && (
                                  <Button
                                    color="primary"
                                    onClick={() => setAdmin(record._id)}
                                  >
                                    Set as Admin
                                  </Button>
                                )}
                              </div>
                            );
                          },
                        },
                        {
                          title: 'Action',
                          valueType: 'option',
                          dataIndex: 'id',
                          key: 'id',
                          width: 200,
                          search: false, // Disable search for this column
                          render: (_, record) => {
                            const isAdmin = userIdAdmin.includes(record._id);
                            return (
                              <div>
                                <TableDropdown
                                  onSelect={async (key) => {
                                    if (key === 'admin') {
                                      await setAdmin(record._id);
                                    } else if (key === 'delete') {
                                      await deleteMember(record._id);
                                    }
                                  }}
                                  menus={[
                                    {
                                      key: 'admin',
                                      name: isAdmin ? 'Remove Admin' : 'Make Admin',
                                      icon: <CiCircleMore />,
                                      disabled: record._id === userId,
                                    },
                                    {
                                      key: 'delete',
                                      name: 'Delete',
                                      icon: <CiCircleMore />,
                                      disabled: record._id === userId,
                                    },
                                  ]}
                                />
                              </div>
                            );
                          },
                        },
                      ]}
                      toolBarRender={() => [
                        <Button
                          key="invite"
                          type="primary"
                          onClick={() => handleShowInvite(true)}
                        >
                          Invite
                        </Button>,
                      ]}
                      request={async (
                        params: ProColumns['params'] & {
                          pageSize?: number;
                          current?: number;
                          keyword?: string;
                        },
                        sort,
                        filter,
                      ): Promise<RequestData<Partial<any>>> => {
                        return new Promise((resolve, reject) => {
                          setTimeout(() => {
                            resolve({
                              data: listUser,
                              success: true,
                              total: listUser.length,
                            });
                          }, 200);
                        });
                      }}
                    />
                  </div>
                ))
              )}
            </IntlProvider>
          </ConfigProvider>
        </BasePageContainer>
      </Container>
      {showInvite && (
        <ModalInvite
          isOpen={isModalOpen}
          toggle={() => handleShowInvite(false)}
          state={modalState}
          setState={setModalState}
          projectId={projectId}
        />
      )}
      {showModal && (
        <ModalTrueFalse
          isOpen={showModal}
          toggle={() => setShowModal(!showModal)}
          data={dataModal}
          action={() => deleteMember(dataModal.id)}
        />
      )}
    </div>
  );
};

export default MemberProject;