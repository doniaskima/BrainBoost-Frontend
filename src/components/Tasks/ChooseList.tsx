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
             className="Chooslist-btn"
                onClick={() => navigate(`/tasks/member-project/${projectId}`)}  
             >
             <span>  Member</span>
             </button>
          </li>
          <li className="mr-4">
          <button
           className="Chooslist-btn"
                onClick={() => navigate(`/tasks/task-project/${projectId}`)}  
             >
              <span> Task</span>
             </button>
          </li>
          <li className="mr-4">
          <button
           className="Chooslist-btn"
                onClick={() => navigate(`/tasks/postList/${projectId}`)} 
             >
             <span> Group</span>
             </button>
          </li>
          <li className="mr-4">
          <button
           className="Chooslist-btn"
                onClick={() => navigate(`/tasks/chat/${projectId}`)}  
             >
              <span> Chats</span>
          </button>
          </li>
          <li className="mr-4">
          <button
           className="Chooslist-btn"
                onClick={() => navigate(`/tasks/training/${projectId}`)} // Add an onClick handler to navigate to the tasks page
             >
              <span>Training</span>   
             </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ChooseList;
