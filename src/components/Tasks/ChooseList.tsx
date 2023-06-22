import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const ChooseList: React.FC<any> = (props) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="choose-list">
      <nav className="navbar navbar-default navbar-static-top d-flex justify-content-center pl-1 pt-2">
        <ul className="nav nav-pills">
          <li className="mr-4">
             <button
                onClick={() => navigate(`/tasks/member-project/${projectId}`)} // Add an onClick handler to navigate to the tasks page
             >
               Member
             </button>
          </li>
          <li className="mr-4">
          <button
                onClick={() => navigate(`/tasks/task-project/${projectId}`)} // Add an onClick handler to navigate to the tasks page
             >
               Task
             </button>
          </li>
          <li className="mr-4">
          <button
                onClick={() => navigate(`/tasks/postList/${projectId}`)} // Add an onClick handler to navigate to the tasks page
             >
              Group
             </button>
          </li>
          <li className="mr-4">
          <button
                onClick={() => navigate(`/tasks/analysis/${projectId}`)} // Add an onClick handler to navigate to the tasks page
             >
               Anylisis
          </button>
          </li>
          <li className="mr-4">
          <button
                onClick={() => navigate(`/tasks/member-project/${projectId}`)} // Add an onClick handler to navigate to the tasks page
             >
               Training
             </button>
          </li>
          <li className="mr-4">
          <button
                onClick={() => navigate(`/tasks/member-project/${projectId}`)} // Add an onClick handler to navigate to the tasks page
             >
               Settings
             </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ChooseList;
