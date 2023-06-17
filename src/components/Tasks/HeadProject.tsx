/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import { Assignment } from './InterfaceTask';
import ChooseList from './ChooseList';

const HeadProject: React.FC<any> = (props) => {
  //props: projectId
  const [user, setUser] = useState<Assignment>(null);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [projectInfo, setProjectInfo] = useState({
    admin: [],
    userJoin: [],
    avatar: '',
    description: '',
    _id: '',
    name: '',
    userId: '',
    createdAt: '',
    updatedAt: '',
  });
 
  return (
    <div className="head-project container-fluid w-100">
      <div className="head-project-wrapper u-clearfix pb-2">
        <Row className="d-flex align-items-center">            
                <ChooseList projectId={props.projectId} />
        </Row>
      </div>
    </div>
  );
};
export default HeadProject;
