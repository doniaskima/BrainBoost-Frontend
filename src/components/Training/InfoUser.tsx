import React from 'react';
import { CardBody, Col, Form, FormGroup, Input, Row } from 'reactstrap';
interface DataUser {
  role: string;
  username: string;
  avatar: string;
  language: string;
  email: string;
  birthday: string;
}
interface Props {
  dataUser: DataUser;
  buttonEdit: any;
  getFieldUpdate: (e) => void;
}
const InfoUser: React.FC<Props> = ({
  dataUser,
  buttonEdit,
  getFieldUpdate,
}) => {
  return (
    <CardBody>
      <Form className="pr-4">
        <h6 className="heading-small text-muted mb-4 ml-3">User information</h6>
        <div className="pl-lg-4">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  Username
                </label>
                <Input
                  className="form-control-alternative"
                  defaultValue={dataUser?.username}
                  id="input-username"
                  type="text"
                  disabled={buttonEdit.status}
                  name="Username"
                  onChange={(e) => getFieldUpdate(e)}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-email">
                  Email address
                </label>
                <Input
                  className="form-control-alternative"
                  name="Email"
                  id="input-email"
                  defaultValue={dataUser?.email}
                  type="email"
                  disabled={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-address">
                  Address
                </label>
                <Input
                  className="form-control-alternative"
                  name="Address"
                  value="144 Xuân Thủy, Cầu Giấy, Hà Nội"
                  id="input-address"
                  type="text"
                  disabled={buttonEdit.status}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>

        <hr className="my-4" />
        {/* Birthday */}
        <h6 className="heading-small text-muted mb-4 ml-3">Birthday</h6>
        <div className="pl-lg-4">
          <Row>
            <Col md="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-birthday">
                  Date
                </label>
                <Input
                  className="form-control-alternative"
                  // defaultValue={dataUser.birthday}
                  id="input-birthday"
                  type="date"
                  disabled={buttonEdit.status}
                  onChange={(e) => getFieldUpdate(e)}
                  name="Birthday"
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        <hr className="my-4" />
        {/* Address */}
        <h6 className="heading-small text-muted mb-4 ml-3">Language</h6>
        <div className="pl-lg-4">
          <Row>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-country">
                  Language
                </label>

                <select
                  className="browser-default custom-select"
                  name="Language"
                  disabled={buttonEdit.status}
                  onChange={(e) => getFieldUpdate(e)}>
                  {(() => {
                    if (dataUser?.language === 'vi') {
                      return (
                        <>
                          <option value="vi" selected>
                            Vietnamese
                          </option>
                          <option value="en">English</option>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <option value="vi">Vietnamese</option>
                          <option value="en" selected>
                            English
                          </option>
                        </>
                      );
                    }
                  })()}
                </select>
              </FormGroup>
            </Col>
          </Row>
        </div>

        <hr className="my-4" />
        {/* Description */}
        <h6 className="heading-small text-muted mb-4 ml-3">About me</h6>
        <div className="pl-lg-4">
          <FormGroup>
            <label>About Me</label>
            <Input
              className="form-control-alternative"
              name="About"
              placeholder="A few words about you ..."
              rows="4"
              type="textarea"
              disabled={buttonEdit.status}
            />
          </FormGroup>
        </div>
      </Form>
    </CardBody>
  );
};

export default InfoUser;
