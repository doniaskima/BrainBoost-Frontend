/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { projectService } from '../../services/projects/api';



const Friend: React.FC<any> = (props) => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    projectService
      .getUserJoin({ projectId: props.projectId })
      .then((res) => {
        setListUser(res.data.data.users);
  
      })
      .catch((err) => { });
  }, [props.projectId]);
  function MemberStatus({ username, avatar, status }) {
 
    return (
      <div className="member">
        <img
          src={avatar === '' ? '/image/avatar.png' : avatar}
          className="avatar-member"
          alt=""
        />
        <span className="name-member">{username}</span>
        <div className={status}></div>
      </div>
    );
  }
  return (
    <div className="friend">
      <div className="members">
        <span className="title">Member</span>
        {listUser.map((value, i) => {
          return (
            <MemberStatus
              username={value.username}
              avatar={value.avatar}
              status={'online'
 
              }></MemberStatus>
          );
        })}
 
      </div>
    </div>
  );
};
export default Friend;
