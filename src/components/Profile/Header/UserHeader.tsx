import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import profileCoverImage from "../../../assets/profile/backgroun.jpg";

const UserHeader = (): JSX.Element => {
  const backgroundImageStyle = {
    minHeight: "600px",
    backgroundImage: `url(${profileCoverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };

  return (
    <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={backgroundImageStyle}>
         <span className="mask bg-gradient-default opacity-8" />
         <Container  className="d-flex align-items-center" fluid>
             <Row>
              <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello Donia</h1>
              <p className="text-white mt-0 mb-5">
              This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Button
               className="p-2 bg-info rounded-sm hover:cyan"
               href="#"
               onClick={(e) => e.preventDefault()}
              >
                Edit Profile
              </Button>
              </Col>
             </Row>
         </Container>
    </div>
  );
};

export default UserHeader;
