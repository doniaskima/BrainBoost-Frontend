import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import ModalInvite from '../../modals/ModalInvite';
import ModalTrueFalse from '../../modals/ModalTrueFalse';

enum Role {
  Admin = 'Admin',
  Member = 'Member',
  MemberPlus = 'MemberPlus',
  MemberPro = 'MemberPro',
}

const MemberProject: React.FC = () => {
  const navigate = useNavigate();
  const projectId = useParams();
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
    getData();
  }, [page, projectId]);

  const getData = () => {
    // Fetch data here
  };

  const setAdmin = async (memberId) => {
    // Set member as admin logic
  };

  const deleteMember = async (memberId) => {
    // Delete member logic
  };

  return (
    <>
      <Container fluid>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Project members</h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUser.map((user) => (
                <tr key={user._id}>
                  <th scope="row">
                    <Media className="align-items-center">
                      <a
                        className="avatar rounded-circle mr-3"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img alt={user.username} src={user.avatar} />
                      </a>
                      <Media>
                        <span className="mb-0 text-sm">{user.username}</span>
                      </Media>
                    </Media>
                  </th>
                  <td>{user.email}</td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="text-right">
                    {user._id === userId ? (
                      <Button
                        className="btn-icon btn-2"
                        color="danger"
                        type="button"
                        onClick={() => {
                          setShowModal(true);
                          setDataModal({
                            id: user._id,
                            title: 'Delete member',
                            type: 'deleteMember',
                          });
                        }}
                      >
                        <span className="btn-inner--icon">
                          <i className="ni ni-fat-remove" />
                        </span>
                        <span className="btn-inner--text">Delete</span>
                      </Button>
                    ) : (
                      <>
                        {userIdAdmin.includes(userId) && user.role !== Role.Admin ? (
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem onClick={() => setAdmin(user._id)}>
                                Set as Admin
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setShowModal(true);
                                  setDataModal({
                                    id: user._id,
                                    title: 'Delete member',
                                    type: 'deleteMember',
                                  });
                                }}
                              >
                                Delete Member
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        ) : null}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <nav aria-label="...">
              <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
              >
                <PaginationItem className={page === 1 ? 'disabled' : ''}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page - 1);
                    }}
                    tabIndex="-1"
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="active">
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </CardFooter>
        </Card>
      </Container>
      {/* <ModalInvite
        isOpen={isShowInvite}
        toggle={() => setShowInvite(!isShowInvite)}
        projectId={projectId}
      />
      <ModalTrueFalse
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        dataModal={dataModal}
        projectId={projectId}
      /> */}
    </>
  );
};

export default MemberProject;
