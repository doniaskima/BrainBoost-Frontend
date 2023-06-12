import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
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

export default function MemberProjectComponent() {
    const navigate = useNavigate();
    const  params   = useParams();
    const [listUser, setListUser] = useState<
  Array<{
    _id: string;
    username: string;
    email: string;
    role: Role;
    avatar: string;
  }>
>([]);
const [isShowInvite, setShowInvite] = useState(false);
  return (
 
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
 
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0">
                      <PaginationItem>
                        <PaginationLink>
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                     
                      <PaginationItem>
                        <PaginationLink
                          >
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
  
  )
}
