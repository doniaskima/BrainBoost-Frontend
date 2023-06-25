import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ModalDeleteOut from './ModalDeleteOut';
import { useParams } from 'react-router-dom';
import WrapperProject from '../Tasks/WrapperProject';
import { userService } from '../../services/user/api';
import { projectService } from '../../services/projects/api';

const SettingProject: React.FC = () => {
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();
  const [project, setProject] = useState({
    userId: '',
    name: '',
    userJoin: [],
    _id: '',
  });

  useEffect(() => {
    userService
      .getUserId()
      .then((res) => {
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        toast.error('Failed to determine user');
      });

    projectService
      .getProjectById({ projectId: projectId })
      .then((res) => {
        setProject(res.data.data);
      })
      .catch((err) => {
        toast.error('Project does not exist');
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="setting-project">
      <WrapperProject>
        <div
          className="row d-flex justify-content-center container-fluid"
          style={{ width: '100%' }}>
          <div className="col d-flex justify-content-center">
            <div className="card" style={{ width: '100%' }}>
              <div className="card-header">
                <h3 className="text-primary">SETTING</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div
                    className="btn btn-outline-danger"
                    onClick={() => {
                      console.log(project);
                      setShowModal(true);
                    }}>
                    {userId === project.userId ? 'Delete project' : 'Leave project'}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </WrapperProject>
      <ModalDeleteOut
        show={showModal}
        title={userId === project.userId ? 1 : 0} // 1: delete project; 0: leave project
        funcQuit={() => {
          setShowModal(false);
        }}
        funcYes={() => {}}
        userId={userId}
        project={{
          nameProject: project.name,
          projectId: project._id,
        }}
      />
    </div>
  );
};

export default SettingProject;
