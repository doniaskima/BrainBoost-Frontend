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
  const { projectId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [showInvite, setShowInvite] = useState(false); // Renamed variable
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

  const handleShowInvite = (value) => { // Renamed function
    setIsModalOpen(value);
    setShowInvite(value);
  };

  return (
    <>
      <Container fluid>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Project members</h3>
          </CardHeader>
          <CardHeader className="border-0 d-flex flex-row align-content-center justify-content-between">
            <h3 className="mb-0">Member</h3>
            <Button color="primary" onClick={() => handleShowInvite(true)}> {/* Updated function */}
              <i className="fa fa-user-plus mr-1" aria-hidden="true"></i>
              <span> Invite member</span>
            </Button>
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
                        <img alt="..." src={user.avatar} />
                      </a>
                      <Media>
                        <span className="mb-0 text-sm">
                          {user.username}
                        </span>
                      </Media>
                    </Media>
                  </th>
                  <td>{user.email}</td>
                  <td>
                    <Badge color="" className="badge-dot mr-4">
                      <i className="bg-warning" />
                      {user.role}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="btn-icon-only text-light"
                        role="button"
                        size="sm"
                        color=""
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-ellipsis-v" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                          onClick={() => setAdmin(user._id)}
                        >
                          Set as Admin
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => deleteMember(user._id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
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
                <PaginationItem
                  className={page === 1 ? 'disabled' : ''}
                >
                  <PaginationLink
                    onClick={() => setPage(page - 1)}
                    tabIndex={-1}
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setPage(page + 1)}
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
    </>
  );
};

export default MemberProject;
